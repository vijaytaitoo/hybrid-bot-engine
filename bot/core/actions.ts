import { supabase } from '../../lib/supabaseClient';

export interface ActionContext {
  userId: string;
  platform: 'telegram' | 'web';
  message?: string;
  raw?: any;
}

export async function runAction(action: string, context: ActionContext): Promise<any> {
  try {
    switch (action) {
      case 'createStore':
        return await createStore(context);

      case 'saveMessage':
        return await saveMessage(context);

      case 'getUserHistory':
        return await getUserHistory(context.userId);

      default:
        throw new Error(`Unknown action: ${action}`);
    }
  } catch (error) {
    console.error(`Error running action ${action}:`, error);
    throw error;
  }
}

async function createStore(context: ActionContext): Promise<any> {
  try {
    const { data, error } = await supabase
      .from('stores')
      .insert({
        owner_id: context.userId,
        name: 'Новый магазин',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating store:', error);
      throw error;
    }

    console.log(`Store created for user ${context.userId}:`, data);
    return data;
  } catch (error) {
    console.error('createStore error:', error);
    throw error;
  }
}

async function saveMessage(context: ActionContext): Promise<any> {
  if (!context.message) {
    throw new Error('Message is required for saveMessage action');
  }

  try {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        user_id: context.userId,
        role: 'user',
        text: context.message,
        timestamp: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving message:', error);
      throw error;
    }

    console.log(`Message saved for user ${context.userId}:`, data);
    return data;
  } catch (error) {
    console.error('saveMessage error:', error);
    throw error;
  }
}

async function getUserHistory(userId: string): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error getting user history:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('getUserHistory error:', error);
    return [];
  }
}

export async function saveBotResponse(userId: string, response: string): Promise<void> {
  try {
    await supabase.from('messages').insert({
      user_id: userId,
      role: 'bot',
      text: response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('saveBotResponse error:', error);
  }
}
