// useResponsive.ts — 반응형 브레이크포인트 훅
import { useState, useEffect, useCallback } from 'react';

type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide';

interface ResponsiveState {
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const BREAKPOINTS = {
  mobile: 0,
  tablet: 640,
  desktop: 1024,
  wide: 1440,
} as const;

/**
 * 현재 뷰포트 크기에 따른 브레이크포인트 정보를 반환하는 훅
 * - mobile: < 640px
 * - tablet: 640px ~ 1023px
 * - desktop: 1024px ~ 1439px
 * - wide: >= 1440px
 */
export function useResponsive(): ResponsiveState {
  const getBreakpoint = useCallback((): Breakpoint => {
    if (typeof window === 'undefined') return 'desktop';

    const width = window.innerWidth;

    if (width >= BREAKPOINTS.wide) return 'wide';
    if (width >= BREAKPOINTS.desktop) return 'desktop';
    if (width >= BREAKPOINTS.tablet) return 'tablet';
    return 'mobile';
  }, []);

  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => getBreakpoint());

  useEffect(() => {
    // matchMedia 리스너를 사용하여 성능 최적화
    const queries = [
      window.matchMedia(`(min-width: ${BREAKPOINTS.wide}px)`),
      window.matchMedia(`(min-width: ${BREAKPOINTS.desktop}px) and (max-width: ${BREAKPOINTS.wide - 1}px)`),
      window.matchMedia(`(min-width: ${BREAKPOINTS.tablet}px) and (max-width: ${BREAKPOINTS.desktop - 1}px)`),
      window.matchMedia(`(max-width: ${BREAKPOINTS.tablet - 1}px)`),
    ];

    const handleChange = () => {
      setBreakpoint(getBreakpoint());
    };

    queries.forEach((mq) => {
      mq.addEventListener('change', handleChange);
    });

    // 초기값 동기화
    handleChange();

    return () => {
      queries.forEach((mq) => {
        mq.removeEventListener('change', handleChange);
      });
    };
  }, [getBreakpoint]);

  return {
    breakpoint,
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop' || breakpoint === 'wide',
  };
}

/**
 * 임의의 미디어 쿼리 문자열에 대한 매칭 여부를 반환하는 훅
 * @param query - CSS 미디어 쿼리 문자열 (예: '(min-width: 768px)')
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // 초기값 동기화
    setMatches(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}
