// 'use client';

// import { useState } from 'react';

// export default function GeminiChat() {
//   const [prompt, setPrompt] = useState('');
//   const [response, setResponse] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch('/api/gemini', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ prompt }),
//       });

//       const data = await res.json();
      
//       if (data.text) {
//         setResponse(data.text);
//       } else {
//         setResponse('Error: ' + (data.error || 'Unknown error'));
//       }
//     } catch (error) {
//       setResponse('Error calling API');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <form onSubmit={handleSubmit} className="mb-4">
//         <textarea
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           placeholder="Ask Gemini something..."
//           className="w-full p-2 border border-gray-300 rounded mb-2"
//           rows={4}
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
//         >
//           {loading ? 'Generating...' : 'Ask Gemini'}
//         </button>
//       </form>
      
//       {response && (
//         <div className="p-4 bg-gray-100 rounded-lg">
//           <h3 className="font-bold mb-2">Response:</h3>
//           <p className="whitespace-pre-wrap">{response}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// *** ============
// components/GeminiChat.tsx
'use client';

import { useState } from 'react';

// The "use client" directive is essential here since we use React hooks (useState)
export default function GeminiChat() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return; // Prevent empty submission
    setLoading(true);

    try {
      // NOTE: Make sure you have the /api/gemini route handler set up!
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      
      if (data.text) {
        setResponse(data.text);
      } else {
        // Clear prompt on successful response, only set it to an error if something went wrong
        setResponse('Error: ' + (data.error || 'Unknown API error. Check your server logs!'));
      }
    } catch (error) {
      console.error(error);
      setResponse('A network error occurred. Could not reach the API.');
    } finally {
      setLoading(false);
      setPrompt(''); // Clear the input field after sending
    }
  };

  return (
    // Removed the 'max-w-2xl mx-auto p-4' since the wrapping page component now controls the max-width
    <div className="mt-6"> {/* Add top margin to separate from the title */}
      
      {/* 1. Response Area (Chat History) */}
      {response && (
        <div className="mb-6 p-4 border border-cyan-300 bg-cyan-300 text-green-950 rounded-lg shadow-md transition-all duration-300">
          <h3 className="font-semibold text-lg mb-2 border-b border-cyan-300 text-green-900 pb-1">🤖 Gemini's Reply:</h3>
          <p className="whitespace-pre-wrap leading-relaxed">{response}</p>
        </div>
      )}

      {/* 2. Input Form */}
      <form onSubmit={handleSubmit} className="p-4 rounded-lg border border-cyan-400 bg-white shadow-lg">
        <label htmlFor="prompt-textarea" className="block text-sm font-medium text-green-950 mb-2">
           Enter a Q ?
        </label>
        <textarea
          id="prompt-textarea"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask a question, generate an idea, or write some code..."
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 text-green-950"
          rows={5}
          disabled={loading} // Disable during loading
        />
        <button
          type="submit"
          disabled={loading || !prompt.trim()} // Also disable if the prompt is empty
          className="mt-3 w-full sm:w-auto bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-150 shadow-md hover:shadow-lg"
        >
          {loading ? (
            <>
              <span className="animate-spin mr-2">◷</span> Generating...
            </>
          ) : (
            'Ask Gemini'
          )}
        </button>
      </form>
    </div>
  );
}