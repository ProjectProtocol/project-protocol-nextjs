"use client";

/**
 * ProgressBar
 * Adapted from https://github.com/TheSGJ/nextjs-toploader/blob/master/src/index.tsx
 * @description Adds gobal event listeners to show and hide the topbar progress indicator when navigating between pages.
 * @returns {null}
 */
import { useEffect } from "react";
import topbar from "topbar";

topbar.config({
  barColors: {
    "0": "#f06748",
    ".3": "#ffc775",
    "1.0": "#ffc775",
  },
  shadowBlur: 0,
});

const THRESHOLD = 200; // Only show if request takes longer than 200ms
export default function ProgressBar() {
  const toAbsoluteURL = (url: string): string => {
    return new URL(url, window.location.href).href;
  };

  useEffect((): ReturnType<React.EffectCallback> => {
    const isHashAnchor = (currentUrl: string, newUrl: string): boolean => {
      const current = new URL(toAbsoluteURL(currentUrl));
      const next = new URL(toAbsoluteURL(newUrl));
      return current.href.split("#")[0] === next.href.split("#")[0];
    };

    const isSameHostName = (currentUrl: string, newUrl: string): boolean => {
      const current = new URL(toAbsoluteURL(currentUrl));
      const next = new URL(toAbsoluteURL(newUrl));
      return (
        current.hostname.replace(/^www\./, "") ===
        next.hostname.replace(/^www\./, "")
      );
    };

    /**
     * Check if the Current Url is same as New Url
     * @param currentUrl {string}
     * @param newUrl {string}
     * @returns {boolean}
     */
    function isAnchorOfCurrentUrl(currentUrl: string, newUrl: string): boolean {
      const currentUrlObj = new URL(currentUrl);
      const newUrlObj = new URL(newUrl);
      // Compare hostname, pathname, and search parameters
      if (
        currentUrlObj.hostname === newUrlObj.hostname &&
        currentUrlObj.pathname === newUrlObj.pathname &&
        currentUrlObj.search === newUrlObj.search
      ) {
        // Check if the new URL is just an anchor of the current URL page
        const currentHash = currentUrlObj.hash;
        const newHash = newUrlObj.hash;
        return (
          currentHash !== newHash &&
          currentUrlObj.href.replace(currentHash, "") ===
            newUrlObj.href.replace(newHash, "")
        );
      }
      return false;
    }

    /**
     * Find the closest anchor to trigger
     * @param element {HTMLElement | null}
     * @returns element {Element}
     */
    function findClosestAnchor(
      element: HTMLElement | null
    ): HTMLAnchorElement | null {
      while (element && element.tagName.toLowerCase() !== "a") {
        element = element.parentElement;
      }
      return element as HTMLAnchorElement;
    }

    /**
     *
     * @param event {MouseEvent}
     * @returns {void}
     */
    function handleClick(event: MouseEvent): void {
      try {
        const target = event.target as HTMLElement;
        const anchor = findClosestAnchor(target);
        const newUrl = anchor?.href;
        if (newUrl) {
          const currentUrl = window.location.href;
          // const newUrl = (anchor as HTMLAnchorElement).href;
          const isExternalLink =
            (anchor as HTMLAnchorElement).target === "_blank";

          // Check for Special Schemes
          const isSpecialScheme = [
            "tel:",
            "mailto:",
            "sms:",
            "blob:",
            "download:",
          ].some((scheme) => newUrl.startsWith(scheme));

          const isAnchor: boolean = isAnchorOfCurrentUrl(currentUrl, newUrl);
          const notSameHost = !isSameHostName(
            window.location.href,
            anchor.href
          );
          if (notSameHost) {
            return;
          }
          if (
            newUrl === currentUrl ||
            isAnchor ||
            isExternalLink ||
            isSpecialScheme ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.altKey ||
            isHashAnchor(window.location.href, anchor.href) ||
            !toAbsoluteURL(anchor.href).startsWith("http")
          ) {
          } else {
            topbar.show();
          }
        }
      } catch (err) {
        topbar.hide();
      }
    }

    /**
     * Complete TopLoader Progress on adding new entry to history stack
     * @param {History}
     * @returns {void}
     */
    ((history: History): void => {
      const pushState = history.pushState;
      history.pushState = (...args) => {
        topbar.hide();
        return pushState.apply(history, args);
      };
    })((window as Window).history);

    /**
     * Complete TopLoader Progress on replacing current entry of history stack
     * @param {History}
     * @returns {void}
     */
    ((history: History): void => {
      const replaceState = history.replaceState;
      history.replaceState = (...args) => {
        topbar.hide();
        return replaceState.apply(history, args);
      };
    })((window as Window).history);

    function handlePageHide(): void {
      topbar.hide();
    }

    /**
     * Handle Browser Back and Forth Navigation
     * @returns {void}
     */
    function handleBackAndForth(): void {
      topbar.hide();
    }

    // Add the global click event listener
    window.addEventListener("popstate", handleBackAndForth);
    document.addEventListener("click", handleClick);
    window.addEventListener("pagehide", handlePageHide);

    // Clean up the global click event listener when the component is unmounted
    return (): void => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("popstate", handleBackAndForth);
    };
  }, []);
  return null;
}
