import { createClient } from "contentful";

/**
 * Contentful client & helpers
 * Expects env vars in .env.local:
 *  - NEXT_PUBLIC_CONTENTFUL_SPACE_ID
 *  - CONTENTFUL_ACCESS_TOKEN
 *  - (optional) CONTENTFUL_ENVIRONMENT
 */

const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || "master";

if (!SPACE_ID || !ACCESS_TOKEN) {
  // Fail early in development if not configured
  // (Server-only code path in Next.js app router)
  // eslint-disable-next-line no-console
  console.warn(
    "Contentful not configured. Set NEXT_PUBLIC_CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN in .env.local"
  );
}

export const client = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
  environment: ENVIRONMENT,
});

/**
 * Get entries by content type (returns items[])
 * @param {string} contentType
 * @param {object} query - additional query params (limit, order, etc.)
 */
export async function getEntries(contentType, query = {}) {
  const res = await client.getEntries({ content_type: contentType, ...query });
  return res.items || [];
}

/**
 * Get single entry by id
 * @param {string} id
 */
export async function getEntry(id) {
  const res = await client.getEntry(id);
  return res;
}

/**
 * Get assets
 * @param {object} query
 */
export async function getAssets(query = {}) {
  const res = await client.getAssets(query);
  return res.items || [];
}