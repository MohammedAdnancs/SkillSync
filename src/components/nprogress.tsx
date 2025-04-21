"use client";

import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import { useEffect, Suspense } from "react";

// This component safely uses useSearchParams inside Suspense
function NavigationProgressInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.configure({ 
      showSpinner: false,
      trickleSpeed: 200,
      minimum: 0.1,
      speed: 300,
      easing: 'ease',
    });

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isNavigationElement = 
        target.tagName === 'A' || 
        target.closest('a')

      if (isNavigationElement) {
        NProgress.start();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      NProgress.done();
    };
  }, []);

  useEffect(() => {
   
    NProgress.done(); 
    NProgress.start(); 
    const timer = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname, searchParams]);

  return null;
}

// Wrapper component that uses Suspense boundary
export function NavigationProgress() {
  return (
    <Suspense fallback={null}>
      <NavigationProgressInner />
    </Suspense>
  );
}