import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  xp: integer("xp").notNull().default(0),
  level: integer("level").notNull().default(1),
  transportStreak: integer("transport_streak").notNull().default(0),
  foodStreak: integer("food_streak").notNull().default(0),
  energyStreak: integer("energy_streak").notNull().default(0),
  consumptionStreak: integer("consumption_streak").notNull().default(0),
  stars: integer("stars").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const quests = pgTable("quests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  target: integer("target").notNull(),
  stars: integer("stars").notNull(),
  xpReward: integer("xp_reward").notNull(),
  active: boolean("active").notNull().default(true),
});

export const userQuestProgress = pgTable("user_quest_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  questId: varchar("quest_id").notNull().references(() => quests.id),
  progress: integer("progress").notNull().default(0),
  completed: boolean("completed").notNull().default(false),
  completedAt: timestamp("completed_at"),
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
});

export const bossState = pgTable("boss_state", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  currentHp: integer("current_hp").notNull(),
  maxHp: integer("max_hp").notNull(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const bossContributions = pgTable("boss_contributions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  bossId: varchar("boss_id").notNull().references(() => bossState.id),
  damage: integer("damage").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
});

export const insertQuestSchema = createInsertSchema(quests).omit({
  id: true,
});

export const updateQuestProgressSchema = z.object({
  questId: z.string(),
  progress: z.number().int().min(0),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Quest = typeof quests.$inferSelect;
export type UserQuestProgress = typeof userQuestProgress.$inferSelect;
export type BossState = typeof bossState.$inferSelect;
export type BossContribution = typeof bossContributions.$inferSelect;
