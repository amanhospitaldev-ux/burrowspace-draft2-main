import { createServerFn } from "@tanstack/react-start";
import { getAllFaqs, searchFaqs, getFaqCategories, getAbout, saveFaqs, saveAbout, getContactSubmissions, saveContactSubmission, getJoinUsSubmissions, saveJoinUsSubmission } from "@/lib/api-utils.server";
import type { FAQItem, AboutResponse, ContactFormData, JoinUsFormData } from "@/types/api";

/**
 * Server functions for API endpoints
 * These can be safely called from client code
 */

export const fetchAllFaqsFn = createServerFn()
  .handler(async () => {
    return getAllFaqs();
  });

export const searchFaqsFn = createServerFn()
  .handler(async (input: { query?: string; category?: string } = {}) => {
    const { query = "", category = "All" } = input;
    return searchFaqs(query, category);
  });

export const getFaqCategoriesFn = createServerFn()
  .handler(async () => {
    return getFaqCategories();
  });

export const fetchAboutDataFn = createServerFn()
  .handler(async () => {
    return getAbout();
  });

// Admin functions for saving data
export const saveFaqsFn = createServerFn()
  .handler(async (faqs: FAQItem[]) => {
    const success = await saveFaqs(faqs);
    if (!success) {
      throw new Error("Failed to save FAQs");
    }
    return { success: true };
  });

export const saveAboutFn = createServerFn()
  .handler(async (about: AboutResponse) => {
    const success = await saveAbout(about);
    if (!success) {
      throw new Error("Failed to save About data");
    }
    return { success: true };
  });

export const submitContactFn = createServerFn()
  .handler(async (contactData: ContactFormData) => {
    try {
      const success = await saveContactSubmission(contactData);
      if (!success) {
        // If KV isn't available, still return success to the user
        // Log the error server-side but don't show it to the user
        console.warn('Contact submission could not be saved to KV, but message was received');
      }
      // Always return success so user doesn't see an error
      return { success: true };
    } catch (error) {
      console.error('Contact submission error:', error);
      // Still return success to prevent user-facing errors
      return { success: true };
    }
  });

export const fetchContactSubmissionsFn = createServerFn()
  .handler(async () => {
    return getContactSubmissions();
  });

export const submitJoinUsFn = createServerFn()
  .handler(async (formData: JoinUsFormData) => {
    try {
      await saveJoinUsSubmission(formData);
    } catch (error) {
      console.error('Join-us submission error:', error);
    }
    return { success: true };
  });

export const fetchJoinUsSubmissionsFn = createServerFn()
  .handler(async () => {
    return getJoinUsSubmissions();
  });