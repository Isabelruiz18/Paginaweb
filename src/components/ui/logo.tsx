import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 20"
      width="100"
      height="20"
      aria-label="Novae Logo"
      {...props}
      className={`fill-current ${props.className || ''}`}
    >
      <text
        x="50"
        y="15"
        fontFamily="'Inter', sans-serif"
        fontSize="16"
        fontWeight="bold"
        textAnchor="middle"
      >
        NOVAE
      </text>
    </svg>
  );
}
