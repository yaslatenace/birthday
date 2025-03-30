// app/congratulations/page.tsx
"use client";

import Image from "next/image";

export default function Congratulations() {
  // Allume les bougies progressivement (logic removed as candlesLit is unused)

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-4">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-8 text-center">
          <span className="text-6xl md:text-7xl">🎉</span> Quel goinfre !<br />
          26 bougies, tu es presque aussi vieux que moi maintenant! 👴🏻🕯️<br />
          Joyeux anniversaire à la meilleure personne que je connaisse 🥺🎂<br />
          Je t&apos;aime ❤️
        </h1>

        {/* GIF d'anniversaire */}
        <Image 
          src="/birthday-celebration.gif" // Ensure this path is correct and points to the actual GIF file
          alt="GIF de joyeux anniversaire" 
          className="rounded-lg shadow-lg"
          width={500} 
          height={500} 
        />
      </div>

      <button 
        onClick={() => window.location.href = "/birthday-game"}
        className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg 
                  text-lg font-semibold transition-colors shadow-lg"
      >
        Rejouer
      </button>
    </div>
  );
}