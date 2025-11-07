// import { GoogleGenAI } from '@google/genai';
// import { NextRequest, NextResponse } from 'next/server';

// // 1. Initialize with the new SDK class and object structure
// const genAI = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY!});

// export async function POST(request: NextRequest) {
//   try {
//     const { prompt } = await request.json();

//     if (!prompt) {
//       return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
//     }

//     // 2. Specify the model name directly
//     const model = 'gemini-2.5-flash'; // Flash is fast and generally recommended for chat

//     // 3. Use the correct new syntax: genAI.models.generateContent
//     const result = await genAI.models.generateContent({
//         model: model,
//         contents: prompt
//     });
//      
//     const text = result.text; // The text property is directly on the result

//     return NextResponse.json({ text });
//   } catch (error) {
//     console.error('Gemini API error:', error);
//     return NextResponse.json(
//       { error: 'Failed to generate content' },
//       { status: 500 }
//     );
//   }
// }
// ***  =====================================================================================

// app/api/gemini/route.ts

// The NEW and CORRECT import you want to use!
import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize the new client with the correct class name
const genAI = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY!});

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }
    
    // THE FIX: Use the 'models' object and the 'generateContent' method
    // which directly accepts the model and contents in the new SDK structure.
    const result = await genAI.models.generateContent({
        model: 'gemini-2.5-flash', // Specify the model here
        contents: prompt
    });
     
    // Note: The structure for accessing text in the result is also slightly cleaner 
    // in this newer approach, but using result.text should still work.
    const text = result.text;

    return NextResponse.json({ text });

  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content due to a server error.' },
      { status: 500 }
    );
  }
}