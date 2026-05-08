import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bell,
  Bookmark,
  Hash,
  Home,
  Mail,
  MoreHorizontal,
  Search,
  Shield,
  User,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JoinUsModal from "@/components/JoinUsModal";

export const Route = createFileRoute("/cybersec-community")({
  head: () => ({
    meta: [
      { title: "Cybersec Community — BurrowSpace" },
      {
        name: "description",
        content:
          "A future community for emerging technology awareness and cybersecurity—preview UI only, launching soon.",
      },
      { property: "og:title", content: "Cybersec Community — BurrowSpace" },
      {
        property: "og:description",
        content: "Join us soon for conversations on tech and digital safety.",
      },
    ],
  }),
  component: CybersecCommunityPage,
});

const sidebarNav = [
  { icon: Home, label: "Home" },
  { icon: Hash, label: "Explore" },
  { icon: Bell, label: "Notifications" },
  { icon: Mail, label: "Messages" },
  { icon: Bookmark, label: "Bookmarks" },
  { icon: Users, label: "Community" },
  { icon: User, label: "Profile" },
  { icon: MoreHorizontal, label: "More" },
] as const;

const mockPosts = [
  {
    handle: "@privacy_first",
    name: "Privacy Collective",
    time: "2h",
    body: "Zero-knowledge isn’t just jargon—it’s how we design systems where the server never learns your secrets. Worth a thread soon.",
    stats: { replies: "—", reposts: "—", likes: "—" },
  },
  {
    handle: "@signal_ops",
    name: "Signal Ops",
    time: "5h",
    body: "Phishing evolved again: AI-written lures that pass the smell test. Basic hygiene—MFA, device posture, skepticism—still wins.",
    stats: { replies: "—", reposts: "—", likes: "—" },
  },
  {
    handle: "@burrowspace",
    name: "BurrowSpace",
    time: "1d",
    body: "Preview only: this feed is static. When we launch, this will be a place to learn emerging tech and why cybersecurity matters.",
    stats: { replies: "—", reposts: "—", likes: "—" },
  },
] as const;

const trending = [
  { category: "Security · Trending", title: "#SupplyChain", posts: "Preview" },
  { category: "Technology · Trending", title: "Post-quantum readiness", posts: "Preview" },
  { category: "Awareness · Trending", title: "Safe defaults", posts: "Preview" },
] as const;

