import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CCB - GrowAI",
  description: "CCB (Content Creation Board) - Collaborative content planning and review board",
};

export default function CcbPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-lg w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-amber-100 mb-6">
          <span className="text-3xl font-black text-amber-600">CCB</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Creation Board</h1>
        <p className="text-gray-500 mb-8">
          Collaborative content planning and review board with Human-in-the-Loop approval workflows.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
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
