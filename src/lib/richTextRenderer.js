import React from "react";
import Image from "next/image";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const options = {
  renderNode: {
    'embedded-asset-block': (node) => {
      const { title, file } = node.data.target.fields;
      return (
        <div className="my-4">
          <Image
            src={`https:${file.url}`}
            alt={title}
            width={file.details.image.width}
            height={file.details.image.height}
            style={{maxWidth: '50%', borderRadius: '10px'}}
            className="object-cover"
          />
        </div>
      );
    },
    'heading-1': (node) => <h1 className="text-3xl font-bold my-4">{node.content[0].value}</h1>,
    'heading-2': (node) => <h2 className="text-2xl font-semibold my-4">{node.content[0].value}</h2>,
    'heading-3': (node) => <h3 className="text-xl font-semibold my-4">{node.content[0].value}</h3>,
    'paragraph': (node) => <p className="my-4">{node.content[0].value}</p>,
    'unordered-list': (node) => (
      <ul className="list-disc list-inside my-4">
        {node.content.map((listItem, index) => (
          <span key={index}>{documentToReactComponents(listItem)}</span>
        ))}
      </ul>
    ),
    'ordered-list': (node) => (
      <ol className="list-decimal list-inside my-4">
        {node.content.map((listItem, index) => (
          <span key={index}>{documentToReactComponents(listItem)}</span>
        ))}
      </ol>
    ),
  },
};

const RichTextRenderer = ({ content }) => {
  return <>{documentToReactComponents(content, options)}</>;
};

export default RichTextRenderer;