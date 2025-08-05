import { BotEngine } from '../core/botEngine';

export async function handleWebMessage(payload: any): Promise<any> {
  try {
    const { message, userId } = payload;

    if (!message || !userId) {
      console.error('Invalid Web payload:', payload);
      return { error: 'Invalid payload' };
    }

    const webUserId = `web_${userId}`;

    console.log(`Web message from ${webUserId}:`, message);

    const response = await BotEngine.process({
      userId: webUserId,
      message,
      platform: 'web',
      raw: payload,
    });

    return response;
  } catch (error) {
    console.error('Web adapter error:', error);
    return { error: 'Web processing failed' };
  }
}

export async function handleWebEvent(payload: any): Promise<any> {
  try {
    const { event, userId, data } = payload;

    if (!event || !userId) {
      console.error('Invalid Web event payload:', payload);
      return { error: 'Invalid event payload' };
    }

    const webUserId = `web_${userId}`;

    console.log(`Web event from ${webUserId}:`, event, data);

    // Convert event to message for processing
    const message = `event:${event} ${data ? JSON.stringify(data) : ''}`;

    const response = await BotEngine.process({
      userId: webUserId,
      message,
      platform: 'web',
      raw: payload,
    });

    return response;
  } catch (error) {
    console.error('Web event adapter error:', error);
    return { error: 'Web event processing failed' };
  }
}
