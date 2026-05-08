import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchAllFaqs, getFaqCategories, fetchAboutData } from "@/lib/api-utils";
import { saveFaqsFn, saveAboutFn } from "@/lib/api-endpoints";
import type { FAQItem, AboutResponse } from "@/types/api";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — BurrowSpace" },
      { name: "description", content: "Manage FAQ and About content" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [about, setAbout] = useState<AboutResponse>({ sections: [], founders: [] });
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'faqs' | 'about'>('faqs');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [faqsData, categoriesData, aboutData] = await Promise.all([
        fetchAllFaqs(),
        getFaqCategories(),
        fetchAboutData()
      ]);
      setFaqs(faqsData);
      setCategories(categoriesData);
      setAbout(aboutData);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveFaqs = async () => {
    setSaving(true);
    try {
      await saveFaqsFn({ data: faqs });
      alert("FAQs saved successfully!");
    } catch (error) {
      console.error("Failed to save FAQs:", error);
      alert("Failed to save FAQs");
    } finally {
      setSaving(false);
    }
  };

  const saveAbout = async () => {
    setSaving(true);
    try {
      await saveAboutFn({ data: about });
      alert("About data saved successfully!");
    } catch (error) {
      console.error("Failed to save About data:", error);
      alert("Failed to save About data");
    } finally {
      setSaving(false);
    }
  };

  const addFaq = () => {
    setFaqs([...faqs, { q: "", a: "", category: "General" }]);
  };

  const updateFaq = (index: number, field: keyof FAQItem, value: string) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    setFaqs(updated);
  };

  const removeFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const addAboutSection = () => {
    setAbout({
      ...about,
      sections: [...about.sections, { title: "", label: "", content: "" }]
    });
  };

  const updateAboutSection = (index: number, field: string, value: string) => {
    const updated = [...about.sections];
    updated[index] = { ...updated[index], [field]: value };
    setAbout({ ...about, sections: updated });
  };

  const removeAboutSection = (index: number) => {
    setAbout({
      ...about,
      sections: about.sections.filter((_, i) => i !== index)
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[oklch(0.08_0.02_260)] text-white pt-32 pb-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="flex items-center gap-3 py-10">
              <div className="h-6 w-6 rounded-full border-2 border-white/40 border-t-transparent animate-spin" />
              <span>Loading admin panel...</span>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[oklch(0.08_0.02_260)] text-white pt-32 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="mb-8 text-3xl font-bold">Admin Panel</h1>

          {/* Tabs */}
          <div className="mb-8 flex gap-4">
            <button
              onClick={() => setActiveTab('faqs')}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                activeTab === 'faqs'
                  ? 'border-white/50 bg-white/10'
                  : 'border-white/20 hover:border-white/30'
              }`}
            >
              Manage FAQs
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                activeTab === 'about'
                  ? 'border-white/50 bg-white/10'
                  : 'border-white/20 hover:border-white/30'
              }`}
            >
              Manage About
            </button>
          </div>

          {/* FAQ Management */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">FAQ Management</h2>
                <div className="flex gap-3">
                  <button
                    onClick={addFaq}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                  >
                    Add FAQ
                  </button>
                  <button
                    onClick={saveFaqs}
                    disabled={saving}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors"
                  >
                    {saving ? 'Saving...' : 'Save FAQs'}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-sm text-white/60">FAQ #{index + 1}</span>
                      <button
                        onClick={() => removeFaq(index)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Question</label>
                        <input
                          type="text"
                          value={faq.q}
                          onChange={(e) => updateFaq(index, 'q', e.target.value)}
                          className="w-full rounded border border-white/15 bg-white/[0.04] px-3 py-2 text-sm"
                          placeholder="Enter question..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Answer</label>
                        <textarea
                          value={faq.a}
                          onChange={(e) => updateFaq(index, 'a', e.target.value)}
                          className="w-full rounded border border-white/15 bg-white/[0.04] px-3 py-2 text-sm min-h-[100px]"
                          placeholder="Enter answer..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select
                          value={faq.category}
                          onChange={(e) => updateFaq(index, 'category', e.target.value)}
                          className="rounded border border-white/15 bg-white/[0.04] px-3 py-2 text-sm"
                        >
                          {categories.filter(cat => cat !== 'All').map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* About Management */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">About Management</h2>
                <div className="flex gap-3">
                  <button
                    onClick={addAboutSection}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                  >
                    Add Section
                  </button>
                  <button
                    onClick={saveAbout}
                    disabled={saving}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors"
                  >
                    {saving ? 'Saving...' : 'Save About'}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {about.sections.map((section, index) => (
                  <div key={index} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-sm text-white/60">Section #{index + 1}</span>
                      <button
                        onClick={() => removeAboutSection(index)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) => updateAboutSection(index, 'title', e.target.value)}
                          className="w-full rounded border border-white/15 bg-white/[0.04] px-3 py-2 text-sm"
                          placeholder="Enter section title..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Label</label>
                        <input
                          type="text"
                          value={section.label}
                          onChange={(e) => updateAboutSection(index, 'label', e.target.value)}
                          className="w-full rounded border border-white/15 bg-white/[0.04] px-3 py-2 text-sm"
                          placeholder="Enter section label..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Content</label>
                        <textarea
                          value={section.content}
                          onChange={(e) => updateAboutSection(index, 'content', e.target.value)}
                          className="w-full rounded border border-white/15 bg-white/[0.04] px-3 py-2 text-sm min-h-[150px]"
                          placeholder="Enter section content..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}