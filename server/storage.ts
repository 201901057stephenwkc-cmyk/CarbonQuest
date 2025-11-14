import {
  type User,
  type InsertUser,
  type Quest,
  type UserQuestProgress,
  type BossState,
  type BossContribution,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserXP(userId: string, xpGain: number): Promise<User>;
  updateUserStars(userId: string, starsGain: number): Promise<User>;
  updateUserStreak(userId: string, category: string, streak: number): Promise<User>;

  // Quest operations
  getActiveQuests(): Promise<Quest[]>;
  getQuestById(id: string): Promise<Quest | undefined>;

  // User Quest Progress operations
  getUserQuestProgress(userId: string): Promise<UserQuestProgress[]>;
  updateQuestProgress(
    userId: string,
    questId: string,
    progress: number
  ): Promise<UserQuestProgress>;
  completeQuest(userId: string, questId: string): Promise<UserQuestProgress>;

  // Boss operations
  getActiveBoss(): Promise<BossState | undefined>;
  dealBossDamage(bossId: string, damage: number): Promise<BossState>;
  addBossContribution(
    userId: string,
    bossId: string,
    damage: number
  ): Promise<BossContribution>;
  getUserBossContributions(userId: string, bossId: string): Promise<number>;
  getTotalBossDamage(bossId: string): Promise<number>;

  // Leaderboard operations
  getTopUsers(limit: number): Promise<User[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private quests: Map<string, Quest>;
  private userQuestProgress: Map<string, UserQuestProgress>;
  private bossStates: Map<string, BossState>;
  private bossContributions: Map<string, BossContribution>;

  constructor() {
    this.users = new Map();
    this.quests = new Map();
    this.userQuestProgress = new Map();
    this.bossStates = new Map();
    this.bossContributions = new Map();

    this.seedData();
  }

  private seedData() {
    const defaultQuests: Quest[] = [
      {
        id: "1",
        title: "Bike to Work",
        description: "Use your bicycle for transportation instead of driving",
        category: "transport",
        target: 3,
        stars: 50,
        xpReward: 100,
        active: true,
      },
      {
        id: "2",
        title: "Plant-Based Meals",
        description: "Choose plant-based meals over meat",
        category: "food",
        target: 5,
        stars: 75,
        xpReward: 150,
        active: true,
      },
      {
        id: "3",
        title: "Unplug Devices",
        description: "Unplug electronics when not in use to save energy",
        category: "energy",
        target: 3,
        stars: 40,
        xpReward: 80,
        active: true,
      },
      {
        id: "4",
        title: "Reusable Bags",
        description: "Use reusable bags instead of plastic",
        category: "consumption",
        target: 4,
        stars: 30,
        xpReward: 60,
        active: true,
      },
      {
        id: "5",
        title: "Public Transport",
        description: "Take bus or train instead of personal vehicle",
        category: "transport",
        target: 5,
        stars: 60,
        xpReward: 120,
        active: true,
      },
      {
        id: "6",
        title: "Reduce Food Waste",
        description: "Plan meals to minimize food waste",
        category: "food",
        target: 3,
        stars: 45,
        xpReward: 90,
        active: true,
      },
    ];

    defaultQuests.forEach((quest) => this.quests.set(quest.id, quest));

    const defaultBoss: BossState = {
      id: "boss-1",
      name: "Carbon Ogre",
      currentHp: 7500,
      maxHp: 10000,
      active: true,
      createdAt: new Date(),
    };
    this.bossStates.set(defaultBoss.id, defaultBoss);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      xp: 0,
      level: 1,
      transportStreak: 0,
      foodStreak: 0,
      energyStreak: 0,
      consumptionStreak: 0,
      stars: 0,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserXP(userId: string, xpGain: number): Promise<User> {
    const user = this.users.get(userId);
    if (!user) throw new Error("User not found");

    const newXP = user.xp + xpGain;
    const newLevel = Math.floor(newXP / 1000) + 1;

    const updatedUser = { ...user, xp: newXP, level: newLevel };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async updateUserStars(userId: string, starsGain: number): Promise<User> {
    const user = this.users.get(userId);
    if (!user) throw new Error("User not found");

    const updatedUser = { ...user, stars: user.stars + starsGain };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async updateUserStreak(userId: string, category: string, streak: number): Promise<User> {
    const user = this.users.get(userId);
    if (!user) throw new Error("User not found");

    const streakField = `${category}Streak` as keyof User;
    const updatedUser = { ...user, [streakField]: streak };
    this.users.set(userId, updatedUser as User);
    return updatedUser as User;
  }

  async getActiveQuests(): Promise<Quest[]> {
    return Array.from(this.quests.values()).filter((q) => q.active);
  }

  async getQuestById(id: string): Promise<Quest | undefined> {
    return this.quests.get(id);
  }

  async getUserQuestProgress(userId: string): Promise<UserQuestProgress[]> {
    return Array.from(this.userQuestProgress.values()).filter(
      (p) => p.userId === userId
    );
  }

  async updateQuestProgress(
    userId: string,
    questId: string,
    progress: number
  ): Promise<UserQuestProgress> {
    const key = `${userId}-${questId}`;
    const existing = this.userQuestProgress.get(key);

    if (existing) {
      const updated = { ...existing, progress, lastUpdated: new Date() };
      this.userQuestProgress.set(key, updated);
      return updated;
    }

    const newProgress: UserQuestProgress = {
      id: randomUUID(),
      userId,
      questId,
      progress,
      completed: false,
      completedAt: null,
      lastUpdated: new Date(),
    };
    this.userQuestProgress.set(key, newProgress);
    return newProgress;
  }

  async completeQuest(userId: string, questId: string): Promise<UserQuestProgress> {
    const key = `${userId}-${questId}`;
    const existing = this.userQuestProgress.get(key);
    const quest = await this.getQuestById(questId);

    if (!quest) throw new Error("Quest not found");

    const completed: UserQuestProgress = {
      id: existing?.id || randomUUID(),
      userId,
      questId,
      progress: quest.target,
      completed: true,
      completedAt: new Date(),
      lastUpdated: new Date(),
    };

    this.userQuestProgress.set(key, completed);
    return completed;
  }

  async getActiveBoss(): Promise<BossState | undefined> {
    return Array.from(this.bossStates.values()).find((b) => b.active);
  }

  async dealBossDamage(bossId: string, damage: number): Promise<BossState> {
    const boss = this.bossStates.get(bossId);
    if (!boss) throw new Error("Boss not found");

    const updated = { ...boss, currentHp: Math.max(0, boss.currentHp - damage) };
    this.bossStates.set(bossId, updated);
    return updated;
  }

  async addBossContribution(
    userId: string,
    bossId: string,
    damage: number
  ): Promise<BossContribution> {
    const contribution: BossContribution = {
      id: randomUUID(),
      userId,
      bossId,
      damage,
      createdAt: new Date(),
    };
    this.bossContributions.set(contribution.id, contribution);
    return contribution;
  }

  async getUserBossContributions(userId: string, bossId: string): Promise<number> {
    return Array.from(this.bossContributions.values())
      .filter((c) => c.userId === userId && c.bossId === bossId)
      .reduce((sum, c) => sum + c.damage, 0);
  }

  async getTotalBossDamage(bossId: string): Promise<number> {
    return Array.from(this.bossContributions.values())
      .filter((c) => c.bossId === bossId)
      .reduce((sum, c) => sum + c.damage, 0);
  }

  async getTopUsers(limit: number): Promise<User[]> {
    return Array.from(this.users.values())
      .sort((a, b) => b.xp - a.xp)
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
