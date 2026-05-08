/**
 * Server-only utilities for fetching About and FAQ data
 * Now uses Cloudflare KV storage for persistence
 */

import { getAllFaqs, searchFaqs, getFaqCategories, getAbout, saveFaqs, saveAbout, getContactSubmissions, saveContactSubmission, getJoinUsSubmissions, saveJoinUsSubmission } from "@/lib/kv-storage.server";

// Re-export functions from KV storage
export { getAllFaqs, searchFaqs, getFaqCategories, getAbout, saveFaqs, saveAbout, getContactSubmissions, saveContactSubmission, getJoinUsSubmissions, saveJoinUsSubmission };
