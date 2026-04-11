import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - LMS",
  description: "LMS Dashboard - Track your learning progress",
};

export default function LmsDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-8">Welcome back. Track your learning progress.</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Enrolled Courses", value: "0", color: "bg-indigo-50 text-indigo-700" },
          { label: "Completed", value: "0", color: "bg-emerald-50 text-emerald-700" },
          { label: "Certificates", value: "0", color: "bg-amber-50 text-amber-700" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color} inline-block px-3 py-1 rounded-lg`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p className="text-sm">No recent activity yet.</p>
          <p className="text-xs mt-1">Explore courses to get started.</p>
        </div>
      </div>
    </div>
  );
}