function CybersecCommunityPage() {
  const [joinUsOpen, setJoinUsOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[oklch(0.08_0.02_260)] pt-28 pb-16 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Coming soon ribbon */}
          <div className="mb-8 rounded-2xl border border-brand/30 bg-brand/10 px-5 py-4 sm:px-7 sm:py-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06]">
                  <Shield className="h-5 w-5 text-brand" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-[0.25em] text-brand">COMING SOON</p>
                  <h1 className="mt-1 font-heading text-xl font-black tracking-tight text-white sm:text-2xl">
                    Cybersec Community
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/65">
                    We&apos;re building a community to explore emerging technology and spread awareness
                    about why cybersecurity matters—for individuals, teams, and the infrastructure we
                    all rely on. The experience below is a static preview; nothing here is live yet.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setJoinUsOpen(true)}
                className="mt-4 inline-flex shrink-0 items-center justify-center rounded-lg border border-white/20 px-4 py-2.5 text-xs font-semibold tracking-wide text-white transition-colors hover:border-brand/50 hover:bg-white/[0.06] sm:mt-0"
              >
                Get updates →
              </button>
            </div>
          </div>

          {/* Twitter/X-inspired three-column layout (non-functional preview) */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,200px)_minmax(0,1fr)_minmax(0,280px)]">
            {/* Left: nav rail */}
            <aside className="hidden lg:block">
              <nav
                className="sticky top-32 space-y-1 rounded-2xl border border-white/10 bg-white/[0.02] p-3"
                aria-label="Community navigation preview"
              >
                {sidebarNav.map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    type="button"
                    disabled
                    className="flex w-full cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-white/50 opacity-70"
                    title="Preview only — not available yet"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-white/45" aria-hidden />
                    <span className="font-medium">{label}</span>
                  </button>
                ))}
                <button
                  type="button"
                  disabled
                  className="mt-3 w-full cursor-not-allowed rounded-full bg-brand py-3 text-center text-sm font-bold text-white opacity-60"
                >
                  Post
                </button>
                <p className="mt-3 border-t border-white/10 px-1 pt-3 text-[10px] uppercase tracking-wider text-white/35">
                  Preview UI · actions disabled
                </p>
              </nav>
            </aside>

            {/* Center: feed */}
            <section className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.02]">
              <header className="sticky top-24 z-10 flex items-center justify-between border-b border-white/10 bg-[oklch(0.08_0.02_260)]/90 px-4 py-3 backdrop-blur-md">
                <div>
                  <h2 className="font-heading text-lg font-bold">Home</h2>
                  <p className="text-[11px] text-white/45">Static mock feed</p>
                </div>
                <button
                  type="button"
                  disabled
                  className="cursor-not-allowed rounded-full border border-white/15 p-2 text-white/40"
                  aria-label="Search (preview only, disabled)"
                >
                  <Search className="h-4 w-4" />
                </button>
              </header>

              {/* Compose (disabled) */}
              <div className="border-b border-white/10 p-4">
                <div className="flex gap-3">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-brand/80 to-white/20 ring-2 ring-white/10" />
                  <div className="min-w-0 flex-1">
                    <label htmlFor="compose-preview" className="sr-only">
                      Compose post preview
                    </label>
                    <textarea
                      id="compose-preview"
                      readOnly
                      rows={3}
                      placeholder="What's happening in security and tech? (Preview — not saved)"
                      className="w-full resize-none rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm text-white/50 placeholder:text-white/35 focus:outline-none"
                    />
                    <div className="mt-3 flex items-center justify-end gap-2 border-t border-white/10 pt-3">
                      <button
                        type="button"
                        disabled
                        className="cursor-not-allowed rounded-full bg-brand/50 px-5 py-2 text-sm font-semibold text-white opacity-60"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Posts */}
              <ul className="divide-y divide-white/10">
                {mockPosts.map((post) => (
                  <li key={post.handle} className="px-4 py-4 transition-colors hover:bg-white/[0.03]">
                    <div className="flex gap-3">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-white/10 ring-1 ring-white/10" />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                          <span className="truncate text-sm font-bold">{post.name}</span>
                          <span className="text-sm text-white/45">{post.handle}</span>
                          <span className="text-sm text-white/35">· {post.time}</span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-white/75">{post.body}</p>
                        <div className="mt-3 flex max-w-md items-center justify-between text-xs text-white/35">
                          <span>Replies {post.stats.replies}</span>
                          <span>Reposts {post.stats.reposts}</span>
                          <span>Likes {post.stats.likes}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Right: sidebar */}
            <aside className="hidden flex-col gap-4 lg:flex">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                  <input
                    type="search"
                    readOnly
                    placeholder="Search community (preview)"
                    className="w-full cursor-not-allowed rounded-full border border-white/10 bg-white/[0.06] py-2.5 pl-9 pr-3 text-sm text-white/50 placeholder:text-white/35"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02]">
                <h3 className="border-b border-white/10 px-4 py-3 font-heading text-base font-bold">
                  What&apos;s happening
                </h3>
                <ul>
                  {trending.map((item, i) => (
                    <li
                      key={i}
                      className="cursor-default border-b border-white/5 px-4 py-3 last:border-0 hover:bg-white/[0.03]"
                    >
                      <p className="text-[11px] text-white/45">{item.category}</p>
                      <p className="mt-0.5 text-sm font-semibold text-white">{item.title}</p>
                      <p className="mt-0.5 text-[11px] text-white/40">{item.posts}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-4">
                <p className="text-xs font-semibold text-brand">Who to follow</p>
                <p className="mt-2 text-xs leading-relaxed text-white/50">
                  Suggestions will appear here when the community goes live.
                </p>
                <button
                  type="button"
                  disabled
                  className="mt-3 w-full cursor-not-allowed rounded-full border border-white/15 py-2 text-xs font-semibold text-white/40"
                >
                  Show more
                </button>
              </div>
            </aside>
          </div>

          <p className="mt-8 text-center text-xs text-white/40">
            This page is a design preview only. No posts, searches, or notifications are connected yet.
          </p>
        </div>
      </main>
      <Footer />
      <JoinUsModal open={joinUsOpen} onOpenChange={setJoinUsOpen} />
    </>
  );
}
