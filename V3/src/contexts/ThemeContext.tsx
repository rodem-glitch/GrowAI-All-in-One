"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export type ThemeMode = "light" | "dark" | "system";
export type AccentColor = "teal" | "blue" | "purple" | "orange" | "green";

export const ACCENT_COLORS: Record<AccentColor, { primary: string; primaryDark: string }> = {
  teal:   { primary: "#14a1c8", primaryDark: "#107f9e" },
  blue:   { primary: "#3b82f6", primaryDark: "#2563eb" },
  purple: { primary: "#8b5cf6", primaryDark: "#7c3aed" },
  orange: { primary: "#f97316", primaryDark: "#ea580c" },
  green:  { primary: "#22c55e", primaryDark: "#16a34a" },
};

interface ThemeContextType {
  mode: ThemeMode;
  resolvedMode: "light" | "dark";
  accent: AccentColor;
  setMode: (mode: ThemeMode) => void;
  setAccent: (accent: AccentColor) => void;
  toggleMode: () => void;
  colors: { primary: string; primaryDark: string };
  accentOptions: AccentColor[];
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "system",
  resolvedMode: "light",
  accent: "teal",
  setMode: () => {},
  setAccent: () => {},
  toggleMode: () => {},
  colors: ACCENT_COLORS.teal,
  accentOptions: Object.keys(ACCENT_COLORS) as AccentColor[],
});

const STORAGE_KEY_MODE = "theme-mode";
const STORAGE_KEY_ACCENT = "theme-accent";

function getSystemPreference(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveMode(mode: ThemeMode): "light" | "dark" {
  return mode === "system" ? getSystemPreference() : mode;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("system");
  const [accent, setAccentState] = useState<AccentColor>("teal");
  const [resolvedMode, setResolvedMode] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Hydration-safe: read localStorage only after mount
  useEffect(() => {
    const savedMode = localStorage.getItem(STORAGE_KEY_MODE) as ThemeMode;
    const savedAccent = localStorage.getItem(STORAGE_KEY_ACCENT) as AccentColor;
    if (savedMode) setModeState(savedMode);
    if (savedAccent) setAccentState(savedAccent);
    setMounted(true);
  }, []);

  // Listen for OS color-scheme changes when mode is "system"
  useEffect(() => {
    if (mode !== "system") {
      setResolvedMode(mode);
      return;
    }
    setResolvedMode(getSystemPreference());

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setResolvedMode(e.matches ? "dark" : "light");
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [mode]);

  // Apply dark class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (resolvedMode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [resolvedMode]);

  // Apply accent CSS variables
  useEffect(() => {
    const root = document.documentElement;
    const c = ACCENT_COLORS[accent];
    root.style.setProperty("--primary", c.primary);
    root.style.setProperty("--primary-dark", c.primaryDark);
  }, [accent]);

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
    localStorage.setItem(STORAGE_KEY_MODE, m);
  }, []);

  const setAccent = useCallback((a: AccentColor) => {
    setAccentState(a);
    localStorage.setItem(STORAGE_KEY_ACCENT, a);
  }, []);

  const toggleMode = useCallback(() => {
    setModeState((prev) => {
      const next = resolveMode(prev) === "light" ? "dark" : "light";
      localStorage.setItem(STORAGE_KEY_MODE, next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        resolvedMode,
        accent,
        setMode,
        setAccent,
        toggleMode,
        colors: ACCENT_COLORS[accent],
        accentOptions: Object.keys(ACCENT_COLORS) as AccentColor[],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
