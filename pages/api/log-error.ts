import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { user_id, context, error } = req.body;

    if (!user_id || !context) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data, error: dbError } = await supabase
      .from('logs')
      .insert({
        user_id,
        context,
        error: error || 'Unknown error',
        timestamp: new Date().toISOString()
      })
      .select()
      .single();

    if (dbError) {
      console.error('Error logging error:', dbError);
      return res.status(500).json({ error: 'Failed to log error' });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error logging error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 