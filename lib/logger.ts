import { supabase } from './supabaseClient';

export enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug',
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  user_id?: string;
  context?: string;
  metadata?: Record<string, any>;
}

export class Logger {
  private static async saveToSupabase(entry: LogEntry): Promise<void> {
    try {
      await supabase.from('logs').insert({
        level: entry.level,
        message: entry.message,
        user_id: entry.user_id,
        context: entry.context,
        metadata: entry.metadata,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      // Fallback to console if Supabase fails
      console.error('Failed to log to Supabase:', error);
    }
  }

  static async info(
    message: string,
    userId?: string,
    context?: string,
    metadata?: Record<string, any>
  ) {
    await this.saveToSupabase({
      level: LogLevel.INFO,
      message,
      user_id: userId,
      context,
      metadata,
    });
  }

  static async warn(
    message: string,
    userId?: string,
    context?: string,
    metadata?: Record<string, any>
  ) {
    console.warn(message); // Also log to console for immediate visibility
    await this.saveToSupabase({
      level: LogLevel.WARN,
      message,
      user_id: userId,
      context,
      metadata,
    });
  }

  static async error(
    message: string,
    userId?: string,
    context?: string,
    metadata?: Record<string, any>
  ) {
    console.error(message); // Also log to console for immediate visibility
    await this.saveToSupabase({
      level: LogLevel.ERROR,
      message,
      user_id: userId,
      context,
      metadata,
    });
  }

  static async debug(
    message: string,
    userId?: string,
    context?: string,
    metadata?: Record<string, any>
  ) {
    if (process.env['NODE_ENV'] === 'development') {
      await this.saveToSupabase({
        level: LogLevel.DEBUG,
        message,
        user_id: userId,
        context,
        metadata,
      });
    }
  }
}

// Convenience functions
export const log = Logger.info;
export const logWarn = Logger.warn;
export const logError = Logger.error;
export const logDebug = Logger.debug;
