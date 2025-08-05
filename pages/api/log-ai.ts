import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env['SUPABASE_URL']!, process.env['SUPABASE_KEY']!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt, response, user_id } = req.body;
  await supabase.from("ai_logs").insert([{ prompt, response, user_id }]);
  res.status(200).json({ status: "ai_logged" });
} 