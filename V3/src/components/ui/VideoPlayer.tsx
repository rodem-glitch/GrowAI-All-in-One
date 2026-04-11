"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

/* ── 씬 데이터 (포스터 애니메이션) ── */
interface PosterScene {
  bg: string;
  orbs: string[];
  text: string;
  subtext: string;
}

export interface VideoPlayerProps {
  /** 실제 영상 URL (mp4). 없으면 포스터 애니메이션이 영상 역할 */
  videoSrc?: string;
  /** 포스터 애니메이션 씬 배열 */
  scenes: PosterScene[];
  /** 씬당 표시 시간 (ms). 기본 4000 */
  sceneDuration?: number;
}

/* ── 시간 포맷 헬퍼 ── */
function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

export default function VideoPlayer({
  videoSrc,
  scenes,
  sceneDuration = 4000,
}: VideoPlayerProps) {
  const { colors } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── 상태 ── */
  const [showVideo, setShowVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayBtn, setShowPlayBtn] = useState(true);
  const [posterMode, setPosterMode] = useState<
    "loop" | "once"
  >("loop");
  // posterPaused: once 모드에서 일시정지
  const [posterPaused, setPosterPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentScene, setCurrentScene] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  // 포스터 경과 시간 (ms)
  const [elapsedMs, setElapsedMs] = useState(0);
  const startTimeRef = useRef(Date.now());
  // 일시정지 시 경과 시간 저장
  const pausedAtRef = useRef(0);

  const totalDuration = scenes.length * sceneDuration;

  // 포스터가 "재생 중"인지 (once 모드 + paused 아님)
  const isPosterPlaying =
    !showVideo && posterMode === "once" && !posterPaused;
  // 포스터가 일시정지 상태인지
  const isPosterPausedState =
    !showVideo && posterMode === "once" && posterPaused;
  // 하단 컨트롤 바 표시 여부 (once 모드일 때)
  const showControls =
    !showVideo && posterMode === "once" && !showPlayBtn;

  /* ── 포스터 애니메이션 ── */
  useEffect(() => {
    if (showVideo || posterPaused) return;
    let rafId: number;
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;

      if (posterMode === "once" && elapsed >= totalDuration) {
        setCurrentScene(scenes.length - 1);
        setProgress(100);
        setElapsedMs(totalDuration);
        setTextVisible(true);
        setShowPlayBtn(true);
        setPosterMode("loop");
        startTimeRef.current = Date.now();
        return;
      }

      const loopElapsed =
        posterMode === "once"
          ? Math.min(elapsed, totalDuration)
          : elapsed % totalDuration;

      const idx = Math.min(
        Math.floor(loopElapsed / sceneDuration),
        scenes.length - 1
      );
      const sceneProgress =
        (loopElapsed % sceneDuration) / sceneDuration;

      setCurrentScene(idx);
      setProgress((loopElapsed / totalDuration) * 100);
      setElapsedMs(loopElapsed);
      setTextVisible(
        sceneProgress > 0.05 && sceneProgress < 0.92
      );
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [
    showVideo,
    posterMode,
    posterPaused,
    totalDuration,
    sceneDuration,
    scenes.length,
  ]);

  /* ── Play 버튼 클릭 (중앙 대형 버튼) ── */
  const handlePlay = useCallback(() => {
    setShowPlayBtn(false);

    if (videoSrc) {
      setShowVideo(true);
      setIsPlaying(true);
      setTimeout(() => {
        videoRef.current?.play().catch(() => {
          setShowVideo(false);
          setIsPlaying(false);
          setPosterMode("once");
          setPosterPaused(false);
          startTimeRef.current = Date.now();
        });
      }, 100);
    } else {
      setPosterMode("once");
      setPosterPaused(false);
      startTimeRef.current = Date.now();
    }
  }, [videoSrc]);

  /* ── 포스터 일시정지/재개 (하단 컨트롤 Play/Pause) ── */
  const togglePosterPlay = useCallback(() => {
    if (posterPaused) {
      // 재개: pausedAt 기준으로 startTime 보정
      startTimeRef.current =
        Date.now() - pausedAtRef.current;
      setPosterPaused(false);
    } else {
      // 일시정지: 현재 경과 시간 저장
      pausedAtRef.current =
        Date.now() - startTimeRef.current;
      setPosterPaused(true);
    }
  }, [posterPaused]);

  /* ── 영상 종료 ── */
  const handleVideoEnd = useCallback(() => {
    setShowVideo(false);
    setIsPlaying(false);
    setShowPlayBtn(true);
    setPosterMode("loop");
    startTimeRef.current = Date.now();
  }, []);

  /* ── 영상 로드 에러 ── */
  const handleVideoError = useCallback(() => {
    setShowVideo(false);
    setIsPlaying(false);
    setPosterMode("once");
    setPosterPaused(false);
    startTimeRef.current = Date.now();
  }, []);

  /* ── 실제 비디오 컨트롤 ── */
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
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
    const video = videoRef.current;
    const update = () => {
      if (video.duration) {
        setProgress(
          (video.currentTime / video.duration) * 100
        );
      }
    };
    video.addEventListener("timeupdate", update);
    return () =>
      video.removeEventListener("timeupdate", update);
  }, [showVideo]);

  const scene = scenes[currentScene] ?? scenes[0];

  /* ── 공통 컨트롤 바 렌더 ── */
  const controlBar = (
    isVideoMode: boolean,
    playing: boolean,
    onToggle: () => void
  ) => (
    <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-5 sm:px-6 pb-4 sm:pb-5 pt-14 rounded-b-2xl">
      {/* 프로그레스 바 */}
      <div className="group/progress h-1.5 sm:h-2 bg-white/25 rounded-full overflow-hidden mb-4 cursor-pointer hover:h-3 transition-all">
        <div
          className="h-full rounded-full transition-none"
          style={{
            width: `${progress}%`,
            backgroundColor: colors.primary,
          }}
        />
      </div>

      {/* 컨트롤 버튼들 */}
      <div className="flex items-center gap-4 sm:gap-5">
        {/* Play/Pause */}
        <button
          onClick={onToggle}
          className="text-white hover:text-white/80 transition-colors hover:scale-110 active:scale-95"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <Pause className="w-6 h-6 sm:w-7 sm:h-7" />
          ) : (
            <Play className="w-6 h-6 sm:w-7 sm:h-7" fill="white" />
          )}
        </button>

        {/* 볼륨 */}
        <button
          onClick={
            isVideoMode ? toggleMute : undefined
          }
          className={`transition-colors ${
            isVideoMode
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

        {/* 시간 표시 */}
        <span className="text-sm sm:text-base font-mono text-white/80 tabular-nums tracking-wide">
          {isVideoMode
            ? undefined
            : `${formatTime(elapsedMs)} / ${formatTime(totalDuration)}`}
        </span>

        <div className="flex-1" />

        {/* 풀스크린 */}
        <button
          onClick={handleFullscreen}
          className="text-white hover:text-white/80 transition-colors hover:scale-110 active:scale-95"
          aria-label="Fullscreen"
        >
          <Maximize className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-5xl px-4">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden aspect-video rounded-2xl shadow-2xl"
      >

        {/* ── 포스터 애니메이션 ── */}
        {!showVideo && (
          <>
            {/* 배경 전환 */}
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

            {/* Orb 파티클 */}
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
                    animation: posterPaused
                      ? "none"
                      : `float-${i === 0 ? "slow" : "medium"} ${i === 0 ? 12 : 9}s ease-in-out infinite`,
                  }}
                />
              ))}
            </div>

            {/* 그리드 오버레이 */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
              }}
            />

            {/* 필름 그레인 */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />

            {/* 씬 텍스트 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
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

            {/* 중앙 재생 버튼 (초기 상태) */}
            {showPlayBtn && (
              <button
                onClick={handlePlay}
                className="absolute inset-0 z-20 flex items-center justify-center group cursor-pointer"
                aria-label="Play video"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${colors.primary}cc`,
                  }}
                >
                  <Play
                    className="w-8 h-8 text-white translate-x-0.5"
                    fill="white"
                  />
                </div>
              </button>
            )}

            {/* 레터박스 */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/20 to-transparent z-10 rounded-t-2xl" />

            {/* 포스터 재생 중: 하단 컨트롤 바 */}
            {showControls
              ? controlBar(
                  false,
                  isPosterPlaying,
                  togglePosterPlay
                )
              : (
                <>
                  {/* 초기 loop 모드: 씬 인디케이터 */}
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/20 to-transparent z-10 rounded-b-2xl" />
                  <div className="absolute bottom-0 left-0 right-0 z-30 px-6 pb-3">
                    <div className="max-w-md mx-auto">
                      <div className="flex gap-2 mb-2 justify-center">
                        {scenes.map((_, i) => (
                          <div
                            key={i}
                            className="h-1 rounded-full transition-all duration-300"
                            style={{
                              width:
                                currentScene === i
                                  ? "40px"
                                  : "12px",
                              backgroundColor:
                                currentScene === i
                                  ? colors.primary
                                  : "rgba(255,255,255,0.3)",
                            }}
                          />
                        ))}
                      </div>
                      <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-none"
                          style={{
                            width: `${progress}%`,
                            backgroundColor: colors.primary,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
          </>
        )}

        {/* ── 실제 비디오 재생 ── */}
        {showVideo && videoSrc && (
          <>
            <video
              ref={videoRef}
              src={videoSrc}
              className="absolute inset-0 w-full h-full object-cover"
              muted={muted}
              playsInline
              onEnded={handleVideoEnd}
              onError={handleVideoError}
            />
            {controlBar(true, isPlaying, togglePlay)}
          </>
        )}
      </div>
    </div>
  );
}
