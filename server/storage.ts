import { randomUUID } from "crypto";
import { neon } from "@neondatabase/serverless";
import "dotenv/config";

// Define types locally to remove dependency on the deleted @shared/schema file
export type Merchant = {
  id: string;
  businessName: string;
  email: string;
  currency: string;
  balance: string;
  totalRevenue: string;
  totalTransactions: number;
  createdAt: string;
  status?: string;
};
export type InsertMerchant = Omit<Merchant, 'id' | 'balance' | 'totalRevenue' | 'totalTransactions' | 'createdAt'>;

export type Transaction = {
  id: string;
  merchantId: string;
  customerEmail: string | null;
  customerName: string | null;
  amount: string;
  currency: string;
  status: 'completed' | 'failed' | 'pending';
  paymentMethod: string;
  description: string | null;
  reference: string;
  createdAt: string;
  riskScore?: number;
  fraudFlag?: boolean;
};
export type InsertTransaction = Omit<Transaction, 'id' | 'createdAt' | 'riskScore' | 'fraudFlag'>;

export type PaymentLink = { id: string; merchantId: string; title: string; description: string | null; amount: string; currency: string; link: string; isActive: number; createdAt: string; };
export type InsertPaymentLink = Omit<PaymentLink, 'id' | 'link' | 'createdAt'>;

export type Payout = { id: string; merchantId: string; amount: string; currency: string; status: 'pending' | 'completed' | 'failed'; bankAccount: string | null; createdAt: string; };
export type InsertPayout = Omit<Payout, 'id' | 'createdAt'>;

export interface IStorage {
  getMerchant(id: string): Promise<Merchant | undefined>;
  getDefaultMerchant(): Promise<Merchant>;
  createMerchant(merchant: InsertMerchant): Promise<Merchant>;
  updateMerchantBalance(id: string, newBalance: number): Promise<Merchant>;
  updateMerchantStats(id: string, revenue: number, transactionCount: number): Promise<Merchant>;

