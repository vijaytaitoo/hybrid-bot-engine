import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env['SUPABASE_URL']!;
const supabaseAnonKey = process.env['SUPABASE_ANON_KEY']!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface User {
  id: string;
  telegram_id?: string;
  web_id?: string;
  email?: string;
  name?: string;
  last_seen: string;
}

export interface Message {
  id: number;
  user_id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export interface Store {
  id: number;
  owner_id: string;
  name: string;
  created_at: string;
} 