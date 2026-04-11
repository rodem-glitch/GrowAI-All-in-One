"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

/* ── 타입 ── */
interface PosterScene {
  bg: string;
  orbs: string[];
  text: string;
  subtext: string;
}

export interface VideoPlayerProps {
  videoSrc?: string;
  scenes: PosterScene[];
  sceneDuration?: number;
}

function formatTime(ms: number): string {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
}

/**
 * VideoPlayer
 *
 * Default: 자동 재생(loop), 중앙 버튼/하단 컨트롤 숨김
 * Hover:   하단 컨트롤 바 fade-in
 * Click:   일시정지 + 중앙 Play 표시 + 하단 Play 동기화
 * Resume:  중앙/하단 어디서든 클릭하면 재생 + 모두 숨김
 */
export default function VideoPlayer({
  videoSrc,
  scenes,
  sceneDuration = 4000,
}: VideoPlayerProps) {
  const { colors } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 실제 mp4 모드
  const [showVideo, setShowVideo] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  // 포스터 상태
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [currentScene, setCurrentScene] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  // 호버 상태
  const [hovered, setHovered] = useState(false);

  const startTimeRef = useRef(Date.now());
  const pausedAtRef = useRef(0);
  const totalDuration = scenes.length * sceneDuration;

  // 통합 재생 상태: 포스터든 비디오든 현재 재생 중인지
  const isPlaying = showVideo ? videoPlaying : !paused;

  /* ── 포스터 애니메이션 ── */
  useEffect(() => {
    if (showVideo || paused) return;
    let rafId: number;
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const looped = elapsed % totalDuration;
      const idx = Math.min(
        Math.floor(looped / sceneDuration),
        scenes.length - 1
      );
      const sp = (looped % sceneDuration) / sceneDuration;
      setCurrentScene(idx);
      setProgress((looped / totalDuration) * 100);
      setElapsedMs(looped);
      setTextVisible(sp > 0.05 && sp < 0.92);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [showVideo, paused, totalDuration, sceneDuration, scenes.length]);

  /* ── 통합 토글 (중앙 클릭 / 하단 버튼 / 영역 클릭 모두 동일) ── */
  const toggle = useCallback(() => {
    if (showVideo && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setVideoPlaying(false);
      }
      return;
    }
    // 포스터 모드
    if (paused) {
      startTimeRef.current = Date.now() - pausedAtRef.current;
      setPaused(false);
    } else {
      pausedAtRef.current = Date.now() - startTimeRef.current;
      setPaused(true);
    }
  }, [showVideo, paused]);

  /* ── 영역 클릭 (컨트롤 바 영역 제외) ── */
  const handleAreaClick = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-controls]")) return;
      toggle();
    },
    [toggle]
  );

  /* ── mp4 시도 (videoSrc 있을 때 첫 재생) ── */
  const tryVideo = useCallback(() => {
    if (!videoSrc) return;
    setShowVideo(true);
    setVideoPlaying(true);
    setTimeout(() => {
      videoRef.current?.play().catch(() => {
        setShowVideo(false);
        setVideoPlaying(false);
      });
    }, 100);
  }, [videoSrc]);

  // 마운트 시 mp4 자동 시도 (HEAD 요청으로 존재 여부 확인 후)
  useEffect(() => {
    if (!videoSrc) return;
    const controller = new AbortController();
    fetch(videoSrc, {
      method: "HEAD",
      signal: controller.signal,
    })
      .then((res) => { if (res.ok) tryVideo(); })
      .catch(() => { /* 파일 없음, 포스터 모드 유지 */ });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── 영상 종료 / 에러 ── */
  const handleVideoEnd = useCallback(() => {
    setShowVideo(false);
    setVideoPlaying(false);
    startTimeRef.current = Date.now();
  }, []);

  const handleVideoError = useCallback(() => {
    setShowVideo(false);
    setVideoPlaying(false);
    startTimeRef.current = Date.now();
  }, []);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  }, []);

  const handleFullscreen = useCallback(() => {
    containerRef.current?.requestFullscreen?.();
  }, []);

  /* ── 비디오 진행률 ── */
  useEffect(() => {
    if (!showVideo || !videoRef.current) return;
    const v = videoRef.current;
    const update = () => {
      if (v.duration) {
        setProgress((v.currentTime / v.duration) * 100);
        setElapsedMs(v.currentTime * 1000);
      }
    };
    v.addEventListener("timeupdate", update);
    return () => v.removeEventListener("timeupdate", update);
  }, [showVideo]);

  const scene = scenes[currentScene] ?? scenes[0];

  // 컨트롤 표시: hover 시 또는 일시정지 시
  const controlsVisible = hovered || !isPlaying;

  return (
    <div className="mx-auto w-full max-w-5xl px-4">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden aspect-video rounded-2xl shadow-2xl cursor-pointer select-none"
        onClick={handleAreaClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── 포스터 애니메이션 ── */}
        {!showVideo && (
          <>
            {scenes.map((s, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-1000"
                style={{
                  background: s.bg,
                  opacity: currentScene === i ? 1 : 0,
                }}
              />
            ))}

            <div className="absolute inset-0 overflow-hidden">
              {scene.orbs.map((orb, i) => (
                <div
                  key={`${currentScene}-${i}`}
                  className={`absolute rounded-full bg-gradient-to-r ${orb} blur-[80px]`}
                  style={{
                    width: i === 0 ? "50%" : "40%",
                    height: i === 0 ? "60%" : "50%",
                    top: i === 0 ? "10%" : "30%",
                    left: i === 0 ? "15%" : "50%",
                    animation: paused
                      ? "none"
                      : `float-${i === 0 ? "slow" : "medium"} ${i === 0 ? 12 : 9}s ease-in-out infinite`,
                  }}
                />
              ))}
            </div>

            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px)",
                backgroundSize: "80px 80px",
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />

            {/* 씬 텍스트 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
              <div
                className="text-center transition-all duration-700 ease-out"
                style={{
                  opacity: textVisible ? 1 : 0,
                  transform: textVisible
                    ? "translateY(0) scale(1)"
                    : "translateY(30px) scale(0.95)",
                }}
              >
                <p className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-2xl">
                  {scene.text}
                </p>
                <p
                  className="text-2xl md:text-4xl lg:text-5xl font-bold mt-2 drop-shadow-2xl"
                  style={{ color: colors.primary }}
                >
                  {scene.subtext}
                </p>
              </div>
            </div>

            {/* 레터박스 */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/20 to-transparent z-10 rounded-t-2xl pointer-events-none" />
          </>
        )}

        {/* ── 실제 비디오 ── */}
        {showVideo && videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            className="absolute inset-0 w-full h-full object-cover"
            muted={muted}
            playsInline
            onEnded={handleVideoEnd}
            onError={handleVideoError}
          />
        )}

        {/* ── 중앙 Play/Pause 버튼 (일시정지 시 + hover 시) ── */}
        <div
          className={`absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
            controlsVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-2xl pointer-events-auto transition-transform duration-200 hover:scale-110 active:scale-95"
            style={{
              backgroundColor: isPlaying
                ? "rgba(0,0,0,0.4)"
                : `${colors.primary}cc`,
            }}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            ) : (
              <Play
                className="w-7 h-7 sm:w-8 sm:h-8 text-white translate-x-0.5"
                fill="white"
              />
            )}
          </div>
        </div>

        {/* ── 하단 컨트롤 바 (hover 시 + 일시정지 시) ── */}
        <div
          data-controls
          className={`absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-5 sm:px-6 pb-4 sm:pb-5 pt-14 rounded-b-2xl transition-opacity duration-300 ${
            controlsVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* 프로그레스 바 */}
          <div className="h-1.5 sm:h-2 bg-white/25 rounded-full overflow-hidden mb-4 cursor-pointer hover:h-3 transition-all">
            <div
              className="h-full rounded-full transition-none"
              style={{
                width: `${progress}%`,
                backgroundColor: colors.primary,
              }}
            />
          </div>

          {/* 버튼 행 */}
          <div className="flex items-center gap-4 sm:gap-5">
            <button
              onClick={(e) => { e.stopPropagation(); toggle(); }}
              className="text-white hover:text-white/80 transition-colors hover:scale-110 active:scale-95"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 sm:w-7 sm:h-7" />
              ) : (
                <Play className="w-6 h-6 sm:w-7 sm:h-7" fill="white" />
              )}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (showVideo) toggleMute();
              }}
              className={`transition-colors ${
                showVideo
                  ? "text-white hover:text-white/80 hover:scale-110"
                  : "text-white/30 cursor-default"
              }`}
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? (
                <VolumeX className="w-6 h-6 sm:w-7 sm:h-7" />
              ) : (
                <Volume2 className="w-6 h-6 sm:w-7 sm:h-7" />
              )}
            </button>

            <span className="text-sm sm:text-base font-mono text-white/80 tabular-nums tracking-wide">
              {formatTime(elapsedMs)} / {formatTime(
                showVideo && videoRef.current?.duration
                  ? videoRef.current.duration * 1000
                  : totalDuration
              )}
            </span>

            <div className="flex-1" />

            <button
              onClick={(e) => { e.stopPropagation(); handleFullscreen(); }}
              className="text-white hover:text-white/80 transition-colors hover:scale-110 active:scale-95"
              aria-label="Fullscreen"
            >
              <Maximize className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
