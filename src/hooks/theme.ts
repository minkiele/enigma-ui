import { useEffect } from "react";
import { useMedia } from "react-use";

export const useTheme = () => {
  const isDark = useMedia("(prefers-color-scheme: dark)");
  useEffect(() => {
    const html = document.querySelector("html");
    if (isDark) {
      html?.setAttribute("data-bs-theme", "dark");
    } else {
      html?.removeAttribute("data-bs-theme");
    }
  }, [isDark]);
};
