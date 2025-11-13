import { randomUUID } from "crypto";

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
};
export type InsertTransaction = Omit<Transaction, 'id' | 'createdAt'>;

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

export class MemStorage implements IStorage {
  private merchants: Map<string, Merchant>;
  private transactions: Map<string, Transaction>;
  private paymentLinks: Map<string, PaymentLink>;
  private payouts: Map<string, Payout>;
  private defaultMerchantId: string;

  constructor() {
    this.merchants = new Map();
    this.transactions = new Map();
    this.paymentLinks = new Map();
    this.payouts = new Map();

    const defaultMerchant: Merchant = {
      id: randomUUID(),
      businessName: "Demo Merchant",
      email: "demo@paymerch.com",
      currency: "ZAR",
      balance: "5000.00",
      totalRevenue: "15000.00",
      totalTransactions: 45,
      createdAt: new Date().toISOString(),
    };
    this.merchants.set(defaultMerchant.id, defaultMerchant);
    this.defaultMerchantId = defaultMerchant.id;

    this.seedDemoData(defaultMerchant.id);
  }

  private async getOrCreateMerchantForUser(userId: string, userEmail?: string): Promise<Merchant> {
    let merchant = this.merchants.get(userId);
    if (merchant) {
      return merchant;
    }

    // If no merchant exists for this user, create one by cloning the demo merchant
    const demoMerchant = this.merchants.get(this.defaultMerchantId)!;
    const newMerchant: Merchant = {
      ...demoMerchant,
      id: userId, // Use the user's ID as the merchant ID
      email: userEmail || `user-${userId}@example.com`,
    };
    this.merchants.set(userId, newMerchant);
    return newMerchant;
  }

