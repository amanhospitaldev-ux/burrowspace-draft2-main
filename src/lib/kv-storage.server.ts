/**
 * Cloudflare KV-based data storage utilities
 * This replaces the static JSON files with persistent KV storage
 */

import type { FAQItem, AboutResponse, ContactFormData, ContactSubmission, JoinUsFormData, JoinUsSubmission } from "@/types/api";
import aboutSeed from "@/server/data/about.json";
import { env } from "cloudflare:workers";

type KVNamespaceSubset = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
  list(options?: { prefix?: string }): Promise<{ keys: { name: string }[] }>;
};

const getFaqsNamespace = (): KVNamespaceSubset | undefined => env.FAQS_KV;

const getAboutNamespace = (): KVNamespaceSubset | undefined => env.ABOUT_KV;

const getContactNamespace = (): KVNamespaceSubset | undefined => getAboutNamespace();
const CONTACT_MESSAGES_KEY = "contact_messages";
const JOIN_US_SUBMISSIONS_KEY = "join_us_submissions";

// Default data (fallback if KV is empty)
const DEFAULT_FAQS: FAQItem[] = [
  {
    q: "What is BurrowSpace?",
    a: "BurrowSpace is a secure, decentralized platform for digital asset management and collaboration.",
    category: "General"
  },
  {
    q: "How do I get started?",
    a: "Simply create an account and start exploring our features. Our intuitive interface makes it easy to begin.",
    category: "Getting Started"
  }
];

const DEFAULT_ABOUT: AboutResponse = aboutSeed as AboutResponse;

/**
 * Get all FAQs from KV storage
 */
export async function getAllFaqs(): Promise<FAQItem[]> {
  try {
    const kv = getFaqsNamespace();
    if (kv) {
      const data = await kv.get('faqs');
      if (data) {
        return JSON.parse(data);
      }
      // Initialize with default data
      await kv.put('faqs', JSON.stringify(DEFAULT_FAQS));
      return DEFAULT_FAQS;
    }
  } catch (error) {
    console.error('Failed to load FAQs from KV:', error);
  }

  // Fallback to default data
  return DEFAULT_FAQS;
}

/**
 * Search FAQs by query and/or category
 */
export async function searchFaqs(query: string = "", category: string = "All"): Promise<FAQItem[]> {
  const allFaqs = await getAllFaqs();

  return allFaqs.filter(faq => {
    const matchesQuery = query === "" ||
      faq.q.toLowerCase().includes(query.toLowerCase()) ||
      faq.a.toLowerCase().includes(query.toLowerCase());

    const matchesCategory = category === "All" || faq.category === category;

    return matchesQuery && matchesCategory;
  });
}

/**
 * Get unique FAQ categories
 */
export async function getFaqCategories(): Promise<string[]> {
  const allFaqs = await getAllFaqs();
  const categories = [...new Set(allFaqs.map(faq => faq.category))];
  return ["All", ...categories.sort()];
}

/**
 * Save FAQs to KV storage
 */
export async function saveFaqs(faqs: FAQItem[]): Promise<boolean> {
  try {
    const kv = getFaqsNamespace();
    if (kv) {
      await kv.put('faqs', JSON.stringify(faqs));
      return true;
    }
  } catch (error) {
    console.error('Failed to save FAQs to KV:', error);
  }
  return false;
}

/**
 * Get About data from KV storage
 */
export async function getAbout(): Promise<AboutResponse> {
  try {
    const kv = getAboutNamespace();
    if (kv) {
      const data = await kv.get('about');
      if (data) {
        return JSON.parse(data);
      }
      // Initialize with default data
      await kv.put('about', JSON.stringify(DEFAULT_ABOUT));
      return DEFAULT_ABOUT;
    }
  } catch (error) {
    console.error('Failed to load About data from KV:', error);
  }

  // Fallback to default data
  return DEFAULT_ABOUT;
}

/**
 * Save About data to KV storage
 */
export async function saveAbout(about: AboutResponse): Promise<boolean> {
  try {
    const kv = getAboutNamespace();
    if (kv) {
      await kv.put('about', JSON.stringify(about));
      return true;
    }
  } catch (error) {
    console.error('Failed to save About data to KV:', error);
  }
  return false;
}

// Key format: contact:<email>  — one entry per email, latest submission wins
// To list all: kv.list({ prefix: CONTACT_MESSAGES_KEY + ":" })
export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    const kv = getContactNamespace();
    if (kv) {
      const { keys } = await kv.list({ prefix: CONTACT_MESSAGES_KEY + ":" });
      const submissions = await Promise.all(
        keys.map(async ({ name }) => {
          const data = await kv.get(name);
          return data ? (JSON.parse(data) as ContactSubmission) : null;
        })
      );
      return submissions.filter(Boolean) as ContactSubmission[];
    }
  } catch (error) {
    console.error('Failed to load contact submissions from KV:', error);
  }
  return [];
}

export async function saveContactSubmission(formData: ContactFormData): Promise<boolean> {
  try {
    const kv = getContactNamespace();
    if (!kv) return false;
    const submission: ContactSubmission = { ...formData, submittedAt: new Date().toISOString() };
    // Key: "contact_messages:<email>" — overwrites if same email resubmits
    const key = `${CONTACT_MESSAGES_KEY}:${formData.email.toLowerCase().trim()}`;
    await kv.put(key, JSON.stringify(submission));
    return true;
  } catch (error) {
    console.error('Failed to save contact submission:', error);
  }
  return false;
}

// Key format: join_us_submissions:<email>
export async function getJoinUsSubmissions(): Promise<JoinUsSubmission[]> {
  try {
    const kv = getContactNamespace();
    if (kv) {
      const { keys } = await kv.list({ prefix: JOIN_US_SUBMISSIONS_KEY + ":" });
      const submissions = await Promise.all(
        keys.map(async ({ name }) => {
          const data = await kv.get(name);
          return data ? (JSON.parse(data) as JoinUsSubmission) : null;
        })
      );
      return submissions.filter(Boolean) as JoinUsSubmission[];
    }
  } catch (error) {
    console.error('Failed to load join-us submissions from KV:', error);
  }
  return [];
}

export async function saveJoinUsSubmission(formData: JoinUsFormData): Promise<boolean> {
  try {
    const kv = getContactNamespace();
    if (!kv) return false;
    const submission: JoinUsSubmission = { ...formData, submittedAt: new Date().toISOString() };
    // Key: "join_us_submissions:<email>"
    const key = `${JOIN_US_SUBMISSIONS_KEY}:${formData.email.toLowerCase().trim()}`;
    await kv.put(key, JSON.stringify(submission));
    return true;
  } catch (error) {
    console.error('Failed to save join-us submission:', error);
  }
  return false;
}

