import { useState, useEffect, useCallback } from "react";

export const useCopyClipboard = (codeSnippet: string) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    }
  }, [copied]);


  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
  }, [codeSnippet])

  return { copied, copyToClipboard };
}