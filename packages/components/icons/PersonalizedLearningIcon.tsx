import { classes } from "@packages/utils/classes";
import type { HTMLAttributes } from "react";

export function PersonalizedLearningIcon({ className, ...props }: HTMLAttributes<SVGElement>) {
  return (
    <svg
      fill="none"
      viewBox="0 0 180 180"
      role="img"
      aria-label="Personalized Learning icon"
      className={classes("stroke-black darker:stroke-gray-50", className)}
      {...props}
    >
      <g clipPath="url(#clip0)">
        <path
          d="M155.863 89.902C162.252 102.018 178.12 118.046 178.202 128.168C178.246 133.531 178.653 136.797 175.639 142.017C168.025 155.205 156.047 160.665 140.852 163.454C126.457 166.096 112.541 170.277 98.0198 172.194C88.8234 173.408 78.4989 174.845 69.3442 172.713C59.5827 170.439 50.743 162.48 45.3321 154.484C38.6926 144.671 33.2055 134.524 27.5432 124.131C22.344 114.589 16.7388 104.951 12.7405 94.8243C5.59968 76.7392 -2.39911 49.8035 12.1275 33.5463C18.4954 26.4197 26.4966 22.4611 35.2125 18.9347C39.9309 17.0256 46.4252 15.6288 51.4605 14.699L51.4906 14.6935C58.1324 13.467 63.9591 12.391 70.7041 12.4076C77.9228 12.4254 85.6458 12.3335 92.6474 14.3082C109.577 19.0827 120.45 36.4118 130.141 49.6824C139.593 62.625 148.376 75.7044 155.863 89.902Z"
          fill="#D3C0E6"
        />
        <rect x="28.934" y="33.5" width="127" height="125" rx="7.5" />
        <rect
          x="68.5"
          y="54.5"
          width="14"
          height="70"
          rx="3.5"
          transform="rotate(-90 68.5 54.5)"
          strokeDasharray="3 8"
        />
        <rect x="46.934" y="54.5" width="15" height="15" rx="7.5" transform="rotate(-90 46.934 54.5)" />
        <rect x="50.934" y="62.5" width="4" height="89" rx="2" />
        <rect x="45.934" y="73.5" width="14" height="3" rx="1.5" fill="#D3C0E5" />
        <rect x="77.5" y="62.5" width="4" height="89" rx="2" />
        <rect x="72.5" y="96.5" width="14" height="3" rx="1.5" fill="#D3C0E5" />
        <rect x="103.5" y="62.5" width="4" height="89" rx="2" />
        <rect x="98.5" y="81.5" width="14" height="3" rx="1.5" fill="#D3C0E5" />
        <rect x="129.5" y="62.5" width="4" height="89" rx="2" />
        <rect x="124.5" y="122.5" width="14" height="3" rx="1.5" fill="#D3C0E5" />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="180" height="180" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
