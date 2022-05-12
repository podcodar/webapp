import { IconProps } from '@chakra-ui/react';

import { TechIcon } from './TechIcon';

export const BRFlagIcon = (props: IconProps) => {
  return (
    <TechIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        viewBox="0 0 512 512"
      >
        <path
          fill="#73af00"
          d="M474 88H38c-21 0-38 17-38 39v258c0 22 17 39 38 39h436c21 0 38-17 38-39V127c0-22-17-39-38-39z"
        />
        <path
          fill="#ffe15a"
          d="M251 135 65 248c-5 4-5 12 0 16l186 113c3 2 7 2 10 0l186-113c5-4 5-12 0-16L261 135c-3-2-7-2-10 0z"
        />
        <circle cx="256" cy="256" r="70.6" fill="#41479b" />
        <path
          fill="#f5f5f5"
          d="M195 220c-3 5-6 12-7 18 39-3 97 8 134 44 2-6 4-13 4-20-38-32-90-43-131-42zm64 60 2 6h6v1l-5 4 2 5c0 1 0 2-1 1l-5-3-5 3-1-1 2-5-5-4 1-1h6l1-6h2zm23 15 1 2h2l1 1-2 1v3l-2-1-2 1h-1l1-3-2-1v-1h3v-2h1zm-33-26 1 3h3l-3 2 1 2v1l-2-2-2 2-1-1 1-2-2-2c-1 0 0 0 0 0h2l1-3h1zm-45-3 1 3h2l1 1-2 1v3l-2-2-2 2-1-1 1-2-2-1v-1h3v-3h1zm38 28v2h3v1l-2 1 1 3h-1l-2-1-2 1v-3l-2-1 1-1h2l1-2h1zm-21-29 1 2h2l-2 2 1 1-1 1-1-1-2 1v-2l-1-2c-1 0-1 0 0 0h2v-2h1zm63-41 1 2h2v1l-2 1 1 3s0 1 0 0l-3-1-2 1c0 1 0 0 0 0l1-3-3-1 1-1h2l1-2h1zm-77 29 1 2h2l-2 1 1 2-1 1-1-2-2 2v-3l-1-1c-1 0-1 0 0 0h2v-2h1zm10 28 1 3h4l-3 2 1 3-1 1-2-2-3 2-1-1 1-3-2-2h3l1-3h1zm78 14 1 2h2v1l-2 1 1 2h-1l-1-1-2 1v-2l-1-1v-1h2v-2h1zm7-14 1 2h2v1l-2 1 1 3-2-1-3 1 1-3-2-1v-1h2l1-2h1z"
        />
      </svg>
    </TechIcon>
  );
};
