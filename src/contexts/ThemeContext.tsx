import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export type ThemeMode = "light" | "dark";
export type AccentColor = "teal" | "blue" | "purple" | "orange" | "green";

const ACCENT_COLORS: Record<AccentColor, { primary: string; primaryDark: string }> = {
  teal:   { primary: "#14a1c8", primaryDark: "#107f9e" },
  blue:   { primary: "#3b82f6", primaryDark: "#2563eb" },
  purple: { primary: "#8b5cf6", primaryDark: "#7c3aed" },
  orange: { primary: "#f97316", primaryDark: "#ea580c" },
  green:  { primary: "#22c55e", primaryDark: "#16a34a" },
};

interface ThemeContextType {
  mode: ThemeMode;
  accent: AccentColor;
  setMode: (mode: ThemeMode) => void;
  setAccent: (accent: AccentColor) => void;
  toggleMode: () => void;
  colors: { primary: string; primaryDark: string };
  accentOptions: AccentColor[];
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  accent: "teal",
  setMode: () => {},
  setAccent: () => {},
  toggleMode: () => {},
  colors: ACCENT_COLORS.teal,
  accentOptions: Object.keys(ACCENT_COLORS) as AccentColor[],
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("light");
  const [accent, setAccentState] = useState<AccentColor>("teal");

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [mode]);

  useEffect(() => {
    const root = document.documentElement;
    const c = ACCENT_COLORS[accent];
    root.style.setProperty("--primary", c.primary);
    root.style.setProperty("--primary-dark", c.primaryDark);
  }, [accent]);

  const setMode = useCallback((m: ThemeMode) => setModeState(m), []);
  const setAccent = useCallback((a: AccentColor) => setAccentState(a), []);
  const toggleMode = useCallback(() => setModeState((prev) => (prev === "light" ? "dark" : "light")), []);

  return (
    <ThemeContext.Provider
      value={{
        mode,
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
