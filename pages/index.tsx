// // // app/page.tsx or pages/index.tsx (depending on your router)

// // /**
// //  * This component is a Server Component, perfectly suited for Server-Side Rendering (SSR).
// //  * It will render the final HTML on the server before sending it to the browser.
// //  */
// // export default function Home() {
// //   return (
// //     <main style={{ backgroundColor: 'rgb(255, 193, 7)' }} // Approximation for bg-amber-400
// //     >
// //       <h1 
// //         style={{ color: 'navy', padding: '2rem' }}
// //       >
// //         SSR or Next tsx app - use llm api ***
// //       </h1>
// //     </main>
// //   );
// // }

// // ***  =============
// import GeminiChat from '../components/GeminiChat'; // 1. Import

// /**
//  * This component is a Server Component, perfectly suited for Server-Side Rendering (SSR).
//  */
// export default function Home() {
//   return (
//     <main style={{ backgroundColor: 'rgb(255, 193, 7)' }}>
//       <h1 
//         style={{ color: 'navy', padding: '2rem' }}
//       >
//         SSR or Next tsx app - use llm api ***
//       </h1>
      
//       {/* 2. Render the chat component! */}
//       <GeminiChat /> 
//     </main>
//   );
// }

// *** ==================
// // app/page.tsx or pages/index.tsx (depending on your router)

import GeminiChat from '../components/GeminiChat';

/**
 * This component is a Server Component, perfectly suited for Server-Side Rendering (SSR).
 */
export default function Home() {
  return (
    // The <main> tag is now just for the full background color
    <main style={{ 
      backgroundColor: 'rgb(255, 193, 7)', 
      minHeight: '100vh', // Ensure background covers the whole viewport
      padding: '2rem 0' // Add vertical padding above and below the content container
    }}>
      {/* New container for centering and defining max width */}
      <div 
        style={{
          maxWidth: '800px', // Set a maximum width for readability (e.g., 800px)
          margin: '0 auto', // Center the div horizontally
          padding: '0 1rem', // Add horizontal padding for smaller screens
          backgroundColor: 'rgb(240, 240, 240)', // A slightly different background for the content area
          borderRadius: '8px', // Nicer rounded corners
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
          paddingBottom: '2rem' // Add space below the chat component
        }}
      >
        <h1 
          style={{ 
            color: 'navy', 
            paddingTop: '2rem', // Padding inside the container for the title
            paddingBottom: '1rem',
            borderBottom: '2px solid navy' // A separator line
          }}
        >
          SSR or Next tsx app - use llm api ***
        </h1>
        
        {/* The chat component lives within the new container */}
        <GeminiChat /> 
      </div>
    </main>
  );
}