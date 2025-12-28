const axios = require('axios');

class LLMService {
  static async generateHint(question, userQuery, assignmentDetails) {
    const provider = process.env.LLM_PROVIDER || 'openai';

    try {
      switch (provider) {
        case 'openai':
          return await this.getOpenAIHint(question, userQuery, assignmentDetails);
        case 'gemini':
          return await this.getGeminiHint(question, userQuery, assignmentDetails);
        case 'anthropic':
          return await this.getAnthropicHint(question, userQuery, assignmentDetails);
        default:
          throw new Error(`Unsupported LLM provider: ${provider}`);
      }
    } catch (error) {
      console.error('LLM Service Error:', error);
      throw new Error('Failed to generate hint. Please try again.');
    }
  }

  static async getOpenAIHint(question, userQuery, assignmentDetails) {
    const prompt = this.buildPrompt(question, userQuery, assignmentDetails);

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: process.env.OPENAI_MODEL || 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful SQL tutor. Provide hints to guide students, but never give complete solutions. Focus on teaching concepts and pointing them in the right direction.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || 500),
        temperature: parseFloat(process.env.OPENAI_TEMPERATURE || 0.7)
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  }

  static async getGeminiHint(question, userQuery, assignmentDetails) {
    const prompt = this.buildPrompt(question, userQuery, assignmentDetails);

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `You are a helpful SQL tutor. ${prompt}`
          }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  }

  static async getAnthropicHint(question, userQuery, assignmentDetails) {
    const prompt = this.buildPrompt(question, userQuery, assignmentDetails);

    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: process.env.ANTHROPIC_MODEL || 'claude-3-sonnet-20240229',
        max_tokens: 500,
        messages: [
          {
            role: 'user',
            content: `You are a helpful SQL tutor. ${prompt}`
          }
        ]
      },
      {
        headers: {
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.content[0].text;
  }

  static buildPrompt(question, userQuery, assignmentDetails) {
    return `
Assignment Question: ${question}

Student's Current Query:
${userQuery || 'No query written yet'}

Available Tables: ${assignmentDetails.tables.map(t => t.name).join(', ')}

IMPORTANT: Provide a helpful hint to guide the student, but DO NOT give the complete solution.
- Point out conceptual errors if any
- Suggest which SQL clauses or keywords to use
- Guide them on the logic without writing the full query
- Keep the hint concise (2-3 sentences max)

Hint:`;
  }
}

module.exports = LLMService;