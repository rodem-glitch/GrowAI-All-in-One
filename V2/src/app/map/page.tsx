import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MAP - GrowAI",
  description: "MAP (Managed AI Pipeline) - AI pipeline management service",
};

export default function MapPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-lg w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-violet-100 mb-6">
          <span className="text-3xl font-black text-violet-600">MAP</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Managed AI Pipeline</h1>
        <p className="text-gray-500 mb-8">
          End-to-end AI pipeline orchestration and management for automated content generation workflows.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 text-violet-700 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
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
