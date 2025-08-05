import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { error, location } = req.body;
  await supabase.from('logs').insert([{ error, location }]);
  res.status(200).json({ status: 'logged' });
}
