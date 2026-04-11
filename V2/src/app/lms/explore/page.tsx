import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Courses - LMS",
  description: "Browse and discover AI-generated learning courses",
};

export default function ExplorePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Courses</h1>
      <p className="text-gray-500 mb-8">
        Discover AI-generated learning content powered by CREATOR and FKDS.
      </p>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-xl">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            readOnly
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["All", "Technology", "Business", "Design", "Marketing", "Data Science"].map(
          (category) => (
            <span
              key={category}
              className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600 cursor-pointer transition-colors"
            >
              {category}
            </span>
          )
        )}
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 mb-4">
          <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses available yet</h3>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Courses will appear here once they are generated through the LearnForm CREATOR pipeline.
        </p>
      </div>
    </div>
  );
}
