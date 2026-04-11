/**
 * 페이지 표시/숨김 스위치
 * true = 표시, false = 숨김
 * 나중에 다시 보이게 하려면 해당 값을 true로 변경
 */
export const PAGE_VISIBILITY = {
  pricing: false,
  download: true,
  dataProtection: true,
  whatsNew: true,
  community: true,
  discord: true,
  helpCenter: true,
  blog: true,
  about: true,
  careers: true,
  apiDocs: true,
} as const;
