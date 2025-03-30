// app/page.tsx (votre page d'accueil)
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center text-center">
      {/* Conteneur pour le GIF */}
      <div className="absolute inset-0 z-0">
        {/* ... votre fond GIF ... */}
      </div>
      {/* Texte principal */}
      <div className="relative z-10 top-10 text-3xl font-bold text-white">
        Coucou le plus bel homme sur 🌍
        <br />
        🎂 Je t&apos;ai fait un petit jeu d&apos;anniversaire ! 👾
      </div>
      {/* Bouton en dessous */}
      <div className="relative z-10 mt-20">
        <Link href="/birthday-game">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg text-lg">
            Tu le tentes ? 🥺
          </button>
        </Link>
      </div>
    </div>
  );
}