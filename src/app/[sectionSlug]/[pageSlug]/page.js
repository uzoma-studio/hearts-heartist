import React from "react";
import { getEntries } from "@/lib/contentful";
import Link from "next/link";
import Image from "next/image";
import RichTextRenderer from "@/lib/richTextRenderer";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Navbar from "@/components/navbar";

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
  const coverImageWidth = page.fields?.coverImage?.fields?.file?.details?.image?.width || 1200;
  const coverImageHeight = page.fields?.coverImage?.fields?.file?.details?.image?.height || 500;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center flex-col w-full">
      <Navbar />
      <div className="relative w-full h-full bg-white/90 overflow-auto">
        <div className="w-full h-12 border-b border-t border-gray-200 flex items-center justify-between mt-4">
            <div className="flex w-full items-center justify-between px-4">
                <Link href={`/${nextSection.fields.slug}/home`} className="flex items-center"><BsArrowLeft className="mx-2 text-2xl"/> {nextSection.fields.title}</Link>
                <Link href={`/${prevSection.fields.slug}/home`} className="flex items-center">{prevSection.fields.title} <BsArrowRight className="mx-2 text-2xl"/></Link>
            </div>
            <button className="w-12 h-full bg-red-500 text-white cursor-pointer hover:bg-red-700 transition-colors">
                <Link href="/" className="block w-full h-full leading-[48px] text-center">X</Link>
            </button>
        </div>
        <div className="w-full h-24 border-b border-gray-200 flex items-center justify-between p-6">
            <h2 className="text-3xl font-semibold">{section.fields?.title}</h2>
            <div className="flex">
                {
                    sectionPages.map((p) => (
                        <div key={p.sys.id} className="mx-4 py-2">
                            <a href={`/${sectionSlug}/${p.fields.slug}`} className={`text-blue-600 hover:underline ${p.fields.slug === pageSlug ? 'font-bold underline' : ''}`}>
                                {p.fields.title}
                            </a>
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
        <h2 className="text-2xl font-semibold mb-4 p-6">{page.fields.title}</h2>
        <div className="p-6">
          <RichTextRenderer content={page.fields?.content} />
        </div>
      </div>
    </div>
  );
}