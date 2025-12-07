import React from "react";
import { getEntries } from "@/lib/contentful";
import Link from "next/link";

export default async function Page({ params }) {
  const { sectionSlug, pageSlug } = await params;

  const sections = await getEntries("section", {
    select: "fields.title, fields.slug",
  });
  const section = sections.find((s) => s.fields.slug === sectionSlug);

  // fetch pages server-side and filter
  const pages = await getEntries("page");
  const sectionPages = pages.filter(
    (item) => item.fields.section?.fields?.slug === sectionSlug
  );

  const page = sectionPages.find(
    (p) => p.fields.slug === pageSlug || p.fields.slug?.includes("about")
  );

  if (!page) {
    return <h2>Page not found</h2>;
  }

  const calculateAdjacentSections = () => {
    const currentIndex = sections.findIndex(
      (s) => s.fields.slug === sectionSlug
    );
    const prevSection =
      currentIndex > 0 ? sections[currentIndex - 1] : sections.length - 1;
    const nextSection =
      currentIndex < sections.length - 1
        ? sections[currentIndex + 1]
        : sections[0];
    return { prevSection, nextSection };
  }

  const { nextSection, prevSection } = calculateAdjacentSections();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative w-[90vw] sm:w-[85vw] md:w-[95vw] h-[90vh] sm:h-[85vh] md:h-[95vh] bg-white/90 rounded-xl shadow-2xl overflow-auto">
        <div className="w-full h-12 border-b border-gray-200 flex items-center justify-between">
            <div className="flex w-full items-center justify-between px-4">
                <Link href={`/${nextSection.fields.slug}/home`}>{nextSection.fields.title}</Link>
                <Link href={`/${prevSection.fields.slug}/home`}>{prevSection.fields.title}</Link>
            </div>
            <button className="w-12 h-full bg-red-500 text-white cursor-pointer">
                <Link href="/" className="block w-full h-full leading-[48px] text-center">X</Link>
            </button>
        </div>
        <div className="w-full h-24 border-b border-gray-200 flex items-center justify-between p-6">
            <h2 className="text-3xl font-semibold">{section.fields?.title}</h2>
            <div className="flex">
                {
                    sectionPages.map((p) => (
                        <div key={p.sys.id} className="mx-4 py-2">
                            <a href={`/${sectionSlug}/${p.fields.slug}`} className="text-blue-600 hover:underline">
                                {p.fields.title}
                            </a>
                        </div>
                    ))
                }
            </div>
        </div>
        <h2 className="text-2xl font-semibold mb-4 p-6">{page.fields.title}</h2>
        {/* render other fields here */}
      </div>
    </div>
  );
}