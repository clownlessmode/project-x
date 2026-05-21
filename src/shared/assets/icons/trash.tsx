import type { SVGProps } from "react";

export function TrashIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path
        d="M2.5 4.5H14.5M6.5 4.5V3.5C6.5 2.94772 6.94772 2.5 7.5 2.5H9.5C10.0523 2.5 10.5 2.94772 10.5 3.5V4.5M13.5 4.5V13.5C13.5 14.0523 13.0523 14.5 12.5 14.5H4.5C3.94772 14.5 3.5 14.0523 3.5 13.5V4.5H13.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
