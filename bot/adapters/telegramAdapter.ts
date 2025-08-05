import { BotEngine } from '../core/botEngine';

export async function handleTelegramMessage(payload: any): Promise<any> {
  try {
    const { message, from } = payload;

    if (!message?.text || !from?.id) {
      console.error('Invalid Telegram payload:', payload);
      return { error: 'Invalid payload' };
    }

    const userId = `tg_${from.id}`;

    console.log(`Telegram message from ${userId}:`, message.text);

    const response = await BotEngine.process({
      userId,
      message: message.text,
      platform: 'telegram',
      raw: payload,
    });

    return response;
  } catch (error) {
    console.error('Telegram adapter error:', error);
    return { error: 'Telegram processing failed' };
  }
}

export async function handleTelegramCallback(payload: any): Promise<any> {
  try {
    const { callback_query } = payload;

    if (!callback_query?.data || !callback_query?.from?.id) {
      console.error('Invalid Telegram callback payload:', payload);
      return { error: 'Invalid callback payload' };
    }

    const userId = `tg_${callback_query.from.id}`;
    const message = callback_query.data;

    console.log(`Telegram callback from ${userId}:`, message);

    const response = await BotEngine.process({
      userId,
      message,
      platform: 'telegram',
      raw: payload,
    });

    return response;
  } catch (error) {
    console.error('Telegram callback adapter error:', error);
    return { error: 'Telegram callback processing failed' };
  }
}
