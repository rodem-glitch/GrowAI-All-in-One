import type { VideoPlayerProps } from "@/components/ui/VideoPlayer";

type SceneSet = VideoPlayerProps["scenes"];

/* ── 포탈 히어로 씬 ── */
export const PORTAL_SCENES: SceneSet = [
  {
    bg: "radial-gradient(ellipse at 30% 40%, #0a2463 0%, #1e3a5f 30%, #0d1b2a 70%, #000814 100%)",
    orbs: ["from-blue-600/40 to-cyan-500/20", "from-indigo-600/30 to-violet-500/15"],
    text: "The Future of AI,",
    subtext: "All in One Platform",
  },
  {
    bg: "radial-gradient(ellipse at 70% 30%, #1a0a3e 0%, #2d1b69 30%, #0f0326 70%, #030014 100%)",
    orbs: ["from-violet-600/40 to-fuchsia-500/20", "from-purple-600/30 to-pink-500/15"],
    text: "LMS · Manufacturing",
    subtext: "Video · Customer Care",
  },
  {
    bg: "radial-gradient(ellipse at 50% 60%, #0a3d2e 0%, #1a5c44 30%, #0b2920 70%, #001a10 100%)",
    orbs: ["from-emerald-600/40 to-teal-500/20", "from-green-600/30 to-cyan-500/15"],
    text: "9개 AI 솔루션을",
    subtext: "하나의 플랫폼에서",
  },
  {
    bg: "radial-gradient(ellipse at 40% 50%, #3d0a0a 0%, #5c1a1a 30%, #290b0b 70%, #1a0000 100%)",
    orbs: ["from-orange-600/40 to-amber-500/20", "from-red-600/30 to-rose-500/15"],
    text: "One Platform,",
    subtext: "Infinite Possibilities.",
  },
];

/* ── LearnForm ── */
export const LEARNFORM_SCENES: SceneSet = [
  {
    bg: "radial-gradient(ellipse at 30% 40%, #0a1e4a 0%, #132e66 30%, #081630 70%, #000a1a 100%)",
    orbs: ["from-blue-500/40 to-cyan-400/20", "from-sky-500/30 to-blue-400/15"],
    text: "AI Content Creation",
    subtext: "in 3 Minutes",
  },
  {
    bg: "radial-gradient(ellipse at 60% 30%, #1a0a3e 0%, #2a1560 30%, #0e0326 70%, #020010 100%)",
    orbs: ["from-violet-500/40 to-purple-400/20", "from-indigo-500/30 to-blue-400/15"],
    text: "CREATOR 7-Step",
    subtext: "Framework",
  },
  {
    bg: "radial-gradient(ellipse at 50% 60%, #0a3020 0%, #1a5040 30%, #0b2518 70%, #001208 100%)",
    orbs: ["from-emerald-500/40 to-teal-400/20", "from-green-500/30 to-lime-400/15"],
    text: "FKDS Learning",
    subtext: "Cycle",
  },
];

/* ── LMS ── */
export const LMS_SCENES: SceneSet = [
  {
    bg: "radial-gradient(ellipse at 40% 35%, #1a0a3e 0%, #2d1b69 30%, #0f0326 70%, #030014 100%)",
    orbs: ["from-violet-500/40 to-purple-400/20", "from-fuchsia-500/30 to-pink-400/15"],
    text: "Smart Learning",
    subtext: "Management",
  },
  {
    bg: "radial-gradient(ellipse at 60% 50%, #0a2040 0%, #143560 30%, #081828 70%, #000a14 100%)",
    orbs: ["from-blue-500/40 to-indigo-400/20", "from-sky-500/30 to-cyan-400/15"],
    text: "AI-Powered",
    subtext: "Curriculum Design",
  },
  {
    bg: "radial-gradient(ellipse at 50% 40%, #0a3530 0%, #1a5248 30%, #0b2822 70%, #001510 100%)",
    orbs: ["from-teal-500/40 to-emerald-400/20", "from-cyan-500/30 to-teal-400/15"],
    text: "Real-Time",
    subtext: "Progress Tracking",
  },
];

