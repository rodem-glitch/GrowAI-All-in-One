import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community - LMS",
  description: "Connect with fellow learners and share knowledge",
};

export default function CommunityPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Community</h1>
      <p className="text-gray-500 mb-8">
        Connect with fellow learners, share knowledge, and grow together.
      </p>

      {/* Community Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[
          {
            title: "Discussion Forums",
            description: "Ask questions and share insights with the community.",
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            ),
          },
          {
            title: "Study Groups",
            description: "Join or create study groups for collaborative learning.",
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            ),
          },
          {
            title: "Knowledge Sharing (FKDS)",
            description: "Share your learning journey through the Feeling-Knowing-Doing-Sharing cycle.",
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            ),
          },
          {
            title: "Leaderboard",
            description: "See top contributors and track your community standing.",
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            ),
          },
        ].map((section) => (
          <div
            key={section.title}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 mb-4">
              {section.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{section.title}</h3>
            <p className="text-sm text-gray-500">{section.description}</p>
          </div>
        ))}
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-indigo-50 rounded-xl p-6 text-center">
        <p className="text-sm font-medium text-indigo-700">
          Community features are being built. Stay tuned for updates.
        </p>
      </div>
    </div>
  );
}
