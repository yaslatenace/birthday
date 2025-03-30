import Link from "next/link";
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center text-center">
      {/* Fond GIF */}
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/background.gif')" }}
      />
      
      {/* Contenu centré */}
      <main className="p-4">
        <div>
          <h1 className="text-3xl font-bold mb-6 text-white drop-shadow-lg">
            Coucou le plus beau des hommes ! 🎉
          </h1>
          <Link href="/birthday-game">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg text-lg">
              🎂 Je t&apos;ai fait un petit jeu d&apos;anniversaire ! 🥺
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
