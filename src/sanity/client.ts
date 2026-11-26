import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

/** Read-only client (published content, CDN). Server components only. */
export const client = createClient({
  projectId: projectId || "unconfigured",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
