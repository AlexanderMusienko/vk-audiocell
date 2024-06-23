import { CSSProperties } from "react";

const durationStyle: CSSProperties = {
  fontSize: "13px",
  letterSpacing: "0.2px",
  marginBottom: "2px",
  color: "var(--vkui--color_text_secondary)",
};

const authorNameStyle: CSSProperties = {
  fontSize: "13px",
  letterSpacing: "0.4px",
  color: "var(--vkui--color_text_secondary)",
  lineHeight: "16px",
};

const songNameStyle: CSSProperties = {
  fontSize: "16px",
  letterSpacing: "0.15px",
  color: "var(--vkui--color_text)",
  lineHeight: "20px",
  fontWeight: 500,
};

export const s = {
  durationStyle,
  authorNameStyle,
  songNameStyle,
};
