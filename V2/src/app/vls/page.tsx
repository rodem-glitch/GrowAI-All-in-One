import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "VLS - GrowAI",
  description: "VLS (Virtual Learning Space) - Immersive virtual learning environments",
};

export default function VlsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-lg w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-sky-100 mb-6">
          <span className="text-3xl font-black text-sky-600">VLS</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Virtual Learning Space</h1>
        <p className="text-gray-500 mb-8">
          Immersive virtual learning environments with AI-driven personalized experiences and real-time collaboration.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 text-sky-700 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          Coming Soon
        </div>
        <div className="block">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
