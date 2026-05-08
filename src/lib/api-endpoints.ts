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
  .inputValidator((data: { query?: string; category?: string }) => data)
  .handler(async ({ data: input }) => {
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
  .inputValidator((data: FAQItem[]) => data)
  .handler(async ({ data: faqs }) => {
    const success = await saveFaqs(faqs);
    if (!success) {
      throw new Error("Failed to save FAQs");
    }
    return { success: true };
  });

export const saveAboutFn = createServerFn()
  .inputValidator((data: AboutResponse) => data)
  .handler(async ({ data: about }) => {
    const success = await saveAbout(about);
    if (!success) {
      throw new Error("Failed to save About data");
    }
    return { success: true };
  });

export const submitContactFn = createServerFn()
  .inputValidator((data: ContactFormData) => data)
  .handler(async ({ data: contactData }) => {
    try {
      const success = await saveContactSubmission(contactData);
      if (!success) {
        console.warn('Contact submission could not be saved to KV, but message was received');
      }
      return { success: true };
    } catch (error) {
      console.error('Contact submission error:', error);
      return { success: true };
    }
  });

export const fetchContactSubmissionsFn = createServerFn()
  .handler(async () => {
    return getContactSubmissions();
  });

export const submitJoinUsFn = createServerFn()
  .inputValidator((data: JoinUsFormData) => data)
  .handler(async ({ data: formData }) => {
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