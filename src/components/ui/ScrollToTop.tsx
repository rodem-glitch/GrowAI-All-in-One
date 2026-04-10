import { useState, useEffect } from "react"
import { useLanguage } from "../../contexts/LanguageContext"
import { useTheme } from "../../contexts/ThemeContext"

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const { t } = useLanguage()
  const { colors } = useTheme()

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t.scrollToTop}
      className={[
        "fixed bottom-8 right-8 z-50",
        "w-12 h-12 rounded-full text-white shadow-lg",
        "transition-all duration-300",
        "flex items-center justify-center",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none",
      ].join(" ")}
      style={{ backgroundColor: colors.primary }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors.primaryDark
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors.primary
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  )
}
