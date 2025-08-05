import { OpenAI } from 'openai';
import { supabase } from './supabaseClient';

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY']!,
});

export interface AIResponse {
  text: string;
  model: string;
  tokens_used: number;
  success: boolean;
  error?: string;
}

export async function askAI(prompt: string, userId: string, history: string[] = []): Promise<AIResponse> {
  try {
    const messages: any[] = [
      { 
        role: 'system', 
        content: 'Ты умный помощник платформы TeleGa. Помогай создавать магазины, объяснять команды, дружелюбно общайся. Отвечай на русском языке.' 
      },
      ...history.map(text => ({ role: 'user', content: text })),
      { role: 'user', content: prompt },
    ];

    const completion = await openai.chat.completions.create({
      model: process.env['OPENAI_MODEL'] || 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content || 'Извини, я не понял.';
    const usage = completion.usage;

    // Логируем AI запрос
    await logAIRequest(userId, prompt, response, completion.model, usage?.total_tokens || 0);

    return {
      text: response,
      model: completion.model,
      tokens_used: usage?.total_tokens || 0,
      success: true
    };

  } catch (error) {
    console.error('AI Engine error:', error);
    
    // Логируем ошибку AI
    await logError(userId, 'ai_request_failed', error);
    
    return {
      text: 'Извините, произошла ошибка при обработке запроса. Попробуйте позже.',
      model: 'error',
      tokens_used: 0,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

async function logAIRequest(userId: string, prompt: string, response: string, model: string, tokensUsed: number) {
  try {
    await supabase.from('ai_logs').insert({
      user_id: userId,
      prompt: prompt,
      response: response,
      model: model,
      tokens_used: tokensUsed,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error logging AI request:', error);
  }
}

async function logError(userId: string, context: string, error: any) {
  try {
    await supabase.from('logs').insert({
      user_id: userId,
      context: context,
      error: typeof error === 'string' ? error : JSON.stringify(error),
      timestamp: new Date().toISOString()
    });
  } catch (logError) {
    console.error('Error logging error:', logError);
  }
} 