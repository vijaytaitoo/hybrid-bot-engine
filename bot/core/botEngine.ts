import { getUserSession } from './userSession';
import { runAction, saveBotResponse } from './actions';

export interface BotRequest {
  userId: string;
  message: string;
  platform: 'telegram' | 'web';
  raw?: any;
}

export interface BotResponse {
  text: string;
  actions?: string[];
  data?: any;
}

export const BotEngine = {
  async process(request: BotRequest): Promise<BotResponse> {
    try {
      console.log(`Processing ${request.platform} message from ${request.userId}:`, request.message);
      
      // Get or create user session
      const session = await getUserSession(request.userId);
      console.log('User session:', session);
      
      // Save user message
      await runAction('saveMessage', {
        userId: request.userId,
        platform: request.platform,
        message: request.message,
        raw: request.raw
      });
      
      // Process message and generate response
      const response = await generateResponse(request, session);
      
      // Save bot response
      await saveBotResponse(request.userId, response.text);
      
      // Send response to appropriate platform
      await sendResponse(request.platform, request.userId, response.text);
      
      return response;
    } catch (error) {
      console.error('BotEngine process error:', error);
      const errorResponse = {
        text: 'Извините, произошла ошибка. Попробуйте позже.',
        actions: []
      };
      
      await sendResponse(request.platform, request.userId, errorResponse.text);
      return errorResponse;
    }
  }
};

async function generateResponse(request: BotRequest, session: any): Promise<BotResponse> {
  const lowerMessage = request.message.toLowerCase();
  
  // Simple command processing (will be replaced with AI later)
  if (lowerMessage.includes('магазин') || lowerMessage.includes('store')) {
    try {
      await runAction('createStore', {
        userId: request.userId,
        platform: request.platform,
        message: request.message
      });
      
      return {
        text: '✅ Магазин успешно создан! Теперь вы можете добавлять товары.',
        actions: ['createStore']
      };
    } catch (error) {
      return {
        text: '❌ Ошибка при создании магазина. Попробуйте позже.',
        actions: []
      };
    }
  }
  
  if (lowerMessage.includes('привет') || lowerMessage.includes('hello')) {
    return {
      text: `Привет! Я ваш помощник. Что вы хотите сделать?\n\nДоступные команды:\n• Создать магазин\n• Посмотреть историю\n• Помощь`,
      actions: []
    };
  }
  
  if (lowerMessage.includes('помощь') || lowerMessage.includes('help')) {
    return {
      text: `🤖 **Доступные команды:**\n\n• Создать магазин - создание нового магазина\n• История - просмотр ваших сообщений\n• Статус - информация о системе\n\n💡 Просто напишите, что хотите сделать!`,
      actions: []
    };
  }
  
  if (lowerMessage.includes('история') || lowerMessage.includes('history')) {
    try {
      const history = await runAction('getUserHistory', {
        userId: request.userId,
        platform: request.platform
      });
      
      if (history.length === 0) {
        return {
          text: '📝 История сообщений пуста. Начните общение!',
          actions: []
        };
      }
      
      const historyText = history
        .slice(0, 5)
        .map(msg => `${msg.role === 'user' ? '👤' : '🤖'} ${msg.text}`)
        .join('\n');
      
      return {
        text: `📝 **Последние сообщения:**\n\n${historyText}`,
        actions: ['getUserHistory']
      };
    } catch (error) {
      return {
        text: '❌ Ошибка при получении истории.',
        actions: []
      };
    }
  }
  
  // Default response
  return {
    text: 'Я вас понял! Скоро здесь будет AI-помощник. А пока можете:\n\n• Создать магазин\n• Посмотреть историю\n• Получить помощь',
    actions: []
  };
}

async function sendResponse(platform: 'telegram' | 'web', userId: string, text: string): Promise<void> {
  try {
    if (platform === 'telegram') {
      const telegramId = userId.replace('tg_', '');
      const token = process.env['TELEGRAM_BOT_TOKEN'];
      
      if (!token) {
        console.error('TELEGRAM_BOT_TOKEN not configured');
        return;
      }
      
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramId,
          text: text,
          parse_mode: 'Markdown'
        })
      });
    } else {
      // For web platform, we'll handle this in the webhook response
      console.log(`[WebBot -> ${userId}]: ${text}`);
    }
  } catch (error) {
    console.error(`Error sending ${platform} response:`, error);
  }
} 