#!/bin/bash

# Test script for Hybrid Bot Engine webhook
# Usage: ./scripts/test-webhook.sh

BASE_URL="http://localhost:3000"
WEBHOOK_URL="$BASE_URL/api/bot/webhook"

echo "🧪 Testing Hybrid Bot Engine Webhook"
echo "====================================="

# Test 1: Web platform message
echo "📝 Test 1: Web platform message"
curl -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "web",
    "payload": {
      "userId": "testuser123",
      "message": "Привет, хочу создать магазин"
    }
  }' | jq '.'

echo -e "\n"

# Test 2: Telegram platform message
echo "📱 Test 2: Telegram platform message"
curl -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "telegram",
    "payload": {
      "message": {
        "text": "Привет"
      },
      "from": {
        "id": 123456789
      }
    }
  }' | jq '.'

echo -e "\n"

# Test 3: Help command
echo "❓ Test 3: Help command"
curl -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "web",
    "payload": {
      "userId": "testuser456",
      "message": "помощь"
    }
  }' | jq '.'

echo -e "\n"

# Test 4: History command
echo "📚 Test 4: History command"
curl -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "web",
    "payload": {
      "userId": "testuser123",
      "message": "история"
    }
  }' | jq '.'

echo -e "\n"

# Test 5: Invalid platform
echo "❌ Test 5: Invalid platform"
curl -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "invalid",
    "payload": {
      "message": "test"
    }
  }' | jq '.'

echo -e "\n"

# Test 6: Health check
echo "🏥 Test 6: Health check"
curl -X GET "$BASE_URL/api/bot/webhook" | jq '.'

echo -e "\n"
echo "✅ Testing completed!"
echo "Check Supabase dashboard for data: https://supabase.com/dashboard/project/qjzbzsvwxrecugafblnd" 