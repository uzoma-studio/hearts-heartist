import { getEntries } from "../lib/contentful";

export default async function Home() {
  const hearts = await getEntries('section', { select: 'fields.title, fields.slug' });

  console.log(hearts);
  
  return (
    <div className="w-full">
      <main className="h-screen bg-blue-100 -z-1">
        <div id="sky" className="h-4/6">
          <p className="text-center font-serif text-3xl italic pt-8 text-yellow-500">Click on a heart to learn more about it</p>
          {
            hearts.map((heart) => (
              <div key={heart.sys.id} className="heart-bg w-40 h-40 m-4 p-4 bg-white bg-opacity-70 shadow-md flex items-center justify-center">
                <p className="mb-2 text-center">{heart.fields.title}</p>
              </div>
            ))  
          }
        </div>
        <div id="ground" className="h-2/6 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/grass3.png')" }}>
        </div>
      </main>
    </div>
  );
}
