import { processMessage } from '../core/botEngine';
import { logError, log } from '../../lib/logger';

export interface TelegramPayload {
  message?: {
    from: { id: number };
    text: string;
  };
  callback_query?: {
    from: { id: number };
    data: string;
  };
}

export async function handleTelegramMessage(payload: TelegramPayload) {
  try {
    await log('Received Telegram message', undefined, 'telegram_adapter');

    if (payload.message) {
      const userId = `tg_${payload.message.from.id}`;
      const message = payload.message.text;

      return await processMessage('telegram', { id: userId }, message);
    }

    await logError('No message in Telegram payload', undefined, 'telegram_adapter', { payload });
    return null;
  } catch (error) {
    await logError('Error handling Telegram message', undefined, 'telegram_adapter', {
      error,
      payload,
    });
    throw error;
  }
}

export async function handleTelegramCallback(payload: TelegramPayload) {
  try {
    await log('Received Telegram callback', undefined, 'telegram_adapter');

    if (payload.callback_query) {
      const userId = `tg_${payload.callback_query.from.id}`;
      const message = payload.callback_query.data;

      return await processMessage('telegram', { id: userId }, message);
    }

    await logError('No callback_query in Telegram payload', undefined, 'telegram_adapter', {
      payload,
    });
    return null;
  } catch (error) {
    await logError('Error handling Telegram callback', undefined, 'telegram_adapter', {
      error,
      payload,
    });
    throw error;
  }
}
