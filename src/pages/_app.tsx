import type { AppProps } from "next/app";
import { useEffect, useMemo } from "react";
import "../styles/globals.scss";
import "../styles/index.scss";
import AppLayout from "./AppLayout";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const preloader = document.querySelector(".site-preloader");

    if (!preloader) {
      return;
    }

    setTimeout(() => {
      const onTransitionEnd = (event: Event) => {
        if (
          event instanceof TransitionEvent &&
          event.propertyName === "opacity" &&
          preloader.parentNode
        ) {
          preloader.parentNode.removeChild(preloader);
        }
      };

      preloader.addEventListener("transitionend", onTransitionEnd);
      preloader.classList.add("site-preloader__fade");

      if (getComputedStyle(preloader).opacity === "0" && preloader.parentNode) {
        preloader.parentNode.removeChild(preloader);
      }
    }, 100);
  }, []);

  const content = useMemo(() => {
    return (
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    );
  }, [Component, pageProps]);

  return content;
}
