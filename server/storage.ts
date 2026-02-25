import { db } from "./db";
import { contactMessages, registrations, type InsertContactMessage, type InsertRegistration, type ContactMessage, type Registration } from "@shared/schema";

export interface IStorage {
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  createRegistration(registration: InsertRegistration): Promise<Registration>;
}

export class DatabaseStorage implements IStorage {
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db.insert(contactMessages).values(message).returning();
    return newMessage;
  }

  async createRegistration(registration: InsertRegistration): Promise<Registration> {
    const [newRegistration] = await db.insert(registrations).values(registration).returning();
    return newRegistration;
  }
}

export const storage = new DatabaseStorage();
