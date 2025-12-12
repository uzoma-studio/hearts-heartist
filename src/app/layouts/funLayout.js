import React from 'react'
import FloatHearts from "@/components/float-hearts";
import Footer from '@/components/footer';
import { getEntries } from "@/lib/contentful";

const FunLayout = async () => {
  const hearts = await getEntries('section', { select: 'fields.title, fields.slug' });
  return (
    <div className="w-full">
        <main className="h-screen bg-blue-100 -z-1">
        <div id="sky" className="h-4/6">
            <p className="text-center font-serif text-3xl italic pt-8 text-yellow-500">Click on a heart to learn more about that section</p>
            <FloatHearts hearts={hearts} />
        </div>
        <Footer />
        </main>
    </div>
  )
}

export default FunLayout