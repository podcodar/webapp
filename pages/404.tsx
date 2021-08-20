import Head from 'next/head';
import Lottie from 'react-lottie';
import * as animationData from '@packages/components/lotties/404.json';
import { Box } from '@chakra-ui/layout';

const defaultOptions = {
  loop: false,

  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export default function Home() {
  return (
    <Box>
      <Lottie options={defaultOptions} isClickToPauseDisabled={true} />
    </Box>
  );
}
