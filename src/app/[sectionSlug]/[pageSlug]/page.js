import React from "react";
import { getEntries } from "@/lib/contentful";
import Link from "next/link";
import Image from "next/image";
import RichTextRenderer from "@/lib/richTextRenderer";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

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
      currentIndex > 0 ? sections[currentIndex - 1] : sections[sections.length - 1];
    const nextSection =
      currentIndex < sections.length - 1
        ? sections[currentIndex + 1]
        : sections[0];
    return { prevSection, nextSection };
  }

  const { nextSection, prevSection } = calculateAdjacentSections();

  // get header image URL and dimensions from page fields
  const coverImage = page.fields?.coverImage?.fields?.file;
  const coverImageUrl = coverImage?.url ? `https:${coverImage.url}` : null;

  // Assign brand color to section based on index
  const brandColors = [
    'var(--color-turquoise-bright)',
    'var(--color-amber-soft)',
    'var(--color-aqua-calm)',
    'var(--color-lime-soft)',
    'var(--color-mint-soft)',
    'var(--color-lavender-warm)',
    'var(--color-sun-cream)',
    'var(--color-blush-clay)',
    'var(--color-sky-soft)',
    'var(--color-honey-light)',
  ];
  const currentSectionIndex = sections.findIndex(
    (s) => s.fields.slug === sectionSlug
  );
  const sectionBgColor = brandColors[currentSectionIndex % brandColors.length];

  return (
    <div className="inset-0 z-50 flex items-center justify-center flex-col w-full h-screen">
      {/* <Navbar /> */}
      <div className="w-full h-16 border-b border-gray-200 flex items-center justify-between">
          <div className="flex w-full items-center justify-between px-4 text-xl">
              <Link href={`/${nextSection.fields.slug}/home`} className="flex items-center hover:text-[var(--color-pink)] text-xs md:text-sm"><BsArrowLeft className="mx-2 text-lg md:text-3xl"/> {nextSection.fields.title}</Link>
              <Link href={`/${prevSection.fields.slug}/home`} className="flex items-center hover:text-[var(--color-blue)] text-xs md:text-sm">{prevSection.fields.title} <BsArrowRight className="mx-2 text-lg md:text-3xl"/></Link>
          </div>
          <button className="w-12 h-full bg-red-500 text-white cursor-pointer hover:bg-red-700 transition-colors">
              <Link href="/" className="block w-full h-full leading-[48px] text-center text-2xl font-bold">X</Link>
          </button>
      </div>
      <div 
        className="relative w-full h-full overflow-auto"
        style={{ backgroundColor: sectionBgColor }}
      >
        <div className="w-full h-24 border-b border-gray-200 flex items-center max-md:flex-col max-md:h-auto text-center justify-between p-6 md:px-12">
          <h2 className="max-md:text-2xl max-md:mb-2 text-4xl font-semibold" style={{ fontFamily: 'var(--font-fraunces)' }}>{section.fields?.title}</h2>
          <div className="flex">
              {
                  [...sectionPages].sort((a, b) => {
                      const titleA = a.fields?.title || '';
                      const titleB = b.fields?.title || '';
                      return titleA.localeCompare(titleB);
                  }).map((p, index) => (
                      <div key={p.sys.id} className="ml-4 py-2">
                          <Link href={`/${sectionSlug}/${p.fields.slug}`} className={`text-black-200 hover:underline ${p.fields.slug === pageSlug || index === 0 ? 'font-bold underline' : ''}`}>
                              {p.fields.title}
                          </Link>
                      </div>
                  ))
              }
          </div>
        </div>
        {/* Header image */}
        {coverImageUrl && (
          <div className="relative w-full h-96">
            <Image
              src={coverImageUrl}
              alt={page.fields?.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="p-6 md:p-12">
          <h2 className="text-4xl font-semibold" style={{ fontFamily: 'var(--font-fraunces)' }}>{page.fields.title}</h2>
          <div>
            <RichTextRenderer content={page.fields?.content} />
          </div>
        </div>
        <div className="w-full h-12 border-b border-t border-gray-200 flex items-center justify-between mt-4">
            <div className="flex w-full items-center justify-between px-4">
                <Link href={`/${nextSection.fields.slug}/home`} className="flex items-center text-xs md:text-sm"><BsArrowLeft className="mx-2 text-2xl"/> {nextSection.fields.title}</Link>
                <Link href={`/${prevSection.fields.slug}/home`} className="flex items-center text-xs md:text-sm">{prevSection.fields.title} <BsArrowRight className="mx-2 text-2xl"/></Link>
            </div>
            <button className="w-12 h-full bg-red-500 text-white cursor-pointer hover:bg-red-700 transition-colors">
                <Link href="/" className="block w-full h-full leading-[48px] text-center">X</Link>
            </button>
        </div>
      </div>
    </div>
  );
}