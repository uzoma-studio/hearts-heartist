import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full">
      <main className="h-screen bg-blue-100 -z-1">
        <div id="sky" className="h-4/6">
          <p className="text-center font-serif text-3xl italic pt-8 text-yellow-500">Click on a heart to learn more about it</p>
        </div>
        <div id="ground" className="h-2/6 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/grass3.png')" }}>
        </div>
      </main>
    </div>
  );
}
