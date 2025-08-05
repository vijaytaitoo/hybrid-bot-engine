import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { user_id, prompt, response, model, tokens_used } = req.body;

    if (!user_id || !prompt || !response) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data, error } = await supabase
      .from('ai_logs')
      .insert({
        user_id,
        prompt,
        response,
        model: model || 'gpt-4o-mini',
        tokens_used: tokens_used || 0,
        timestamp: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error logging AI request:', error);
      return res.status(500).json({ error: 'Failed to log AI request' });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('AI logging error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 