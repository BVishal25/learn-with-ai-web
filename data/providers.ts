import { AiProviderConfig } from '../types';

export const AI_PROVIDERS: AiProviderConfig[] = [
  { id: 'claude', name: 'Anthropic Claude', keyUrl: 'https://console.anthropic.com/settings/keys' },
  { id: 'cohere', name: 'Cohere', keyUrl: 'https://dashboard.cohere.com/api-keys' },
  { id: 'deepseek', name: 'DeepSeek', keyUrl: 'https://platform.deepseek.com/api_keys' },
  { id: 'gemini', name: 'Google Gemini', keyUrl: 'https://aistudio.google.com/app/apikey' },
  { id: 'grok', name: 'Grok (xAI)', keyUrl: 'https://x.ai/' },
  { id: 'groq', name: 'Groq', keyUrl: 'https://console.groq.com/keys' },
  { id: 'kimi', name: 'Kimi (Moonshot AI)', keyUrl: 'https://platform.moonshot.cn/console/api-keys' },
  { id: 'mistral', name: 'Mistral AI', keyUrl: 'https://console.mistral.ai/api-keys/' },
  { id: 'openai', name: 'OpenAI GPT', keyUrl: 'https://platform.openai.com/api-keys' },
  { id: 'perplexity', name: 'Perplexity', keyUrl: 'https://docs.perplexity.ai/docs/getting-started' },
  { id: 'qwen', name: 'Qwen (Alibaba Cloud)', keyUrl: 'https://www.aliyun.com/product/bailian' },
];

export const DEFAULT_PROVIDER_ID = 'gemini';