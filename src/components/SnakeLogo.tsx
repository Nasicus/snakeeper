import { FC } from "react";

export const SnakeLogo: FC<{ size?: number }> = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 12 C16 12, 48 8, 50 28 C52 48, 20 44, 18 32 C16 20, 40 22, 42 34 C44 46, 24 52, 24 52"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />
    <line
      x1="20"
      y1="52"
      x2="14"
      y2="48"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <line
      x1="20"
      y1="52"
      x2="14"
      y2="56"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="18" cy="14" r="3" fill="currentColor" />
  </svg>
);