/* ── MAP ── */
export const MAP_SCENES: SceneSet = [
  {
    bg: "radial-gradient(ellipse at 40% 50%, #0a2e20 0%, #1a4e38 30%, #0b2218 70%, #001208 100%)",
    orbs: ["from-emerald-500/40 to-green-400/20", "from-teal-500/30 to-cyan-400/15"],
    text: "Smart Factory",
    subtext: "AI Quality Prediction",
  },
  {
    bg: "radial-gradient(ellipse at 60% 30%, #2a1500 0%, #4a2800 30%, #1a0e00 70%, #0a0500 100%)",
    orbs: ["from-orange-500/40 to-amber-400/20", "from-yellow-500/30 to-orange-400/15"],
    text: "Digital Twin",
    subtext: "Simulation",
  },
  {
    bg: "radial-gradient(ellipse at 50% 60%, #0a1a30 0%, #142e50 30%, #081420 70%, #000810 100%)",
    orbs: ["from-blue-500/40 to-cyan-400/20", "from-indigo-500/30 to-blue-400/15"],
    text: "Predictive",
    subtext: "Maintenance",
  },
];

/* ── VLS ── */
export const VLS_SCENES: SceneSet = [
  {
    bg: "radial-gradient(ellipse at 35% 45%, #2a1500 0%, #4a2800 30%, #1a0e00 70%, #0a0500 100%)",
    orbs: ["from-orange-500/40 to-amber-400/20", "from-red-500/30 to-orange-400/15"],
    text: "Live 4K",
    subtext: "Streaming",
  },
  {
    bg: "radial-gradient(ellipse at 65% 35%, #0a1e4a 0%, #132e66 30%, #081630 70%, #000a1a 100%)",
    orbs: ["from-blue-500/40 to-sky-400/20", "from-cyan-500/30 to-blue-400/15"],
    text: "AI Real-Time",
    subtext: "Subtitles",
  },
  {
    bg: "radial-gradient(ellipse at 50% 55%, #1a0a3e 0%, #2a1560 30%, #0e0326 70%, #020010 100%)",
    orbs: ["from-purple-500/40 to-violet-400/20", "from-fuchsia-500/30 to-pink-400/15"],
    text: "Interactive",
    subtext: "Breakout Rooms",
  },
];

/* ── VAS ── */
export const VAS_SCENES: SceneSet = [
  {
    bg: "radial-gradient(ellipse at 40% 40%, #3a0a20 0%, #5a1535 30%, #250818 70%, #10020a 100%)",
    orbs: ["from-pink-500/40 to-rose-400/20", "from-fuchsia-500/30 to-pink-400/15"],
    text: "Auto Summary",
    subtext: "in Seconds",
  },
  {
    bg: "radial-gradient(ellipse at 60% 50%, #0a2535 0%, #143e55 30%, #081a28 70%, #000c14 100%)",
    orbs: ["from-cyan-500/40 to-sky-400/20", "from-blue-500/30 to-cyan-400/15"],
    text: "Smart Chapter",
    subtext: "Detection",
  },
  {
    bg: "radial-gradient(ellipse at 50% 35%, #2a2000 0%, #4a3800 30%, #1a1200 70%, #0a0800 100%)",
    orbs: ["from-amber-500/40 to-yellow-400/20", "from-orange-500/30 to-amber-400/15"],
    text: "Keyword",
    subtext: "Intelligence",
  },
];

