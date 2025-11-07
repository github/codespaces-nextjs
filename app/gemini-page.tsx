// // import { GoogleGenerativeAI } from '@google/generative-ai';
// import { GoogleGenAI } from '@google/genai';


// async function getGeminiResponse(prompt: string) {
//   const genAI = new GoogleGenAI(process.env.GOOGLE_API_KEY!);
//   const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
//   try {
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     return response.text();
//   } catch (error) {
//     console.error('Error calling Gemini API:', error);
//     return 'Sorry, there was an error generating the response.';
//   }
// }

// export default async function GeminiPage() {
//   const prompt = "Explain how SSR works in Next.js";
//   const response = await getGeminiResponse(prompt);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Gemini API Response</h1>
//       <div className="mb-4">
//         <strong>Prompt:</strong> {prompt}
//       </div>
//       <div className="p-4 bg-indigo-100 rounded-lg">
//         <strong>Response:</strong>
//         <p className="mt-2 whitespace-pre-wrap">{response}</p>
//       </div>
//     </div>
//   );
// }

// *** ===============
// app/page.tsx (or whichever file contains your Server Component)

// We use the new, preferred SDK package.
import { GoogleGenAI } from '@google/genai';

// Next.js convention is to use a specific name for the key.
const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

/**
 * Utility function to securely call the Gemini API from the server.
 * This function is now correctly using the '@google/genai' SDK syntax.
 */
async function getGeminiResponse(prompt: string) {
  if (!API_KEY) {
    console.error("GEMINI_API_KEY is missing. Check your .env.local file.");
    return 'Error: AI service is not configured.';
  }

  // 1. Initialize with the correct class
  const genAI = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    // 2. FIX: Use the new SDK structure: call generateContent on the 'models' object,
    //    and pass the model name and contents in the configuration object.
    const result = await genAI.models.generateContent({
        model: 'gemini-2.5-flash', // Switched to 'flash' for faster SSR response
        contents: prompt
    });
    
    // 3. FIX: Accessing the result text is direct (no need for .response)
    return result.text;
    
  } catch (error) {
    console.error('Error calling Gemini API from SSR Component:', error);
    return 'Sorry, there was an internal error generating the AI response.';
  }
}

// This component is an async Server Component, enabling Server-Side Rendering (SSR).
export default async function GeminiPage() {
  const prompt = "Explain how SSR works in Next.js";
  const response = await getGeminiResponse(prompt); // This runs on the server!

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-extrabold mb-6 text-indigo-700">
        AI-Powered SSR: Next.js + Gemini
      </h1>
      <div className="mb-4 p-3 border-l-4 border-indigo-500 bg-indigo-50 rounded">
        <strong>Prompt for SSR:</strong> {prompt}
      </div>
      <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200">
        <h2 className="text-xl font-semibold mb-3 text-indigo-800">
          SSR Response from Gemini:
        </h2>
        <p className="mt-2 whitespace-pre-wrap text-gray-700 leading-relaxed">{response}</p>
      </div>
    </div>
  );
}