import { NextApiRequest, NextApiResponse } from 'next';
import { handleTelegramMessage, handleTelegramCallback } from '../../../bot/adapters/telegramAdapter';
import { handleWebMessage, handleWebEvent } from '../../../bot/adapters/webAdapter';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { platform, payload } = req.body;

    console.log(`Webhook received for platform: ${platform}`, payload);

    let response;

    switch (platform) {
      case 'telegram':
        // Check if it's a callback query or regular message
        if (payload.callback_query) {
          response = await handleTelegramCallback(payload);
        } else {
          response = await handleTelegramMessage(payload);
        }
        break;

      case 'web':
        // Check if it's an event or regular message
        if (payload.event) {
          response = await handleWebEvent(payload);
        } else {
          response = await handleWebMessage(payload);
        }
        break;

      default:
        console.error('Unsupported platform:', platform);
        return res.status(400).json({ error: 'Unsupported platform' });
    }

    if (response?.error) {
      console.error('Bot processing error:', response.error);
      return res.status(500).json({ error: response.error });
    }

    console.log('Webhook processed successfully:', response);
    return res.status(200).json({ 
      status: 'ok', 
      response: response?.text || 'Message processed'
    });

  } catch (error) {
    console.error('Webhook handler error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Health check endpoint
export async function healthCheck(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json({ 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  }
} 