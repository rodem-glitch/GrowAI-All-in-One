"use client";

import { useTheme } from "@/contexts/ThemeContext";

export type MockupType =
  | "editor"
  | "dashboard"
  | "analytics"
  | "chat"
  | "code"
  | "globe"
  | "video"
  | "timeline"
  | "safety"
  | "bim"
  | "search"
  | "settings"
  | "subtitle"
  | "codereview"
  | "monitor"
  | "lf-editor"
  | "lf-dashboard"
  | "lf-ai-results";

export default function MockupIllustration({
  type,
  title,
  desc,
}: {
  type: MockupType;
  title?: string;
  desc?: string;
}) {
  const { colors } = useTheme();
  const p = colors.primary;

  const frame = "h-56 rounded-2xl overflow-hidden relative bg-[#1a1b23] shadow-inner";
  const windowBar = (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25262e] border-b border-[#2e2f3a]">
      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
      {title && (
        <span className="ml-2 text-[8px] text-gray-500 truncate">{title}</span>
      )}
    </div>
  );

  const renders: Record<MockupType, React.ReactNode> = {
    editor: (
      <div className={frame}>
        {windowBar}
        <div className="flex h-[calc(100%-28px)]">
          <div className="w-[52px] bg-[#1e1f28] border-r border-[#2e2f3a] py-2 flex flex-col items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
            <svg className="w-4 h-4" style={{ color: p }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" /></svg>
          </div>
          <div className="flex-1 p-3 overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[9px] font-medium px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: p }}>Module 1</span>
              <span className="text-[9px] text-gray-500 px-1.5 py-0.5 rounded bg-[#2a2b35]">Module 2</span>
              <span className="text-[9px] text-gray-500 px-1.5 py-0.5 rounded bg-[#2a2b35]">Module 3</span>
            </div>
            <p className="text-[10px] font-semibold text-gray-200 mb-1">AI 기반 교수설계 개론</p>
            <p className="text-[8px] text-gray-500 leading-relaxed mb-2">본 모듈에서는 인공지능을 활용한 교수설계의 기본 원리와 CREATOR 프레임워크의 적용 방법을 학습합니다.</p>
            <div className="flex gap-2">
              <div className="w-[72px] h-[42px] rounded bg-gradient-to-br from-blue-900/60 to-indigo-900/40 flex items-center justify-center border border-blue-800/30">
                <span className="text-[7px] text-blue-300">📹 Intro Video</span>
              </div>
              <div className="w-[72px] h-[42px] rounded border border-dashed border-gray-600 flex items-center justify-center">
                <span className="text-[7px] text-gray-500">+ Add Block</span>
              </div>
            </div>
          </div>
          <div className="w-[130px] bg-[#1e1f28] border-l border-[#2e2f3a] p-2 overflow-hidden">
            <p className="text-[8px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Properties</p>
            <div className="space-y-1.5">
              <div><p className="text-[7px] text-gray-500">Title</p><div className="h-4 rounded bg-[#2a2b35] px-1 flex items-center"><span className="text-[8px] text-gray-300">AI 교수설계 개론</span></div></div>
              <div><p className="text-[7px] text-gray-500">Duration</p><div className="h-4 rounded bg-[#2a2b35] px-1 flex items-center"><span className="text-[8px] text-gray-300">15 min</span></div></div>
              <div><p className="text-[7px] text-gray-500">AI Model</p><div className="h-4 rounded px-1 flex items-center" style={{ backgroundColor: `${p}20` }}><span className="text-[8px]" style={{ color: p }}>Gemini 2.5</span></div></div>
            </div>
          </div>
        </div>
      </div>
    ),

    dashboard: (
      <div className={frame}>
        {windowBar}
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-semibold text-gray-200">Overview Dashboard</p>
            <span className="text-[8px] text-gray-500">Last 30 days</span>
          </div>
          <div className="flex gap-2 mb-2">
            {[
              { label: "Total Users", val: "12,847", change: "+12.5%", up: true },
              { label: "Completion", val: "78.3%", change: "+3.2%", up: true },
              { label: "Avg. Score", val: "86.4", change: "-1.1%", up: false },
            ].map((s) => (
              <div key={s.label} className="flex-1 bg-[#22232d] rounded-lg p-2 border border-[#2e2f3a]">
                <p className="text-[7px] text-gray-500">{s.label}</p>
                <p className="text-[13px] font-bold text-white">{s.val}</p>
                <span className={`text-[7px] ${s.up ? "text-emerald-400" : "text-red-400"}`}>{s.change}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="flex-1 bg-[#22232d] rounded-lg p-2 border border-[#2e2f3a] h-[76px]">
              <p className="text-[7px] text-gray-500 mb-1">Weekly Active Users</p>
              <div className="flex items-end gap-[3px] h-[48px]">
                {[35, 52, 43, 68, 57, 72, 48, 85, 63, 78, 90, 67].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-sm transition-all" style={{ height: `${h}%`, backgroundColor: i === 10 ? p : `${p}40` }} />
                ))}
              </div>
            </div>
            <div className="w-24 bg-[#22232d] rounded-lg p-2 border border-[#2e2f3a] h-[76px]">
              <p className="text-[7px] text-gray-500 mb-1">Progress</p>
              <div className="relative w-14 h-14 mx-auto">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#2e2f3a" strokeWidth="3" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke={p} strokeWidth="3" strokeDasharray="78 22" strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">78%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    analytics: (
      <div className={frame}>
        {windowBar}
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-semibold text-gray-200">Performance Analytics</p>
            <div className="flex gap-1">
              <span className="text-[7px] px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: p }}>7D</span>
              <span className="text-[7px] px-1.5 py-0.5 rounded text-gray-500 bg-[#2a2b35]">30D</span>
              <span className="text-[7px] px-1.5 py-0.5 rounded text-gray-500 bg-[#2a2b35]">90D</span>
            </div>
          </div>
          <div className="bg-[#22232d] rounded-lg p-2 border border-[#2e2f3a] h-[88px] mb-2">
            <svg viewBox="0 0 280 60" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={p} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={p} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,45 C20,42 40,38 60,28 C80,18 100,22 120,15 C140,8 160,12 180,18 C200,24 220,10 240,6 C260,2 280,8 280,8 V60 H0Z" fill="url(#aGrad)" />
              <path d="M0,45 C20,42 40,38 60,28 C80,18 100,22 120,15 C140,8 160,12 180,18 C200,24 220,10 240,6 C260,2 280,8 280,8" fill="none" stroke={p} strokeWidth="1.5" />
              <circle cx="240" cy="6" r="3" fill={p} />
              <text x="244" y="5" fill={p} fontSize="6" fontWeight="bold">92.4%</text>
            </svg>
          </div>
          <div className="flex gap-2">
            {[
              { label: "Engagement", val: "92.4%" },
              { label: "Retention", val: "87.1%" },
              { label: "NPS Score", val: "+72" },
            ].map((m) => (
              <div key={m.label} className="flex-1 bg-[#22232d] rounded p-1.5 border border-[#2e2f3a]">
                <p className="text-[7px] text-gray-500">{m.label}</p>
                <p className="text-[10px] font-bold text-white">{m.val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),

    chat: (
      <div className={frame}>
        {windowBar}
        <div className="flex h-[calc(100%-28px)]">
          <div className="w-[100px] bg-[#1e1f28] border-r border-[#2e2f3a] p-2">
            <div className="h-5 rounded bg-[#2a2b35] flex items-center px-1.5 mb-2"><span className="text-[7px] text-gray-500">🔍 Search...</span></div>
            {["김서연", "James M.", "박수현", "Support"].map((n, i) => (
              <div key={n} className={`flex items-center gap-1.5 p-1 rounded mb-0.5 ${i === 0 ? "bg-[#2a2b35]" : ""}`}>
                <div className="w-4 h-4 rounded-full flex items-center justify-center text-[6px] font-bold text-white" style={{ backgroundColor: i === 0 ? p : "#3a3b45" }}>{n[0]}</div>
                <div>
                  <p className="text-[7px] text-gray-300 leading-none">{n}</p>
                  <p className="text-[6px] text-gray-600 leading-none">typing...</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex-1 flex flex-col p-2">
            <div className="flex-1 space-y-1.5 overflow-hidden">
              <div className="flex gap-1.5"><div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: `${p}40` }} /><div className="bg-[#2a2b35] rounded-xl rounded-tl-sm px-2 py-1 max-w-[65%]"><p className="text-[8px] text-gray-300">안녕하세요, LMS 사용법이 궁금합니다.</p></div></div>
              <div className="flex gap-1.5 justify-end"><div className="rounded-xl rounded-tr-sm px-2 py-1 max-w-[65%]" style={{ backgroundColor: `${p}25` }}><p className="text-[8px] text-gray-200">안녕하세요! 어떤 기능이 궁금하신가요?</p></div></div>
              <div className="flex gap-1.5"><div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: `${p}40` }} /><div className="bg-[#2a2b35] rounded-xl rounded-tl-sm px-2 py-1 max-w-[65%]"><p className="text-[8px] text-gray-300">커리큘럼 설정하는 방법을 알려주세요.</p></div></div>
              <div className="flex gap-1.5 justify-end"><div className="rounded-xl rounded-tr-sm px-2 py-1 max-w-[70%]" style={{ backgroundColor: `${p}25` }}><p className="text-[8px] text-gray-200">설정 → 커리큘럼 관리에서 드래그 앤 드롭으로 순서를 변경할 수 있습니다. 📋</p></div></div>
            </div>
            <div className="h-6 rounded-lg bg-[#22232d] border border-[#2e2f3a] mt-1 flex items-center px-2">
              <span className="text-[8px] text-gray-500 flex-1">메시지를 입력하세요...</span>
              <div className="w-4 h-4 rounded flex items-center justify-center" style={{ backgroundColor: p }}><span className="text-[8px] text-white">↑</span></div>
            </div>
          </div>
        </div>
      </div>
    ),

    code: (
      <div className={frame}>
        {windowBar}
        <div className="flex h-[calc(100%-28px)]">
          <div className="w-8 bg-[#1e1f28] border-r border-[#2e2f3a] py-1 text-center">
            {[1,2,3,4,5,6,7,8,9,10,11,12].map((n) => (
              <div key={n} className="text-[7px] text-gray-600 leading-[14px]">{n}</div>
            ))}
          </div>
          <div className="flex-1 p-1.5 font-mono text-[8px] leading-[14px] overflow-hidden">
            <div><span className="text-purple-400">import</span> <span className="text-yellow-300">{"{"}</span> <span className="text-red-300">useState</span> <span className="text-yellow-300">{"}"}</span> <span className="text-purple-400">from</span> <span className="text-green-400">&apos;react&apos;</span><span className="text-gray-500">;</span></div>
            <div><span className="text-purple-400">import</span> <span className="text-yellow-300">{"{"}</span> <span className="text-red-300">useTheme</span> <span className="text-yellow-300">{"}"}</span> <span className="text-purple-400">from</span> <span className="text-green-400">&apos;@/contexts&apos;</span><span className="text-gray-500">;</span></div>
            <div className="text-gray-600"> </div>
            <div><span className="text-purple-400">export default function</span> <span className="text-yellow-200">Dashboard</span><span className="text-gray-400">()</span> <span className="text-yellow-300">{"{"}</span></div>
            <div><span className="text-gray-600">  </span><span className="text-purple-400">const</span> <span className="text-gray-400">[</span><span className="text-red-300">data</span><span className="text-gray-400">,</span> <span className="text-red-300">setData</span><span className="text-gray-400">]</span> <span className="text-gray-400">=</span> <span className="text-yellow-200">useState</span><span className="text-gray-400">(</span><span className="text-orange-300">null</span><span className="text-gray-400">);</span></div>
            <div><span className="text-gray-600">  </span><span className="text-purple-400">const</span> <span className="text-yellow-300">{"{"}</span> <span className="text-red-300">colors</span> <span className="text-yellow-300">{"}"}</span> <span className="text-gray-400">=</span> <span className="text-yellow-200">useTheme</span><span className="text-gray-400">();</span></div>
            <div className="text-gray-600"> </div>
            <div className="bg-green-900/20 -mx-1.5 px-1.5 border-l-2 border-green-400"><span className="text-gray-600">  </span><span className="text-purple-400">return</span> <span className="text-gray-400">(</span></div>
            <div className="bg-green-900/20 -mx-1.5 px-1.5 border-l-2 border-green-400"><span className="text-gray-600">    </span><span className="text-gray-400">&lt;</span><span className="text-red-300">div</span> <span className="text-yellow-200">className</span><span className="text-gray-400">=</span><span className="text-green-400">&quot;grid&quot;</span><span className="text-gray-400">&gt;</span></div>
            <div><span className="text-gray-600">      </span><span className="text-gray-400">&lt;</span><span style={{ color: p }}>Chart</span> <span className="text-yellow-200">data</span><span className="text-gray-400">=</span><span className="text-yellow-300">{"{"}</span><span className="text-red-300">data</span><span className="text-yellow-300">{"}"}</span> <span className="text-gray-400">/&gt;</span></div>
            <div><span className="text-gray-600">    </span><span className="text-gray-400">&lt;/</span><span className="text-red-300">div</span><span className="text-gray-400">&gt;</span></div>
            <div><span className="text-gray-600">  </span><span className="text-gray-400">);</span></div>
          </div>
        </div>
      </div>
    ),

    globe: (
      <div className={`${frame} flex items-center justify-center`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a2744_0%,#0f1118_70%)]" />
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <circle cx="60" cy="60" r="48" fill="none" stroke={`${p}20`} strokeWidth="0.5" />
            <ellipse cx="60" cy="60" rx="48" ry="18" fill="none" stroke={`${p}15`} strokeWidth="0.4" transform="rotate(-20 60 60)" />
            <ellipse cx="60" cy="60" rx="18" ry="48" fill="none" stroke={`${p}15`} strokeWidth="0.4" />
            <ellipse cx="60" cy="60" rx="35" ry="48" fill="none" stroke={`${p}10`} strokeWidth="0.3" />
            {[
              [30, 35, "Seoul"], [75, 32, "Tokyo"], [45, 65, "Singapore"],
              [20, 50, "Mumbai"], [90, 55, "Sydney"], [68, 45, "Shanghai"],
              [55, 25, "Beijing"],
            ].map(([x, y, label], i) => (
              <g key={i}>
                <circle cx={Number(x)} cy={Number(y)} r="2.5" fill={p} opacity="0.8">
                  <animate attributeName="r" values="2.5;3.5;2.5" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                </circle>
                <circle cx={Number(x)} cy={Number(y)} r="5" fill={p} opacity="0.15">
                  <animate attributeName="r" values="5;8;5" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                </circle>
                <text x={Number(x)} y={Number(y) - 6} fill="white" fontSize="4" textAnchor="middle" opacity="0.5">{String(label)}</text>
              </g>
            ))}
            {[
              [30, 35, 75, 32], [75, 32, 68, 45], [45, 65, 90, 55],
              [20, 50, 45, 65], [55, 25, 30, 35],
            ].map(([x1, y1, x2, y2], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={p} strokeWidth="0.4" opacity="0.3" strokeDasharray="2,2">
                <animate attributeName="stroke-dashoffset" values="0;4" dur="1.5s" repeatCount="indefinite" />
              </line>
            ))}
          </svg>
        </div>
        <div className="absolute bottom-2 left-3 text-[7px] text-gray-500">42 Edge Locations • 99.99% Uptime</div>
      </div>
    ),

    video: (
      <div className={frame}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1928] to-[#1a1025]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2 border-2" style={{ borderColor: `${p}80`, backgroundColor: `${p}20` }}>
              <div className="w-0 h-0 ml-1 border-l-[12px] border-t-[7px] border-b-[7px] border-l-white border-t-transparent border-b-transparent" />
            </div>
            <p className="text-[9px] text-gray-400">Live Lecture • 1080p</p>
            <p className="text-[8px] text-gray-600">245 participants</p>
          </div>
        </div>
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-600 px-1.5 py-0.5 rounded">
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-[7px] text-white font-bold">LIVE</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm flex items-center justify-center" style={{ backgroundColor: p }}><span className="text-[6px] text-white">▐▐</span></div>
            <div className="flex-1 h-1 rounded bg-white/20"><div className="h-full rounded" style={{ width: "45%", backgroundColor: p }} /></div>
            <span className="text-[7px] text-gray-400">01:23:45</span>
            <span className="text-[7px] text-gray-400">🔊</span>
            <span className="text-[7px] text-gray-400">⛶</span>
          </div>
        </div>
      </div>
    ),

    timeline: (
      <div className={frame}>
        {windowBar}
        <div className="p-3 h-[calc(100%-28px)] flex flex-col">
          <p className="text-[10px] font-semibold text-gray-200 mb-3">Learning Path</p>
          <div className="flex-1 flex items-center">
            <div className="w-full relative">
              <div className="absolute top-3 left-4 right-4 h-0.5 bg-[#2e2f3a]" />
              <div className="absolute top-3 left-4 h-0.5" style={{ width: "60%", backgroundColor: p }} />
              <div className="flex justify-between relative">
                {[
                  { label: "Basics", status: "done", sub: "4/4 완료" },
                  { label: "Intermediate", status: "done", sub: "6/6 완료" },
                  { label: "Advanced", status: "current", sub: "2/5 진행 중" },
                  { label: "Expert", status: "locked", sub: "잠김" },
                  { label: "Certificate", status: "locked", sub: "잠김" },
                ].map((step, i) => (
                  <div key={step.label} className="flex flex-col items-center w-16">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[7px] font-bold ${
                      step.status === "done" ? "text-white" : step.status === "current" ? "text-white border-2" : "text-gray-600 bg-[#2a2b35]"
                    }`} style={
                      step.status === "done" ? { backgroundColor: p } : step.status === "current" ? { borderColor: p, backgroundColor: `${p}30` } : undefined
                    }>
                      {step.status === "done" ? "✓" : i + 1}
                    </div>
                    <p className="text-[7px] text-gray-300 mt-1.5 text-center">{step.label}</p>
                    <p className="text-[6px] text-gray-600 text-center">{step.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    safety: (
      <div className={frame}>
        {windowBar}
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-semibold text-gray-200">Safety Monitor</p>
            <div className="flex items-center gap-1 bg-red-900/30 px-1.5 py-0.5 rounded border border-red-800/30">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[7px] text-red-400">1 Alert</span>
            </div>
          </div>
          <div className="flex gap-2 mb-2">
            <div className="flex-1 bg-emerald-900/20 rounded p-1.5 border border-emerald-800/20">
              <p className="text-[7px] text-emerald-400">Zone A - Safe</p>
              <p className="text-[10px] font-bold text-emerald-300">98.2%</p>
            </div>
            <div className="flex-1 bg-red-900/20 rounded p-1.5 border border-red-800/20">
              <p className="text-[7px] text-red-400">Zone B - Warning</p>
              <p className="text-[10px] font-bold text-red-300">73.5%</p>
            </div>
            <div className="flex-1 bg-emerald-900/20 rounded p-1.5 border border-emerald-800/20">
              <p className="text-[7px] text-emerald-400">Zone C - Safe</p>
              <p className="text-[10px] font-bold text-emerald-300">95.7%</p>
            </div>
          </div>
          <div className="bg-[#22232d] rounded-lg p-2 border border-[#2e2f3a] h-[68px]">
            <p className="text-[7px] text-gray-500 mb-1">Recent Events</p>
            {[
              { time: "14:23", msg: "Zone B: 온도 이상 감지", level: "warn" },
              { time: "14:18", msg: "Zone A: 정상 가동 확인", level: "ok" },
              { time: "14:10", msg: "전체 센서 점검 완료", level: "ok" },
            ].map((e) => (
              <div key={e.time} className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[6px] text-gray-600 w-6">{e.time}</span>
                <div className={`w-1.5 h-1.5 rounded-full ${e.level === "warn" ? "bg-red-500" : "bg-emerald-500"}`} />
                <span className="text-[7px] text-gray-400">{e.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),

    bim: (
      <div className={`${frame} flex items-center justify-center`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#1a2030_0%,#0f1118_70%)]" />
        <svg viewBox="0 0 160 120" className="w-52 h-40 relative z-10">
          <defs>
            <linearGradient id="bimWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={p} stopOpacity="0.2" /><stop offset="100%" stopColor={p} stopOpacity="0.05" /></linearGradient>
            <linearGradient id="bimRoof" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={p} stopOpacity="0.15" /><stop offset="100%" stopColor={p} stopOpacity="0.3" /></linearGradient>
          </defs>
          <rect x="35" y="45" width="90" height="55" fill="url(#bimWall)" stroke={`${p}40`} strokeWidth="0.5" />
          <polygon points="35,45 80,22 125,45" fill="url(#bimRoof)" stroke={`${p}50`} strokeWidth="0.5" />
          {[[45, 58, 14, 16], [65, 58, 14, 16], [85, 58, 14, 16], [105, 58, 14, 16]].map(([x, y, w, h], i) => (
            <rect key={i} x={x} y={y} width={w} height={h} fill={`${p}15`} stroke={`${p}30`} strokeWidth="0.3" />
          ))}
          <rect x="72" y="78" width="16" height="22" fill={`${p}20`} stroke={`${p}40`} strokeWidth="0.4" />
          {[[42, 52, "#ef4444"], [88, 62, p], [112, 72, "#22c55e"]].map(([x, y, c], i) => (
            <g key={i}>
              <circle cx={Number(x)} cy={Number(y)} r="3" fill={String(c)} opacity="0.6"><animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" /></circle>
              <text x={Number(x)} y={Number(y) - 6} fill="white" fontSize="4" textAnchor="middle" opacity="0.5">{i === 0 ? "Sensor" : i === 1 ? "IoT" : "OK"}</text>
            </g>
          ))}
          <text x="80" y="16" fill="white" fontSize="5" textAnchor="middle" opacity="0.4">BIM 3D Model</text>
        </svg>
        <div className="absolute bottom-2 right-3 text-[7px] text-gray-500">Real-time IoT Data Overlay</div>
      </div>
    ),

    search: (
      <div className={frame}>
        {windowBar}
        <div className="p-3">
          <div className="h-6 rounded-lg bg-[#22232d] border border-[#2e2f3a] mb-2 flex items-center px-2 gap-1.5">
            <span className="text-[8px] text-gray-500">🔍</span>
            <span className="text-[8px] text-gray-300">AI 교수설계</span>
            <div className="ml-auto text-[7px] px-1.5 py-0.5 rounded" style={{ backgroundColor: `${p}20`, color: p }}>Search</div>
          </div>
          <p className="text-[7px] text-gray-500 mb-1.5">4 results found</p>
          {[
            { title: "AI 기반 교수설계 개론", time: "0:12:34", tag: "Module 1" },
            { title: "CREATOR 프레임워크 적용", time: "0:23:45", tag: "Module 2" },
            { title: "멀티모달 콘텐츠 생성", time: "0:35:12", tag: "Module 3" },
            { title: "학습 성과 분석 방법", time: "1:02:30", tag: "Module 5" },
          ].map((item, i) => (
            <div key={item.title} className={`flex items-center gap-2 p-1.5 rounded-lg mb-1 ${i === 0 ? "" : ""}`} style={i === 0 ? { backgroundColor: `${p}10` } : undefined}>
              <div className="w-14 h-9 rounded bg-gradient-to-br from-[#2a2b35] to-[#1e1f28] flex items-center justify-center border border-[#2e2f3a]">
                <span className="text-[6px] text-gray-500">▶ {item.time}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[8px] text-gray-200 truncate">{item.title}</p>
                <p className="text-[6px] text-gray-600">{item.tag}</p>
              </div>
              <span className="text-[7px] px-1 py-0.5 rounded" style={{ backgroundColor: `${p}15`, color: p }}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    ),

    settings: (
      <div className={frame}>
        {windowBar}
        <div className="flex h-[calc(100%-28px)]">
          <div className="w-[90px] bg-[#1e1f28] border-r border-[#2e2f3a] p-2">
            {["General", "Security", "API Keys", "Team", "Billing"].map((s, i) => (
              <div key={s} className={`h-5 rounded mb-0.5 flex items-center px-2 text-[8px] ${i === 1 ? "text-white" : "text-gray-500"}`} style={i === 1 ? { backgroundColor: `${p}20`, color: p } : undefined}>
                {s}
              </div>
            ))}
          </div>
          <div className="flex-1 p-3">
            <p className="text-[10px] font-semibold text-gray-200 mb-3">Security Settings</p>
            {[
              { label: "Two-Factor Auth", desc: "Enable 2FA for all users", on: true },
              { label: "SSO Integration", desc: "SAML 2.0 / OAuth", on: true },
              { label: "IP Whitelist", desc: "Restrict access by IP", on: false },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between mb-2 pb-2 border-b border-[#2e2f3a]">
                <div>
                  <p className="text-[8px] text-gray-300">{s.label}</p>
                  <p className="text-[7px] text-gray-600">{s.desc}</p>
                </div>
                <div className={`w-7 h-4 rounded-full relative ${s.on ? "" : "bg-[#2a2b35]"}`} style={s.on ? { backgroundColor: p } : undefined}>
                  <div className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-all ${s.on ? "left-3.5" : "left-0.5"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    /* ── AI 자막 패널 ── */
    subtitle: (
      <div className={frame}>
        {windowBar}
        <div className="flex h-[calc(100%-28px)]">
          <div className="flex-[2] relative bg-gradient-to-br from-[#0f1928] to-[#1a1025]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto border" style={{ borderColor: `${p}60`, backgroundColor: `${p}15` }}>
                  <div className="w-0 h-0 ml-0.5 border-l-[8px] border-t-[5px] border-b-[5px] border-l-white border-t-transparent border-b-transparent" />
                </div>
                <p className="text-[8px] text-gray-500 mt-1">강의 영상 재생 중</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-1.5 px-3 text-center">
              <p className="text-[9px] text-white leading-tight">인공지능 기반 교수설계의 핵심 원리를 살펴보겠습니다.</p>
              <p className="text-[8px] text-blue-300 leading-tight mt-0.5">Let&apos;s explore the core principles of AI-based instructional design.</p>
              <p className="text-[8px] text-yellow-300 leading-tight">AIベースの教授設計の核心原理を見てみましょう。</p>
            </div>
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-600 px-1.5 py-0.5 rounded">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-[6px] text-white font-bold">LIVE</span>
            </div>
          </div>
          <div className="w-[100px] bg-[#1e1f28] border-l border-[#2e2f3a] p-2 overflow-hidden">
            <p className="text-[7px] font-semibold text-gray-400 uppercase mb-1">Languages</p>
            {["🇰🇷 한국어", "🇺🇸 English", "🇯🇵 日本語", "🇨🇳 中文", "🇪🇸 Español"].map((lang, i) => (
              <div key={lang} className={`text-[7px] py-0.5 px-1 rounded mb-0.5 ${i === 0 ? "text-white" : "text-gray-500"}`} style={i === 0 ? { backgroundColor: `${p}20`, color: p } : undefined}>
                {lang}
              </div>
            ))}
            <div className="mt-2 border-t border-[#2e2f3a] pt-1">
              <p className="text-[7px] text-gray-500">Accuracy</p>
              <p className="text-[10px] font-bold" style={{ color: p }}>97.8%</p>
            </div>
          </div>
        </div>
      </div>
    ),

    /* ── 코드 리뷰 패널 ── */
    codereview: (
      <div className={frame}>
        {windowBar}
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-semibold text-gray-200">PR #142</span>
              <span className="text-[7px] px-1.5 py-0.5 rounded bg-emerald-900/30 text-emerald-400 border border-emerald-800/30">+23 -8</span>
            </div>
            <span className="text-[7px] px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: p }}>Approve</span>
          </div>
          <div className="bg-[#22232d] rounded-lg border border-[#2e2f3a] overflow-hidden mb-2">
            <div className="px-2 py-1 bg-[#1a1b23] border-b border-[#2e2f3a] flex items-center gap-1">
              <span className="text-[7px] text-gray-500">src/components/Dashboard.tsx</span>
            </div>
            <div className="p-1.5 font-mono text-[7px] leading-[12px]">
              <div className="flex"><span className="w-4 text-gray-600 text-right mr-1">12</span><span className="text-gray-500"> const data = await fetch(url);</span></div>
              <div className="flex bg-red-900/20"><span className="w-4 text-red-500 text-right mr-1">13</span><span className="text-red-400">- if (data) return data.json();</span></div>
              <div className="flex bg-green-900/20"><span className="w-4 text-green-500 text-right mr-1">13</span><span className="text-green-400">+ if (data.ok) return data.json();</span></div>
              <div className="flex bg-green-900/20"><span className="w-4 text-green-500 text-right mr-1">14</span><span className="text-green-400">+ throw new Error(data.statusText);</span></div>
              <div className="flex"><span className="w-4 text-gray-600 text-right mr-1">15</span><span className="text-gray-500"> return null;</span></div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 bg-[#22232d] rounded p-1.5 border border-[#2e2f3a]">
              <p className="text-[7px] text-gray-500">AI Review</p>
              <p className="text-[7px] text-amber-400">⚠ Error handling 개선 필요</p>
              <p className="text-[6px] text-gray-500 mt-0.5">data.ok 체크 추가됨 — 승인 권장</p>
            </div>
            <div className="w-16 bg-[#22232d] rounded p-1.5 border border-[#2e2f3a] text-center">
              <p className="text-[7px] text-gray-500">Score</p>
              <p className="text-[12px] font-bold" style={{ color: p }}>A+</p>
            </div>
          </div>
        </div>
      </div>
    ),

    /* ── 관리자 모니터링 콘솔 ── */
    monitor: (
      <div className={frame}>
        {windowBar}
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-semibold text-gray-200">Live Monitor</p>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[7px] text-emerald-400">24 Active Sessions</span>
            </div>
          </div>
          <div className="flex gap-2 mb-2">
            {[
              { label: "응답 시간", val: "0.8s", status: "ok" },
              { label: "해결률", val: "94.2%", status: "ok" },
              { label: "에스컬레이션", val: "3건", status: "warn" },
            ].map((s) => (
              <div key={s.label} className={`flex-1 rounded p-1.5 border ${s.status === "warn" ? "bg-amber-900/15 border-amber-800/20" : "bg-[#22232d] border-[#2e2f3a]"}`}>
                <p className="text-[7px] text-gray-500">{s.label}</p>
                <p className={`text-[10px] font-bold ${s.status === "warn" ? "text-amber-400" : "text-white"}`}>{s.val}</p>
              </div>
            ))}
          </div>
          <div className="bg-[#22232d] rounded-lg border border-[#2e2f3a] p-2 h-[68px] overflow-hidden">
            <p className="text-[7px] text-gray-500 mb-1">Active Conversations</p>
            {[
              { user: "김지수", topic: "결제 문의", agent: "AI Bot", time: "2m" },
              { user: "James P.", topic: "API Error", agent: "→ 상담원", time: "5m" },
              { user: "田中太郎", topic: "機能質問", agent: "AI Bot", time: "1m" },
            ].map((c) => (
              <div key={c.user} className="flex items-center gap-2 mb-0.5">
                <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[5px] font-bold text-white" style={{ backgroundColor: `${p}60` }}>{c.user[0]}</div>
                <span className="text-[7px] text-gray-300 w-12 truncate">{c.user}</span>
                <span className="text-[7px] text-gray-500 flex-1 truncate">{c.topic}</span>
                <span className={`text-[6px] px-1 rounded ${c.agent.includes("→") ? "text-amber-400 bg-amber-900/20" : "text-emerald-400 bg-emerald-900/20"}`}>{c.agent}</span>
                <span className="text-[6px] text-gray-600">{c.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    /* ── LearnForm 전용 mockup ── */

    "lf-editor": (
      <div className={frame}>
        {windowBar}
        <div className="flex h-[calc(100%-28px)]">
          {/* CREATOR 사이드바 */}
          <div className="w-[46px] bg-[#1e1f28] border-r border-[#2e2f3a] py-2 flex flex-col items-center gap-[5px]">
            {["C", "R", "E", "A", "T", "O", "R"].map((step, i) => (
              <div
                key={i}
                className="w-[26px] h-[18px] rounded flex items-center justify-center text-[7px] font-bold"
                style={i === 0
                  ? { backgroundColor: p, color: "#fff" }
                  : i < 3
                    ? { backgroundColor: `${p}30`, color: p }
                    : { backgroundColor: "#2a2b35", color: "#6b7280" }}
              >
                {step}
              </div>
            ))}
          </div>
          {/* 콘텐츠 영역 */}
          <div className="flex-1 p-3 overflow-hidden">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: p }}>1단원</span>
              <span className="text-[9px] font-semibold text-gray-200">AI 기반 교수설계 입문</span>
            </div>
            {/* 블록들 */}
            <div className="space-y-1.5">
              <div className="rounded bg-[#22232d] border border-[#2e2f3a] p-1.5">
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="text-[6px] px-1 rounded font-semibold text-white" style={{ backgroundColor: "#8b5cf6" }}>텍스트</span>
                  <span className="text-[6px] text-gray-500">Claude 생성</span>
                </div>
                <p className="text-[7px] text-gray-400 leading-relaxed">교수설계란 학습 목표를 달성하기 위해 최적의 교육 경험을 체계적으로 설계하는 과정입니다...</p>
              </div>
              <div className="rounded bg-[#22232d] border border-[#2e2f3a] p-1.5">
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="text-[6px] px-1 rounded font-semibold text-white" style={{ backgroundColor: "#3b82f6" }}>영상</span>
                  <span className="text-[6px] text-gray-500">Veo 3.1</span>
                </div>
                <div className="w-full h-[28px] rounded bg-gradient-to-r from-blue-900/40 to-indigo-900/30 flex items-center justify-center">
                  <span className="text-[7px] text-blue-300">▶ 인트로 영상 (2:30)</span>
                </div>
              </div>
              <div className="rounded bg-[#22232d] border border-[#2e2f3a] p-1.5">
                <div className="flex items-center gap-1">
                  <span className="text-[6px] px-1 rounded font-semibold text-white" style={{ backgroundColor: "#f59e0b" }}>퀴즈</span>
                  <span className="text-[6px] text-gray-500">Gemini 생성</span>
                </div>
                <p className="text-[7px] text-gray-400 mt-0.5">Q. CREATOR 모델의 첫 번째 단계는?</p>
              </div>
            </div>
          </div>
          {/* AI 모델 패널 */}
          <div className="w-[110px] bg-[#1e1f28] border-l border-[#2e2f3a] p-2 overflow-hidden">
            <p className="text-[7px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">AI 모델</p>
            {[
              { name: "Gemini 2.5", color: "#3b82f6", task: "분석/퀴즈" },
              { name: "Claude", color: "#8b5cf6", task: "텍스트/설계" },
              { name: "Veo 3.1", color: "#f59e0b", task: "영상 생성" },
            ].map((m) => (
              <div key={m.name} className="flex items-center gap-1.5 mb-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: m.color }} />
                <div>
                  <p className="text-[7px] font-semibold text-gray-300">{m.name}</p>
                  <p className="text-[6px] text-gray-500">{m.task}</p>
                </div>
              </div>
            ))}
            <hr className="border-[#2e2f3a] my-1.5" />
            <p className="text-[7px] font-bold text-gray-400 uppercase tracking-wider mb-1">출력 형식</p>
            <div className="flex flex-wrap gap-1">
              {["SCORM", "xAPI", "PDF"].map((f) => (
                <span key={f} className="text-[6px] px-1 py-0.5 rounded bg-[#2a2b35] text-gray-400">{f}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),

    "lf-dashboard": (
      <div className={frame}>
        {windowBar}
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-semibold text-gray-200">학습 현황</p>
            <span className="text-[7px] px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: p }}>실시간</span>
          </div>
          {/* 상단 지표 */}
          <div className="flex gap-2 mb-2">
            {[
              { label: "수강생", val: "2,847명", sub: "12개 과정" },
              { label: "평균 진도율", val: "76.4%", sub: "+5.2% 전월 대비" },
              { label: "수료율", val: "68.9%", sub: "목표 70%" },
            ].map((s) => (
              <div key={s.label} className="flex-1 bg-[#22232d] rounded-lg p-2 border border-[#2e2f3a]">
                <p className="text-[6px] text-gray-500">{s.label}</p>
                <p className="text-[12px] font-bold text-white">{s.val}</p>
                <span className="text-[6px] text-gray-500">{s.sub}</span>
              </div>
            ))}
          </div>
          {/* FKDS 단계별 진행 */}
          <div className="bg-[#22232d] rounded-lg p-2 border border-[#2e2f3a] mb-2">
            <p className="text-[7px] text-gray-400 font-semibold mb-1.5">FKDS 단계별 학습 분포</p>
            <div className="flex gap-1.5">
              {[
                { step: "F", label: "Feeling", pct: 92, color: "#f472b6" },
                { step: "K", label: "Knowing", pct: 78, color: "#60a5fa" },
                { step: "D", label: "Doing", pct: 54, color: "#34d399" },
                { step: "S", label: "Sharing", pct: 31, color: "#fbbf24" },
              ].map((s) => (
                <div key={s.step} className="flex-1">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-[7px] font-bold" style={{ color: s.color }}>{s.step}</span>
                    <span className="text-[5px] text-gray-500">{s.label}</span>
                  </div>
                  <div className="h-[28px] w-full bg-[#1a1b23] rounded relative overflow-hidden">
                    <div className="absolute bottom-0 w-full rounded transition-all" style={{ height: `${s.pct}%`, backgroundColor: `${s.color}50` }} />
                  </div>
                  <p className="text-[7px] font-semibold text-center mt-0.5 text-gray-300">{s.pct}%</p>
                </div>
              ))}
            </div>
          </div>
          {/* 최근 활동 */}
          <div className="bg-[#22232d] rounded-lg p-2 border border-[#2e2f3a]">
            <p className="text-[7px] text-gray-400 font-semibold mb-1">최근 학습 활동</p>
            {[
              { name: "김OO", action: "1단원 수료", time: "2분 전" },
              { name: "이OO", action: "퀴즈 92점", time: "5분 전" },
              { name: "박OO", action: "영상 시청 완료", time: "8분 전" },
            ].map((a) => (
              <div key={a.name} className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full flex items-center justify-center text-[5px] font-bold text-white" style={{ backgroundColor: `${p}60` }}>{a.name[0]}</div>
                  <span className="text-[7px] text-gray-300">{a.name}</span>
                  <span className="text-[7px] text-gray-500">{a.action}</span>
                </div>
                <span className="text-[6px] text-gray-600">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),

    "lf-ai-results": (
      <div className={frame}>
        {windowBar}
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-semibold text-gray-200">AI 콘텐츠 생성 결과</p>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[7px] text-emerald-400">생성 완료</span>
            </div>
          </div>
          {/* 생성된 콘텐츠 미리보기 */}
          <div className="space-y-1.5 mb-2">
            <div className="bg-[#22232d] rounded-lg p-2 border border-[#2e2f3a]">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
                  <span className="text-[7px] font-semibold text-gray-300">학습 목표 (Claude)</span>
                </div>
                <span className="text-[6px] px-1 rounded bg-emerald-900/30 text-emerald-400">승인됨</span>
              </div>
              <p className="text-[7px] text-gray-400 leading-relaxed">1. CREATOR 프레임워크의 7단계를 설명할 수 있다</p>
              <p className="text-[7px] text-gray-400 leading-relaxed">2. AI 교수설계 원리를 실제 사례에 적용할 수 있다</p>
            </div>
            <div className="bg-[#22232d] rounded-lg p-2 border border-[#2e2f3a]">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                  <span className="text-[7px] font-semibold text-gray-300">평가 문항 (Gemini)</span>
                </div>
                <span className="text-[6px] px-1 rounded bg-amber-900/30 text-amber-400">검토 중</span>
              </div>
              <p className="text-[7px] text-gray-400">Q. 다음 중 CREATOR의 E단계에 해당하는 것은?</p>
              <div className="flex gap-1 mt-1">
                {["A. Concept", "B. Experience", "C. Route", "D. Artifact"].map((opt, i) => (
                  <span key={opt} className={`text-[6px] px-1 py-0.5 rounded ${i === 1 ? "bg-emerald-900/20 text-emerald-400 border border-emerald-800/30" : "bg-[#2a2b35] text-gray-500"}`}>{opt}</span>
                ))}
              </div>
            </div>
            <div className="bg-[#22232d] rounded-lg p-2 border border-[#2e2f3a]">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                  <span className="text-[7px] font-semibold text-gray-300">영상 스크립트 (Veo)</span>
                </div>
                <span className="text-[6px] px-1 rounded bg-blue-900/30 text-blue-400">생성 중</span>
              </div>
              <div className="w-full h-2 bg-[#1a1b23] rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: "72%", backgroundColor: p }} />
              </div>
              <p className="text-[6px] text-gray-500 mt-0.5">72% 완료 · 예상 잔여 시간 28초</p>
            </div>
          </div>
          {/* 품질 점수 */}
          <div className="flex gap-2">
            {[
              { label: "콘텐츠 품질", val: "94점" },
              { label: "학습 적합도", val: "91점" },
              { label: "NCS 부합도", val: "88점" },
            ].map((m) => (
              <div key={m.label} className="flex-1 bg-[#22232d] rounded p-1.5 border border-[#2e2f3a] text-center">
                <p className="text-[6px] text-gray-500">{m.label}</p>
                <p className="text-[10px] font-bold" style={{ color: p }}>{m.val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  };

  return renders[type];
}
