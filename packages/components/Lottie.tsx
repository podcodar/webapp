import lottie from 'lottie-web';
import { Box, ChakraProps } from '@chakra-ui/react';
import { useLayoutEffect, useRef } from 'react';

interface LottieProps extends ChakraProps {
  animation: AvailableAnimations;
}

export default function Lottie({ animation, ...props }: LottieProps) {
  const lottieBodyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (lottieBodyRef.current === null) return;

    const container = lottieBodyRef.current;
    const path = lottieAnimations[animation];

    lottie.loadAnimation({
      path,
      container,
      loop: true,
      autoplay: true,
      renderer: 'svg',
    });

    return () => lottie.destroy();
  }, [animation]);

  return <Box ref={lottieBodyRef} {...props} />;
}

type AvailableAnimations = 'avocado';

const lottieAnimations: Record<AvailableAnimations, string> = {
  avocado: '/assets/404_avocado.json',
};
