import LottieComponent from 'lottie-react';

import * as avocadoAnimation from '@packages/assets/lotties/404.json';
import * as alterAnimation from '@packages/assets/lotties/new_404.json';

interface LottieProps {
  animation: AvaiableAnimations;
}

export default function Lottie(props: LottieProps) {
  return <LottieComponent animationData={lottieAnimations[props.animation]} />;
}

type AvaiableAnimations = 'avocado' | 'alt';

const lottieAnimations: Record<AvaiableAnimations, Object> = {
  avocado: avocadoAnimation,
  alt: alterAnimation,
};
