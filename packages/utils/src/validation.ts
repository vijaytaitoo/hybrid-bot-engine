import { z } from 'zod'

// Email validation
export const emailSchema = z.string().email('Invalid email address')

// Telegram ID validation
export const telegramIdSchema = z.number().int().positive('Telegram ID must be positive')

// Token validation
export const tokenSchema = z.string().min(10, 'Token must be at least 10 characters')

// Text validation
export const textSchema = z.string().min(1, 'Text cannot be empty')

// URL validation
export const urlSchema = z.string().url('Invalid URL')

// Date validation
export const dateSchema = z.string().datetime('Invalid date format')

// User validation
export const userSchema = z.object({
  id: telegramIdSchema,
  username: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional()
})

// Message validation
export const messageSchema = z.object({
  message_id: z.number(),
  from: userSchema,
  chat: z.object({
    id: z.number(),
    type: z.enum(['private', 'group', 'supergroup', 'channel'])
  }),
  text: z.string().optional(),
  date: z.number()
})

// Validation functions
export function validateEmail(email: string): boolean {
  try {
    emailSchema.parse(email)
    return true
  } catch {
    return false
  }
}

export function validateTelegramId(id: number): boolean {
  try {
    telegramIdSchema.parse(id)
    return true
  } catch {
    return false
  }
}

export function validateToken(token: string): boolean {
  try {
    tokenSchema.parse(token)
    return true
  } catch {
    return false
  }
}

export function validateText(text: string): boolean {
  try {
    textSchema.parse(text)
    return true
  } catch {
    return false
  }
}

export function validateUrl(url: string): boolean {
  try {
    urlSchema.parse(url)
    return true
  } catch {
    return false
  }
}

export function validateDate(date: string): boolean {
  try {
    dateSchema.parse(date)
    return true
  } catch {
    return false
  }
}

export function validateUser(user: any): boolean {
  try {
    userSchema.parse(user)
    return true
  } catch {
    return false
  }
}

export function validateMessage(message: any): boolean {
  try {
    messageSchema.parse(message)
    return true
  } catch {
    return false
  }
}
