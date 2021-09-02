import { CSSProperties } from 'react';
import { useLottie, LottieOptions } from 'lottie-react';

import avocadoAnimation from '@packages/assets/lotties/404.json';

export default function Lottie(props: LottieProps) {
  const options = processOptions(props);
  const { View } = useLottie(options, props.styles);
  return View;
}

interface LottieProps {
  animation: AvaiableAnimations;
  styles: CSSProperties;
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
