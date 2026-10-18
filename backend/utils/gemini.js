

// Kya kar rahe hain: Yeh file Google Gemini client ko initialize kar rahi hai. Isko alag utility file 
// mein isliye banaya taaki API key setup ek hi 
// jagah rahe aur poore backend mein clean tarike 
// se use ho sake. Make sure tumhari backend ki 
// .env file mein GEMINI_API_KEY=your_key_here 
// likha ho.  



import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });