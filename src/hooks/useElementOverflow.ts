import { useState, useEffect, RefObject } from "react";

export function useElementOverflow(
  elementRef: RefObject<HTMLElement | null>,
): boolean {
  const [hasOverflow, setHasOverflow] = useState(true);

  useEffect(() => {
    const checkForOverflow = () => {
      if (elementRef.current) {
        const hasHorizontalOverflow =
          elementRef.current.scrollWidth > elementRef.current.clientWidth;
        setHasOverflow(hasHorizontalOverflow);
      }
    };

    checkForOverflow();

    window.addEventListener("resize", checkForOverflow);

    // CHECK after mounting
    // This is a temp fix for the:
    // "go around the image loading in and so the scrollwidth gets" bigger problem
    const timers = [
      setTimeout(checkForOverflow, 100),
      setTimeout(checkForOverflow, 500),
      setTimeout(checkForOverflow, 1000),
      setTimeout(checkForOverflow, 5000),
      setTimeout(checkForOverflow, 10000),
      setTimeout(checkForOverflow, 30000),
    ];

    // Clean up
    return () => {
      window.removeEventListener("resize", checkForOverflow);
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [elementRef]);

  return hasOverflow;
}
