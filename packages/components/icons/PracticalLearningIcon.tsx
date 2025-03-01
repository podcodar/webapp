import { classes } from "@packages/utils/classes";
import type { HTMLAttributes } from "react";

export function PracticalLearningIcon({
  className,
  ...props
}: HTMLAttributes<SVGElement>) {
  return (
    <svg
      fill="none"
      viewBox="0 0 180 180"
      role="img"
      aria-label="Pratical Learning icon"
      className={classes("stroke-black dark:stroke-gray-50", className)}
      {...props}
    >
      <path
        d="M101.786 20.0952C112.327 24.7603 123.496 27.7513 132.98 34.6195C138.569 36.2095 147.357 44.0575 150.6 48.2091C167.304 69.5948 164.211 98.6604 162.875 123.923C161.627 147.544 139.5 164.342 118.755 168.646C105 171.5 88.4136 168.849 76.3676 163.397C66.2726 158.828 59.2042 155.432 53.0438 146.572C43.4068 132.711 47.5475 113.749 53.9825 99.3319C57.8127 90.7505 51.0886 82.471 43.8731 78.552C33.5049 72.9207 16 62.6197 16 48.8562C16 27.313 34.1806 10.5742 54.9934 10.0288C70.8078 9.61439 87.3549 13.7088 101.786 20.0952Z"
        fill="#D3C0E5"
      />
      <path
        d="M88.4913 74.2379C88.4913 71.5 68.6675 71.6976 62.9975 76.8597C60.0159 79.5742 57.6195 85.6133 55.8177 93.5H141.468C139.53 85.5137 137.103 78.7698 134.323 74.2379C130.514 68.0279 108.256 70.0001 108.256 74.2379C108.256 83.094 88.4913 84.133 88.4913 74.2379Z"
        fill="#84B005"
      />
      <path
        d="M123.801 93.7654L150.626 93.7654C153.387 93.7654 155.435 95.9913 155.123 98.735C154.338 105.644 152.845 117.465 152.442 120.312C151.207 129.353 150.36 135.29 146.23 157.389C145.789 159.753 143.727 161.474 141.322 161.474H56.1927C53.8234 161.474 51.7817 159.82 51.3348 157.493C48.3198 141.798 44.8482 117.527 42.6524 99.3249C42.2949 96.361 44.6075 93.7654 47.5929 93.7654C66.7811 93.7655 97.8175 93.7655 123.801 93.7654Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="53.5" y="164.5" width="89.8424" height="10.8859" rx="4.5" />
      <circle cx="98.0585" cy="128.509" r="10.3784" fill="#2A2B2F" />
      <circle
        cx="98.2238"
        cy="44.8365"
        r="24.8109"
        transform="rotate(-2.05874 98.2238 44.8365)"
      />
      <path
        d="M75.8212 55.5C73.1816 50.8737 67.1995 44.4182 71.2161 31.7945C66.9126 28.3517 73.7982 20.6054 82.6922 24.0482C81.474 15.8993 106.792 10.8507 107.68 19.6651C114.538 16.5887 129.053 23.309 126.301 30.6469C125.441 32.9422 121.711 37.5326 128.31 38.6802C120.85 49.0086 109.409 26.7575 109.409 35.7203C109.409 44.4182 92.0627 27.7779 89.7802 34.1234C85.5612 45.8527 78.9625 44.4182 77.5629 47.2872C75.3271 51.8705 73.1816 50.2999 75.8212 55.5Z"
        fill="black"
      />
      <path
        d="M78.617 47.1213C78.5381 46.8057 78.7767 46.5 79.102 46.5L95.4182 46.5C95.7532 46.5 95.9934 46.8229 95.8971 47.1437L94.7698 50.9005C94.1986 52.8037 92.4467 54.107 90.4596 54.107L83.8772 54.107C81.8124 54.107 80.0125 52.7019 79.5116 50.6988L78.617 47.1213Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M100.715 47.1213C100.636 46.8057 100.875 46.5 101.2 46.5L117.516 46.5C117.851 46.5 118.091 46.8229 117.995 47.1437L116.868 50.9005C116.297 52.8037 114.545 54.107 112.558 54.107L105.975 54.107C103.91 54.107 102.111 52.7019 101.61 50.6988L100.715 47.1213Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M96.131 46.5736C97.7094 45.9999 99.2878 45.9999 100.551 46.5736" />
    </svg>
  );
}