/* ── CCB ── */
export const CCB_SCENES: SceneSet = [
  {
    bg: "radial-gradient(ellipse at 45% 40%, #0a2535 0%, #143e55 30%, #081a28 70%, #000c14 100%)",
    orbs: ["from-cyan-500/40 to-sky-400/20", "from-teal-500/30 to-cyan-400/15"],
    text: "24/7 AI",
    subtext: "Customer Care",
  },
  {
    bg: "radial-gradient(ellipse at 55% 50%, #1a0a3e 0%, #2a1560 30%, #0e0326 70%, #020010 100%)",
    orbs: ["from-violet-500/40 to-purple-400/20", "from-indigo-500/30 to-violet-400/15"],
    text: "20+ Languages",
    subtext: "Instant Response",
  },
  {
    bg: "radial-gradient(ellipse at 50% 45%, #0a2e20 0%, #1a4838 30%, #0b2018 70%, #001008 100%)",
    orbs: ["from-emerald-500/40 to-teal-400/20", "from-green-500/30 to-emerald-400/15"],
    text: "Emotion AI",
    subtext: "Sentiment Analysis",
  },
];

/* ── CCS ── */
export const CCS_SCENES: SceneSet = [
  {
    bg: "radial-gradient(ellipse at 40% 45%, #0a1440 0%, #142060 30%, #080e28 70%, #000614 100%)",
    orbs: ["from-indigo-500/40 to-blue-400/20", "from-violet-500/30 to-indigo-400/15"],
    text: "AI Code",
    subtext: "Assistant",
  },
  {
    bg: "radial-gradient(ellipse at 60% 35%, #0a3020 0%, #1a4838 30%, #0b2018 70%, #001008 100%)",
    orbs: ["from-green-500/40 to-emerald-400/20", "from-teal-500/30 to-green-400/15"],
    text: "Auto Debug",
    subtext: "& Review",
  },
  {
    bg: "radial-gradient(ellipse at 50% 50%, #3a0a0a 0%, #5a1818 30%, #250808 70%, #100202 100%)",
    orbs: ["from-red-500/40 to-rose-400/20", "from-orange-500/30 to-red-400/15"],
    text: "35+ Slash",
    subtext: "Commands",
  },
];

/* ── CDN ── */
export const CDN_SCENES: SceneSet = [
  {
    bg: "radial-gradient(ellipse at 45% 50%, #0a3028 0%, #1a4e42 30%, #0b2420 70%, #001210 100%)",
    orbs: ["from-teal-500/40 to-green-400/20", "from-emerald-500/30 to-teal-400/15"],
    text: "Global Edge",
    subtext: "42 Countries",
  },
  {
    bg: "radial-gradient(ellipse at 55% 40%, #0a1e4a 0%, #132e66 30%, #081630 70%, #000a1a 100%)",
    orbs: ["from-blue-500/40 to-indigo-400/20", "from-sky-500/30 to-blue-400/15"],
    text: "Ultra Low",
    subtext: "Latency",
  },
  {
    bg: "radial-gradient(ellipse at 50% 55%, #3a0a0a 0%, #5a1818 30%, #250808 70%, #100202 100%)",
    orbs: ["from-red-500/40 to-orange-400/20", "from-amber-500/30 to-red-400/15"],
    text: "DRM Security",
    subtext: "& DDoS Shield",
  },
];

/* ── CMS ── */
export const CMS_SCENES: SceneSet = [
  {
    bg: "radial-gradient(ellipse at 40% 45%, #2a1a00 0%, #4a3000 30%, #1a1000 70%, #0a0600 100%)",
    orbs: ["from-amber-500/40 to-yellow-400/20", "from-orange-500/30 to-amber-400/15"],
    text: "Smart Construction",
    subtext: "IoT + AI",
  },
  {
    bg: "radial-gradient(ellipse at 60% 35%, #3a0a0a 0%, #5a1515 30%, #250808 70%, #100202 100%)",
    orbs: ["from-red-500/40 to-rose-400/20", "from-orange-500/30 to-red-400/15"],
    text: "Safety AI",
    subtext: "Accident Prevention",
  },
  {
    bg: "radial-gradient(ellipse at 50% 50%, #0a1e4a 0%, #132e66 30%, #081630 70%, #000a1a 100%)",
    orbs: ["from-blue-500/40 to-cyan-400/20", "from-indigo-500/30 to-blue-400/15"],
    text: "BIM Integration",
    subtext: "Digital Twin",
  },
];
