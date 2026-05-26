import { relations } from 'drizzle-orm';
import { pgTable, uuid, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),

  version: integer('version').default(1).notNull(),
});

export const userPrivates = pgTable('user_privates', {
  userId: uuid('user_id')
    .primaryKey()
    .references(() => users.id, { onDelete: 'cascade' }),
  passwordHash: text('password_hash').notNull(),
  lastLoginIp: text('last_login_ip'),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const usersRelations = relations(users, ({ one }) => ({
  privateData: one(userPrivates, {
    fields: [users.id],
    references: [userPrivates.userId],
  }),
}));

export const userPrivatesRelations = relations(userPrivates, ({ one }) => ({
  user: one(users, {
    fields: [userPrivates.userId],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type UserPrivate = typeof userPrivates.$inferSelect;
export type NewUserPrivate = typeof userPrivates.$inferInsert;

export type CreateUserPayload = Omit<
  NewUser,
  'id' | 'createdAt' | 'updatedAt' | 'version'
>;
export type CreateUserPrivatePayload = Omit<
  NewUserPrivate,
  'userId' | 'updatedAt'
>;