  private seedDemoData(merchantId: string) {
    const demoTransactions: Transaction[] = [
      {
        id: randomUUID(),
        merchantId,
        customerEmail: "john@example.com",
        customerName: "John Smith",
        amount: "150.00",
        currency: "ZAR",
        status: "completed",
        paymentMethod: "card",
        description: "Premium Subscription",
        reference: `TXN${Date.now()}001`,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: randomUUID(),
        merchantId,
        customerEmail: "sarah@example.com",
        customerName: "Sarah Johnson",
        amount: "89.99",
        currency: "ZAR",
        status: "completed",
        paymentMethod: "mobile_money",
        description: "Product Purchase",
        reference: `TXN${Date.now()}002`,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: randomUUID(),
        merchantId,
        customerEmail: "mike@example.com",
        customerName: "Mike Brown",
        amount: "250.00",
        currency: "ZAR",
        status: "pending",
        paymentMethod: "bank_transfer",
        description: "Bulk Order",
        reference: `TXN${Date.now()}003`,
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: randomUUID(),
        merchantId,
        customerEmail: "emma@example.com",
        customerName: "Emma Wilson",
        amount: "49.99",
        currency: "ZAR",
        status: "completed",
        paymentMethod: "card",
        description: "Service Fee",
        reference: `TXN${Date.now()}004`,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: randomUUID(),
        merchantId,
        customerEmail: "david@example.com",
        customerName: "David Lee",
        amount: "199.00",
        currency: "ZAR",
        status: "failed",
        paymentMethod: "card",
        description: "Enterprise Plan",
        reference: `TXN${Date.now()}005`,
        createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      },
    ];

    demoTransactions.forEach(tx => this.transactions.set(tx.id, tx));

    const demoLinks: PaymentLink[] = [
      {
        id: randomUUID(),
        merchantId,
        title: "Monthly Subscription",
        description: "Premium features access",
        amount: "29.99",
        currency: "ZAR",
        link: `LINK${Date.now()}A`,
        isActive: 1,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: randomUUID(),
        merchantId,
        title: "One-time Payment",
        description: "Custom service package",
        amount: "499.00",
        currency: "ZAR",
        link: `LINK${Date.now()}B`,
        isActive: 1,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    demoLinks.forEach(link => this.paymentLinks.set(link.id, link));
  }

  async getMerchant(id: string): Promise<Merchant | undefined> {
    return this.merchants.get(id);
  }

  async getMerchantById(id: string): Promise<Merchant | undefined> {
    return this.getOrCreateMerchantForUser(id);
  }

  async getDefaultMerchant(): Promise<Merchant> {
    const merchant = this.merchants.get(this.defaultMerchantId);
    if (!merchant) {
      throw new Error("Default merchant not found");
    }
    return merchant;
  }

  async createMerchant(insertMerchant: InsertMerchant): Promise<Merchant> {
    const id = randomUUID();
    const merchant: Merchant = {
      ...insertMerchant,
      id,
      balance: "0",
      totalRevenue: "0",
      totalTransactions: 0,
      createdAt: new Date().toISOString(),
    };
    this.merchants.set(id, merchant);
    return merchant;
  }

  async updateMerchantBalance(id: string, newBalance: number): Promise<Merchant> {
    const merchant = this.merchants.get(id);
    if (!merchant) {
      throw new Error("Merchant not found");
    }
    merchant.balance = newBalance.toFixed(2);
    this.merchants.set(id, merchant);
    return merchant;
  }

  async updateMerchantStats(id: string, additionalRevenue: number, additionalTransactions: number): Promise<Merchant> {
    const merchant = this.merchants.get(id);
    if (!merchant) {
      throw new Error("Merchant not found");
    }
    merchant.totalRevenue = (parseFloat(merchant.totalRevenue) + additionalRevenue).toFixed(2);
    merchant.totalTransactions += additionalTransactions;
    merchant.balance = (parseFloat(merchant.balance) + additionalRevenue).toFixed(2);
    this.merchants.set(id, merchant);
    return merchant;
  }

  async getTransaction(id: string): Promise<Transaction | undefined> {
    return this.transactions.get(id);
  }

  async getTransactionsByMerchant(merchantId: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .filter(tx => tx.merchantId === merchantId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getRecentTransactions(merchantId: string, limit: number): Promise<Transaction[]> {
    const transactions = await this.getTransactionsByMerchant(merchantId);
    return transactions.slice(0, limit);
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = randomUUID();
    const transaction: Transaction = {
      ...insertTransaction,
      id,
      createdAt: new Date().toISOString(),
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async getPaymentLink(id: string): Promise<PaymentLink | undefined> {
    return this.paymentLinks.get(id);
  }

  async getPaymentLinkByLink(link: string): Promise<PaymentLink | undefined> {
    return Array.from(this.paymentLinks.values()).find(pl => pl.link === link);
  }

  async getPaymentLinksByMerchant(merchantId: string): Promise<PaymentLink[]> {
    return Array.from(this.paymentLinks.values())
      .filter(link => link.merchantId === merchantId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createPaymentLink(insertLink: InsertPaymentLink): Promise<PaymentLink> {
    const id = randomUUID();
    const link = `LINK${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    const paymentLink: PaymentLink = {
      ...insertLink,
      id,
      link,
      createdAt: new Date().toISOString(),
    };
    this.paymentLinks.set(id, paymentLink);
    return paymentLink;
  }

  async getPayout(id: string): Promise<Payout | undefined> {
    return this.payouts.get(id);
  }

  async getPayoutsByMerchant(merchantId: string): Promise<Payout[]> {
    return Array.from(this.payouts.values())
      .filter(payout => payout.merchantId === merchantId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createPayout(insertPayout: InsertPayout): Promise<Payout> {
    const id = randomUUID();
    const payout: Payout = {
      ...insertPayout,
      id,
      createdAt: new Date().toISOString(),
    };
    this.payouts.set(id, payout);
    return payout;
  }

  // Admin helpers
  async getAllMerchants(): Promise<Merchant[]> {
    return Array.from(this.merchants.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getAllPayouts(): Promise<Payout[]> {
    return Array.from(this.payouts.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

export const storage = new MemStorage();
