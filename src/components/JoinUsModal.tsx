"use client";

import { useState, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { submitJoinUs } from "@/lib/api-utils";
import type { JoinUsFormData } from "@/types/api";

const TOPICS = [
  "Engineering",
  "Design",
  "Marketing",
  "Community",
  "Research",
  "Business Development",
  "Other",
];

const EMPTY_FORM: JoinUsFormData = {
  firstName: "",
  lastName: "",
  email: "",
  topic: "",
  yourThoughts: "",
  whyJoinUs: "",
};

interface JoinUsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function JoinUsModal({ open, onOpenChange }: JoinUsModalProps) {
  const [formData, setFormData] = useState<JoinUsFormData>(EMPTY_FORM);
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const set = (field: keyof JoinUsFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitState === "submitting") return;

    const missing = (Object.keys(EMPTY_FORM) as (keyof JoinUsFormData)[]).find(
      (k) => !formData[k].trim()
    );
    if (missing) {
      setSubmitError("Please fill in every field before submitting.");
      setSubmitState("error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setSubmitError("Please enter a valid email address.");
      setSubmitState("error");
      return;
    }

    setSubmitState("submitting");
    setSubmitError(null);

    try {
      await submitJoinUs(formData);
      setSubmitState("success");
      setFormData(EMPTY_FORM);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
      setSubmitState("error");
    }
  };

  const handleOpenChange = (val: boolean) => {
    if (!val) {
      setSubmitState("idle");
      setSubmitError(null);
    }
    onOpenChange(val);
  };

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-brand/50 focus:outline-none";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg border-white/10 bg-[oklch(0.08_0.02_260)] text-white sm:rounded-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <p className="text-xs font-semibold tracking-[0.35em] text-brand">JOIN US</p>
          <DialogTitle className="mt-2 font-heading text-2xl font-black text-white">
            Be Part of BurrowSpace
          </DialogTitle>
          <DialogDescription className="text-sm text-white/60 leading-relaxed">
            Tell us a bit about yourself and why you want to join our mission.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-4">
          {submitState === "success" && (
            <Alert className="border-brand/40 bg-brand/10 text-brand">
              <AlertTitle>Application received!</AlertTitle>
              <AlertDescription>
                Thanks for reaching out. We'll get back to you soon.
              </AlertDescription>
            </Alert>
          )}
          {submitState === "error" && submitError && (
            <Alert variant="destructive">
              <AlertTitle>Submission failed</AlertTitle>
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          {/* Name row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs text-white/60">First name</label>
              <input
                type="text"
                placeholder="Arjun"
                value={formData.firstName}
                onChange={set("firstName")}
                className={inputCls}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-white/60">Last name</label>
              <input
                type="text"
                placeholder="Sharma"
                value={formData.lastName}
                onChange={set("lastName")}
                className={inputCls}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-xs text-white/60">Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={set("email")}
              className={inputCls}
            />
          </div>

          {/* Topic */}
          <div>
            <label className="mb-1.5 block text-xs text-white/60">Topic / Area of interest</label>
            <select
              value={formData.topic}
              onChange={set("topic")}
              className="w-full rounded-lg border border-white/10 bg-[oklch(0.08_0.02_260)] px-4 py-3 text-sm text-white/60 focus:border-brand/50 focus:outline-none"
            >
              <option value="">Select a topic...</option>
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Your thoughts */}
          <div>
            <label className="mb-1.5 block text-xs text-white/60">Your thoughts</label>
            <textarea
              rows={3}
              placeholder="Share what excites you about BurrowSpace, privacy tech, or decentralization..."
              value={formData.yourThoughts}
              onChange={set("yourThoughts")}
              className={`${inputCls} resize-none`}
            />
          </div>

          {/* Why join us */}
          <div>
            <label className="mb-1.5 block text-xs text-white/60">Why do you want to join us?</label>
            <textarea
              rows={3}
              placeholder="What motivates you to be part of the BurrowSpace journey?"
              value={formData.whyJoinUs}
              onChange={set("whyJoinUs")}
              className={`${inputCls} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={submitState === "submitting"}
            className="mt-2 w-full rounded-lg bg-brand py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitState === "submitting"
              ? "Submitting…"
              : submitState === "success"
              ? "Submitted!"
              : "Submit application →"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
