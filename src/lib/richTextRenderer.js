import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  documentToReactComponents,
} from "@contentful/rich-text-react-renderer";
import {
  BLOCKS,
  INLINES,
  MARKS,
} from "@contentful/rich-text-types";

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => (
      <strong className="font-semibold">{text}</strong>
    ),
    [MARKS.ITALIC]: (text) => (
      <em className="italic">{text}</em>
    ),
  },

  renderNode: {
    /* ------------------ HEADINGS ------------------ */
    [BLOCKS.HEADING_1]: (_, children) => (
      <h1 className="text-3xl md:text-4xl font-semibold my-6">
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (_, children) => (
      <h2 className="text-2xl md:text-3xl font-semibold my-5">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (_, children) => (
      <h3 className="text-xl md:text-2xl font-semibold my-4">
        {children}
      </h3>
    ),

    /* ------------------ TEXT ------------------ */
    [BLOCKS.PARAGRAPH]: (_, children) => (
      <p className="my-4 leading-relaxed text-base text-md text-gray-700">
        {children}
      </p>
    ),

    /* ------------------ LISTS ------------------ */
    [BLOCKS.UL_LIST]: (_, children) => (
      <ul className="list-disc pl-6 my-4 space-y-2">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (_, children) => (
      <ol className="list-decimal pl-6 my-4 space-y-2">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (_, children) => (
      <li className="leading-relaxed">
        {children}
      </li>
    ),

    /* ------------------ LINKS ------------------ */
    [INLINES.HYPERLINK]: (node, children) => {
      const url = node.data.uri;

      const isExternal = url.startsWith("http");

      if (isExternal) {
        return (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          href={url}
          className="underline underline-offset-4 hover:opacity-80 transition-opacity"
        >
          {children}
        </Link>
      );
    },

    /* ------------------ IMAGES ------------------ */
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { title, file } = node.data.target.fields;

      return (
        <div className="my-8 flex justify-center">
          <Image
            src={`https:${file.url}`}
            alt={title || ""}
            width={file.details.image.width}
            height={file.details.image.height}
            className="rounded-lg object-cover max-w-full md:max-w-[50%]"
          />
        </div>
      );
    },
  },
};

const RichTextRenderer = ({ content }) => {
  if (!content) return null;

  return (
    <div className="rich-text">
      {documentToReactComponents(content, options)}
    </div>
  );
};

export default RichTextRenderer;