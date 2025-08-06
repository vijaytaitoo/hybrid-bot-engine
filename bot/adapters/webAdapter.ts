import { processMessage } from '../core/botEngine';
import { logError, log } from '../../lib/logger';

export interface WebPayload {
  userId: string;
  message: string;
  sessionId?: string;
}

export async function handleWebMessage(payload: WebPayload) {
  try {
    await log('Received Web message', payload.userId, 'web_adapter');
    
    if (payload.message && payload.userId) {
      return await processMessage('web', { id: payload.userId }, payload.message);
    }
    
    await logError('Invalid Web payload', payload.userId, 'web_adapter', { payload });
    return { error: 'Invalid payload' };
    
  } catch (error) {
    await logError('Error handling Web message', payload.userId, 'web_adapter', { error, payload });
    throw error;
  }
}

export async function handleWebEvent(payload: any) {
  try {
    await log('Received Web event', payload.userId, 'web_adapter');
    
    if (payload.event && payload.userId) {
      return await processMessage('web', { id: payload.userId }, `event:${payload.event}`);
    }
    
    await logError('Invalid Web event payload', payload.userId, 'web_adapter', { payload });
    return { error: 'Invalid event payload' };
    
  } catch (error) {
    await logError('Error handling Web event', payload.userId, 'web_adapter', { error, payload });
    throw error;
  }
}
