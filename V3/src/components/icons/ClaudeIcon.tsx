import { forwardRef } from "react";
import type { LucideProps } from "lucide-react";

/**
 * Claude 대표 심볼 - Anthropic 스타버스트 로고 스타일
 * lucide-react LucideIcon 타입과 완전 호환
 */
const ClaudeIcon = forwardRef<SVGSVGElement, LucideProps>(
  ({ className = "", style, strokeWidth = 1.5, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
      {...props}
    >
      {/* 중심 원 */}
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
      {/* 6방향 스타버스트 광선 */}
      <line x1="12" y1="2" x2="12" y2="7" />
      <line x1="12" y1="17" x2="12" y2="22" />
      <line x1="3.34" y1="7" x2="7.67" y2="9.5" />
      <line x1="16.33" y1="14.5" x2="20.66" y2="17" />
      <line x1="3.34" y1="17" x2="7.67" y2="14.5" />
      <line x1="16.33" y1="9.5" x2="20.66" y2="7" />
    </svg>
  )
);

ClaudeIcon.displayName = "ClaudeIcon";

export default ClaudeIcon;
