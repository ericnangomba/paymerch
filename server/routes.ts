import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTransactionSchema, insertPaymentLinkSchema, insertPayoutSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/merchant", async (req, res) => {
    try {
      const merchant = await storage.getDefaultMerchant();
      res.json(merchant);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/transactions", async (req, res) => {
    try {
      const merchant = await storage.getDefaultMerchant();
      const transactions = await storage.getTransactionsByMerchant(merchant.id);
      res.json(transactions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/transactions/recent", async (req, res) => {
    try {
      const merchant = await storage.getDefaultMerchant();
      const transactions = await storage.getRecentTransactions(merchant.id, 5);
      res.json(transactions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/stats", async (req, res) => {
    try {
      const merchant = await storage.getDefaultMerchant();
      const transactions = await storage.getTransactionsByMerchant(merchant.id);
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const todayTransactions = transactions.filter(tx => 
        new Date(tx.createdAt) >= today
      );

      const todayRevenue = todayTransactions
        .filter(tx => tx.status === "completed")
        .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

      const completed = transactions.filter(tx => tx.status === "completed").length;
      const total = transactions.length;
      const successRate = total > 0 ? Math.round((completed / total) * 100) : 0;

      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      
      const lastMonthRevenue = transactions
        .filter(tx => new Date(tx.createdAt) >= lastMonth && tx.status === "completed")
        .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

      const previousMonth = new Date();
      previousMonth.setMonth(previousMonth.getMonth() - 2);
      
      const previousMonthRevenue = transactions
        .filter(tx => 
          new Date(tx.createdAt) >= previousMonth && 
          new Date(tx.createdAt) < lastMonth && 
          tx.status === "completed"
        )
        .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

      const revenueChange = previousMonthRevenue > 0 
        ? Math.round(((lastMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100)
        : 0;

      res.json({
        todayRevenue,
        todayTransactions: todayTransactions.length,
        successRate,
        revenueChange,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/transactions/process", async (req, res) => {
    try {
      const merchant = await storage.getDefaultMerchant();
      const { linkId, amount, currency, paymentMethod, customerEmail, customerName } = req.body;

      if (!amount || isNaN(parseFloat(amount))) {
        return res.status(400).json({ error: "Invalid amount" });
      }

      if (!paymentMethod) {
        return res.status(400).json({ error: "Payment method is required" });
      }
      
      const reference = `TXN${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
      const isSuccess = Math.random() > 0.1;
      const parsedAmount = parseFloat(amount);
      
      const transactionData = {
        merchantId: merchant.id,
        customerEmail: customerEmail || null,
        customerName: customerName || null,
        amount: parsedAmount.toFixed(2),
        currency: currency || "USD",
        status: isSuccess ? "completed" : "failed",
        paymentMethod,
        description: linkId ? `Payment via link ${linkId}` : "Direct payment",
        reference,
      };

      const validatedData = insertTransactionSchema.parse(transactionData);
      const transaction = await storage.createTransaction(validatedData);

      if (isSuccess) {
        await storage.updateMerchantStats(merchant.id, parsedAmount, 1);
      }

      res.json(transaction);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/payment-links", async (req, res) => {
    try {
      const merchant = await storage.getDefaultMerchant();
      const links = await storage.getPaymentLinksByMerchant(merchant.id);
      res.json(links);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/payment-links/:linkId", async (req, res) => {
    try {
      const { linkId } = req.params;
      const link = await storage.getPaymentLinkByLink(linkId);
      
      if (!link) {
        return res.status(404).json({ error: "Payment link not found" });
      }

      res.json(link);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/payment-links", async (req, res) => {
    try {
      const merchant = await storage.getDefaultMerchant();
      
      if (!req.body.amount || isNaN(parseFloat(req.body.amount))) {
        return res.status(400).json({ error: "Invalid amount" });
      }

      const linkData = {
        title: req.body.title,
        description: req.body.description || null,
        amount: parseFloat(req.body.amount).toFixed(2),
        currency: req.body.currency || "USD",
        merchantId: merchant.id,
        isActive: 1,
      };

      const validatedData = insertPaymentLinkSchema.parse(linkData);
      const link = await storage.createPaymentLink(validatedData);
      res.json(link);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/payouts", async (req, res) => {
    try {
      const merchant = await storage.getDefaultMerchant();
      const payouts = await storage.getPayoutsByMerchant(merchant.id);
      res.json(payouts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/payouts", async (req, res) => {
    try {
      const merchant = await storage.getDefaultMerchant();
      
      if (!req.body.amount || isNaN(parseFloat(req.body.amount))) {
        return res.status(400).json({ error: "Invalid amount" });
      }

      const requestedAmount = parseFloat(req.body.amount);

      if (requestedAmount <= 0) {
        return res.status(400).json({ error: "Amount must be greater than zero" });
      }

      if (requestedAmount > parseFloat(merchant.balance)) {
        return res.status(400).json({ error: "Insufficient balance" });
      }

      const payoutData = {
        amount: requestedAmount.toFixed(2),
        currency: req.body.currency || "USD",
        bankAccount: req.body.bankAccount || null,
        merchantId: merchant.id,
        status: "pending",
      };

      const validatedData = insertPayoutSchema.parse(payoutData);
      const payout = await storage.createPayout(validatedData);

      const newBalance = parseFloat(merchant.balance) - requestedAmount;
      await storage.updateMerchantBalance(merchant.id, newBalance);

      res.json(payout);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/analytics/revenue", async (req, res) => {
    try {
      const merchant = await storage.getDefaultMerchant();
      const transactions = await storage.getTransactionsByMerchant(merchant.id);

      const { timeRange = "7d" } = req.query;
      
      const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : timeRange === "90d" ? 90 : 365;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const revenueByDay = new Map<string, number>();
      
      for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        revenueByDay.set(dateStr, 0);
      }

      transactions
        .filter(tx => tx.status === "completed" && new Date(tx.createdAt) >= startDate)
        .forEach(tx => {
          const dateStr = new Date(tx.createdAt).toISOString().split('T')[0];
          const current = revenueByDay.get(dateStr) || 0;
          revenueByDay.set(dateStr, current + parseFloat(tx.amount));
        });

      const data = Array.from(revenueByDay.entries())
        .map(([date, amount]) => ({
          date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          amount: Math.round(amount * 100) / 100,
        }))
        .reverse();

      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/analytics/payment-methods", async (req, res) => {
    try {
      const merchant = await storage.getDefaultMerchant();
      const transactions = await storage.getTransactionsByMerchant(merchant.id);

      const methodStats = new Map<string, { count: number; value: number }>();

      transactions
        .filter(tx => tx.status === "completed")
        .forEach(tx => {
          const method = tx.paymentMethod;
          const current = methodStats.get(method) || { count: 0, value: 0 };
          methodStats.set(method, {
            count: current.count + 1,
            value: current.value + parseFloat(tx.amount),
          });
        });

      const data = Array.from(methodStats.entries()).map(([method, stats]) => ({
        method: method.replace('_', ' '),
        count: stats.count,
        value: Math.round(stats.value * 100) / 100,
      }));

      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/analytics/geographic", async (req, res) => {
    try {
      const demoData = [
        { country: "United States", transactions: 125, revenue: 15420 },
        { country: "United Kingdom", transactions: 78, revenue: 9580 },
        { country: "Nigeria", transactions: 92, revenue: 8230 },
        { country: "Kenya", transactions: 45, revenue: 4150 },
        { country: "South Africa", transactions: 38, revenue: 3820 },
        { country: "Ghana", transactions: 29, revenue: 2650 },
      ];

      res.json(demoData);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