  getTransaction(id: string): Promise<Transaction | undefined>;
  getTransactionsByMerchant(merchantId: string): Promise<Transaction[]>;
  getRecentTransactions(merchantId: string, limit: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;

  getPaymentLink(id: string): Promise<PaymentLink | undefined>;
  getPaymentLinkByLink(link: string): Promise<PaymentLink | undefined>;
  getPaymentLinksByMerchant(merchantId: string): Promise<PaymentLink[]>;
  createPaymentLink(link: InsertPaymentLink): Promise<PaymentLink>;

  getPayout(id: string): Promise<Payout | undefined>;
  getPayoutsByMerchant(merchantId: string): Promise<Payout[]>;
  createPayout(payout: InsertPayout): Promise<Payout>;
  // Admin helpers
  getAllMerchants(): Promise<Merchant[]>;
  getAllTransactions(): Promise<Transaction[]>;
  getAllPayouts(): Promise<Payout[]>;
}

export class NeonStorage implements IStorage {
  private sql: ReturnType<typeof neon>;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is missing. Add your Neon connection string to the .env file.");
    }
    this.sql = neon(process.env.DATABASE_URL);
    this.initializeTables();
  }

  private async initializeTables() {
    try {
      // Create merchants table
      await this.sql`
        CREATE TABLE IF NOT EXISTS merchants (
          id TEXT PRIMARY KEY,
          business_name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          currency TEXT DEFAULT 'ZAR',
          balance NUMERIC DEFAULT 0,
          total_revenue NUMERIC DEFAULT 0,
          total_transactions INTEGER DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          status TEXT DEFAULT 'active'
        )
      `;

      // Create transactions table
      await this.sql`
        CREATE TABLE IF NOT EXISTS transactions (
          id TEXT PRIMARY KEY,
          merchant_id TEXT NOT NULL,
          customer_email TEXT,
          customer_name TEXT,
          amount NUMERIC NOT NULL,
          currency TEXT NOT NULL,
          status TEXT NOT NULL,
          payment_method TEXT NOT NULL,
          description TEXT,
          reference TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          risk_score INTEGER,
          fraud_flag BOOLEAN DEFAULT FALSE,
          FOREIGN KEY (merchant_id) REFERENCES merchants(id)
        )
      `;

      // Create payment_links table
      await this.sql`
        CREATE TABLE IF NOT EXISTS payment_links (
          id TEXT PRIMARY KEY,
          merchant_id TEXT NOT NULL,
          title TEXT NOT NULL,
          description TEXT,
          amount NUMERIC NOT NULL,
          currency TEXT NOT NULL,
          link TEXT NOT NULL UNIQUE,
          is_active INTEGER DEFAULT 1,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (merchant_id) REFERENCES merchants(id)
        )
      `;

      // Create payouts table
      await this.sql`
        CREATE TABLE IF NOT EXISTS payouts (
          id TEXT PRIMARY KEY,
          merchant_id TEXT NOT NULL,
          amount NUMERIC NOT NULL,
          currency TEXT NOT NULL,
          status TEXT NOT NULL,
          bank_account TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (merchant_id) REFERENCES merchants(id)
        )
      `;

      console.log("Neon DB tables initialized successfully");
    } catch (error) {
      console.error("Error initializing Neon DB tables:", error);
    }
  }

  async getMerchant(id: string): Promise<Merchant | undefined> {
    const result = await this.sql`
      SELECT * FROM merchants WHERE id = ${id}
    `;
    if (result.length === 0) return undefined;
    const row = result[0];
    return {
      id: row.id,
      businessName: row.business_name,
      email: row.email,
      currency: row.currency,
      balance: row.balance.toString(),
      totalRevenue: row.total_revenue.toString(),
      totalTransactions: row.total_transactions,
      createdAt: row.created_at,
      status: row.status,
    };
  }

  async getMerchantById(id: string): Promise<Merchant | undefined> {
    let merchant = await this.getMerchant(id);
    if (merchant) return merchant;

    // If no merchant exists, create one
    const newMerchant = await this.createMerchant({
      businessName: "My Business",
      email: `user-${id}@example.com`,
      currency: "ZAR",
    });
    return newMerchant;
  }

  async getDefaultMerchant(): Promise<Merchant> {
    const result = await this.sql`
      SELECT * FROM merchants ORDER BY created_at LIMIT 1
    `;
    if (result.length === 0) {
      // Create default merchant if none exists
      return await this.createMerchant({
        businessName: "Demo Merchant",
        email: "demo@paymerch.com",
        currency: "ZAR",
      });
    }
    const row = result[0];
    return {
      id: row.id,
      businessName: row.business_name,
      email: row.email,
      currency: row.currency,
      balance: row.balance.toString(),
      totalRevenue: row.total_revenue.toString(),
      totalTransactions: row.total_transactions,
      createdAt: row.created_at,
      status: row.status,
    };
  }

  async createMerchant(insertMerchant: InsertMerchant): Promise<Merchant> {
    const id = randomUUID();
    await this.sql`
      INSERT INTO merchants (id, business_name, email, currency)
      VALUES (${id}, ${insertMerchant.businessName}, ${insertMerchant.email}, ${insertMerchant.currency})
    `;
    return await this.getMerchant(id) as Promise<Merchant>;
  }

  async updateMerchantBalance(id: string, newBalance: number): Promise<Merchant> {
    await this.sql`
      UPDATE merchants SET balance = ${newBalance} WHERE id = ${id}
    `;
    return await this.getMerchant(id) as Promise<Merchant>;
  }

  async updateMerchantStats(id: string, additionalRevenue: number, additionalTransactions: number): Promise<Merchant> {
    await this.sql`
      UPDATE merchants 
      SET total_revenue = total_revenue + ${additionalRevenue},
          total_transactions = total_transactions + ${additionalTransactions},
          balance = balance + ${additionalRevenue}
      WHERE id = ${id}
    `;
    return await this.getMerchant(id) as Promise<Merchant>;
  }

  async getTransaction(id: string): Promise<Transaction | undefined> {
    const result = await this.sql`
      SELECT * FROM transactions WHERE id = ${id}
    `;
    if (result.length === 0) return undefined;
    const row = result[0];
    return {
      id: row.id,
      merchantId: row.merchant_id,
      customerEmail: row.customer_email,
      customerName: row.customer_name,
      amount: row.amount.toString(),
      currency: row.currency,
      status: row.status,
      paymentMethod: row.payment_method,
      description: row.description,
      reference: row.reference,
      createdAt: row.created_at,
      riskScore: row.risk_score,
      fraudFlag: row.fraud_flag,
    };
  }

  async getTransactionsByMerchant(merchantId: string): Promise<Transaction[]> {
    const result = await this.sql`
      SELECT * FROM transactions WHERE merchant_id = ${merchantId} ORDER BY created_at DESC
    `;
    return result.map(row => ({
      id: row.id,
      merchantId: row.merchant_id,
      customerEmail: row.customer_email,
      customerName: row.customer_name,
      amount: row.amount.toString(),
      currency: row.currency,
      status: row.status,
      paymentMethod: row.payment_method,
      description: row.description,
      reference: row.reference,
      createdAt: row.created_at,
      riskScore: row.risk_score,
      fraudFlag: row.fraud_flag,
    }));
  }

  async getRecentTransactions(merchantId: string, limit: number): Promise<Transaction[]> {
    const result = await this.sql`
      SELECT * FROM transactions WHERE merchant_id = ${merchantId} ORDER BY created_at DESC LIMIT ${limit}
    `;
    return result.map(row => ({
      id: row.id,
      merchantId: row.merchant_id,
      customerEmail: row.customer_email,
      customerName: row.customer_name,
      amount: row.amount.toString(),
      currency: row.currency,
      status: row.status,
      paymentMethod: row.payment_method,
      description: row.description,
      reference: row.reference,
      createdAt: row.created_at,
      riskScore: row.risk_score,
      fraudFlag: row.fraud_flag,
    }));
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = randomUUID();
    await this.sql`
      INSERT INTO transactions (id, merchant_id, customer_email, customer_name, amount, currency, status, payment_method, description, reference)
      VALUES (${id}, ${insertTransaction.merchantId}, ${insertTransaction.customerEmail}, ${insertTransaction.customerName}, ${insertTransaction.amount}, ${insertTransaction.currency}, ${insertTransaction.status}, ${insertTransaction.paymentMethod}, ${insertTransaction.description}, ${insertTransaction.reference})
    `;
    return await this.getTransaction(id) as Promise<Transaction>;
  }

  async getPaymentLink(id: string): Promise<PaymentLink | undefined> {
    const result = await this.sql`
      SELECT * FROM payment_links WHERE id = ${id}
    `;
    if (result.length === 0) return undefined;
    const row = result[0];
    return {
      id: row.id,
      merchantId: row.merchant_id,
      title: row.title,
      description: row.description,
      amount: row.amount.toString(),
      currency: row.currency,
      link: row.link,
      isActive: row.is_active,
      createdAt: row.created_at,
    };
  }

  async getPaymentLinkByLink(link: string): Promise<PaymentLink | undefined> {
    const result = await this.sql`
      SELECT * FROM payment_links WHERE link = ${link}
    `;
    if (result.length === 0) return undefined;
    const row = result[0];
    return {
      id: row.id,
      merchantId: row.merchant_id,
      title: row.title,
      description: row.description,
      amount: row.amount.toString(),
      currency: row.currency,
      link: row.link,
      isActive: row.is_active,
      createdAt: row.created_at,
    };
  }

  async getPaymentLinksByMerchant(merchantId: string): Promise<PaymentLink[]> {
    const result = await this.sql`
      SELECT * FROM payment_links WHERE merchant_id = ${merchantId} ORDER BY created_at DESC
    `;
    return result.map(row => ({
      id: row.id,
      merchantId: row.merchant_id,
      title: row.title,
      description: row.description,
      amount: row.amount.toString(),
      currency: row.currency,
      link: row.link,
      isActive: row.is_active,
      createdAt: row.created_at,
    }));
  }

  async createPaymentLink(insertLink: InsertPaymentLink): Promise<PaymentLink> {
    const id = randomUUID();
    const link = `LINK${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    await this.sql`
      INSERT INTO payment_links (id, merchant_id, title, description, amount, currency, link)
      VALUES (${id}, ${insertLink.merchantId}, ${insertLink.title}, ${insertLink.description}, ${insertLink.amount}, ${insertLink.currency}, ${link})
    `;
    return await this.getPaymentLink(id) as Promise<PaymentLink>;
  }

  async getPayout(id: string): Promise<Payout | undefined> {
    const result = await this.sql`
      SELECT * FROM payouts WHERE id = ${id}
    `;
    if (result.length === 0) return undefined;
    const row = result[0];
    return {
      id: row.id,
      merchantId: row.merchant_id,
      amount: row.amount.toString(),
      currency: row.currency,
      status: row.status,
      bankAccount: row.bank_account,
      createdAt: row.created_at,
    };
  }

  async getPayoutsByMerchant(merchantId: string): Promise<Payout[]> {
    const result = await this.sql`
      SELECT * FROM payouts WHERE merchant_id = ${merchantId} ORDER BY created_at DESC
    `;
    return result.map(row => ({
      id: row.id,
      merchantId: row.merchant_id,
      amount: row.amount.toString(),
      currency: row.currency,
      status: row.status,
      bankAccount: row.bank_account,
      createdAt: row.created_at,
    }));
  }

  async createPayout(insertPayout: InsertPayout): Promise<Payout> {
    const id = randomUUID();
    await this.sql`
      INSERT INTO payouts (id, merchant_id, amount, currency, status, bank_account)
      VALUES (${id}, ${insertPayout.merchantId}, ${insertPayout.amount}, ${insertPayout.currency}, ${insertPayout.status}, ${insertPayout.bankAccount})
    `;
    return await this.getPayout(id) as Promise<Payout>;
  }

  // Admin helpers
  async getAllMerchants(): Promise<Merchant[]> {
    const result = await this.sql`
      SELECT * FROM merchants ORDER BY created_at DESC
    `;
    return result.map(row => ({
      id: row.id,
      businessName: row.business_name,
      email: row.email,
      currency: row.currency,
      balance: row.balance.toString(),
      totalRevenue: row.total_revenue.toString(),
      totalTransactions: row.total_transactions,
      createdAt: row.created_at,
      status: row.status,
    }));
  }

  async getAllTransactions(): Promise<Transaction[]> {
    const result = await this.sql`
      SELECT * FROM transactions ORDER BY created_at DESC
    `;
    return result.map(row => ({
      id: row.id,
      merchantId: row.merchant_id,
      customerEmail: row.customer_email,
      customerName: row.customer_name,
      amount: row.amount.toString(),
      currency: row.currency,
      status: row.status,
      paymentMethod: row.payment_method,
      description: row.description,
      reference: row.reference,
      createdAt: row.created_at,
      riskScore: row.risk_score,
      fraudFlag: row.fraud_flag,
    }));
  }

  async getAllPayouts(): Promise<Payout[]> {
    const result = await this.sql`
      SELECT * FROM payouts ORDER BY created_at DESC
    `;
    return result.map(row => ({
      id: row.id,
      merchantId: row.merchant_id,
      amount: row.amount.toString(),
      currency: row.currency,
      status: row.status,
      bankAccount: row.bank_account,
      createdAt: row.created_at,
    }));
  }
}

export const storage = new NeonStorage();
