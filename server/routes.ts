import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, updateQuestProgressSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existing = await storage.getUserByEmail(userData.email);
      
      if (existing) {
        return res.json(existing);
      }
      
      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    const user = await storage.getUser(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  });

  // Quest routes
  app.get("/api/quests", async (req, res) => {
    const quests = await storage.getActiveQuests();
    res.json(quests);
  });

  app.get("/api/quests/:userId/progress", async (req, res) => {
    const progress = await storage.getUserQuestProgress(req.params.userId);
    res.json(progress);
  });

  app.post("/api/quests/:questId/complete", async (req, res) => {
    try {
      const { userId } = req.body;
      const questId = req.params.questId;
      
      const quest = await storage.getQuestById(questId);
      if (!quest) {
        return res.status(404).json({ error: "Quest not found" });
      }

      const completed = await storage.completeQuest(userId, questId);
      
      await storage.updateUserXP(userId, quest.xpReward);
      await storage.updateUserStars(userId, quest.stars);

      const user = await storage.getUser(userId);
      const currentStreak = (user as any)[`${quest.category}Streak`] || 0;
      await storage.updateUserStreak(userId, quest.category, currentStreak + 1);

      const damage = Math.floor(quest.stars / 10);
      const boss = await storage.getActiveBoss();
      if (boss) {
        await storage.dealBossDamage(boss.id, damage);
        await storage.addBossContribution(userId, boss.id, damage);
      }

      res.json({
        progress: completed,
        xpGained: quest.xpReward,
        starsGained: quest.stars,
        bossDamage: damage,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/quests/:questId/progress", async (req, res) => {
    try {
      const { userId, progress } = req.body;
      const questId = req.params.questId;
      
      const updated = await storage.updateQuestProgress(userId, questId, progress);
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Boss routes
  app.get("/api/boss", async (req, res) => {
    const boss = await storage.getActiveBoss();
    if (!boss) {
      return res.status(404).json({ error: "No active boss" });
    }
    
    const totalDamage = await storage.getTotalBossDamage(boss.id);
    
    res.json({
      ...boss,
      totalDamage,
      worldHealth: Math.floor(((boss.maxHp - boss.currentHp) / boss.maxHp) * 100),
    });
  });

  app.get("/api/boss/:bossId/contributions/:userId", async (req, res) => {
    const { bossId, userId } = req.params;
    const damage = await storage.getUserBossContributions(userId, bossId);
    res.json({ damage });
  });

  // Leaderboard routes
  app.get("/api/leaderboard", async (req, res) => {
    const limit = parseInt(req.query.limit as string) || 10;
    const users = await storage.getTopUsers(limit);
    res.json(users);
  });

  const httpServer = createServer(app);
  return httpServer;
}
