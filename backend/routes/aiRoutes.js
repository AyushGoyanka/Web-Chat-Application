import express from 'express';
import { ai } from '../utils/gemini.js';

const router = express.Router();

router.post('/smart-reply', async (req, res) => {
  try {
    const { recentMessages } = req.body;
    const conversation = recentMessages.map(m => `${m.sender}: ${m.text}`).join('\n');
    const prompt = `Based on this chat, suggest 3 brief, distinct, and natural replies for the current user to send next.\n\n${conversation}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash', // <-- MODEL CORRECTED HERE
      contents: prompt,
      config: {
        responseFormat: {
          text: { mimeType: "application/json", schema: { type: "array", items: { type: "string" } } }
        }
      }
    });

    res.json({ suggestions: JSON.parse(response.text) });
  } catch (error) {
    console.error('Smart Reply Error:', error);
    res.status(500).json({ error: 'Failed' });
  }
});

router.post('/summarize', async (req, res) => {
  try {
    const { chatHistory } = req.body;
    const formattedHistory = chatHistory.map(m => `${m.sender}: ${m.text}`).join('\n');
    const prompt = `Summarize this chat conversation concisely. Highlight key decisions and action items using a short paragraph followed by bullet points.\n\n${formattedHistory}`;

    const response = await ai.models.generateContent({ 
      model: 'gemini-3.8-flash', // <-- MODEL CORRECTED HERE
      contents: prompt 
    });
    res.json({ summary: response.text });
  } catch (error) {
    console.error('Summarize Error:', error);
    res.status(500).json({ error: 'Failed' });
  }
});

router.post('/rewrite', async (req, res) => {
  try {
    const { draftMessage, tone } = req.body;
    const prompt = `Rewrite the following message in a ${tone} tone. Keep the core meaning intact. Return ONLY the rewritten text, nothing else.\n\nOriginal: "${draftMessage}"`;

    const response = await ai.models.generateContent({ 
      model: 'gemini-3.8-flash', // <-- MODEL CORRECTED HERE
      contents: prompt 
    });
    res.json({ rewrittenText: response.text.trim() });
  } catch (error) {
    console.error('Rewrite Error:', error);
    res.status(500).json({ error: 'Failed' });
  }
});

export default router;