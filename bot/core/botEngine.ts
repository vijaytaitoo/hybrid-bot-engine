import { askAI } from '../../lib/aiEngine';
import { saveMessage } from './actions';

export async function processMessage(platform: string, user: any, text: string) {
  const aiResponse = await askAI(text);
  await saveMessage(user, text, platform);
  return aiResponse;
}
