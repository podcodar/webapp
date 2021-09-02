import { useLottie, LottieOptions, CSSProperties } from 'lottie-react';

import avocadoAnimation from '@packages/assets/lotties/404.json';

const style = {
  width: '70%',
};

export default function Lottie(props: LottieProps) {
  const options = processOptions(props);
  const { View } = useLottie(options, style);
  return View;
}

interface LottieProps {
  animation: AvaiableAnimations;
}

type AvaiableAnimations = 'avocado';

const lottieAnimations: Record<AvaiableAnimations, Object> = {
  avocado: avocadoAnimation,
};

function processOptions(props: LottieProps): LottieOptions {
  return {
    animationData: lottieAnimations[props.animation],
    loop: true,
    autoplay: true,
  };
}
