import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

/** Read-only client (published content, CDN). Server components only. */
export const client = createClient({
  projectId: projectId || "unconfigured",
  dataset,
  apiVersion,
  // The CDN can lag a few minutes behind edits. Fine in production, confusing while building.
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
});
