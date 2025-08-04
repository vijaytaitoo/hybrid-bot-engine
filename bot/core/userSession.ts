import { supabase, User } from '../../lib/supabaseClient';

export async function getUserSession(userId: string): Promise<User> {
  try {
    // Try to find existing user
    const { data: existingUser, error: findError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (findError && findError.code !== 'PGRST116') {
      console.error('Error finding user:', findError);
      throw findError;
    }

    if (existingUser) {
      // Update last_seen
      await supabase
        .from('users')
        .update({ last_seen: new Date().toISOString() })
        .eq('id', userId);
      
      return existingUser;
    }

    // Create new user
    const newUser: Partial<User> = {
      id: userId,
      last_seen: new Date().toISOString()
    };

    // Set platform-specific ID
    if (userId.startsWith('tg_')) {
      newUser.telegram_id = userId.replace('tg_', '');
    } else if (userId.startsWith('web_')) {
      newUser.web_id = userId.replace('web_', '');
    }

    const { data: createdUser, error: createError } = await supabase
      .from('users')
      .insert(newUser)
      .select()
      .single();

    if (createError) {
      console.error('Error creating user:', createError);
      throw createError;
    }

    return createdUser;
  } catch (error) {
    console.error('getUserSession error:', error);
    // Return a fallback user object
    return {
      id: userId,
      last_seen: new Date().toISOString()
    };
  }
}

export async function updateUserSession(userId: string, updates: Partial<User>): Promise<void> {
  try {
    await supabase
      .from('users')
      .update({
        ...updates,
        last_seen: new Date().toISOString()
      })
      .eq('id', userId);
  } catch (error) {
    console.error('updateUserSession error:', error);
  }
} 