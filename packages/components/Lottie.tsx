import LottieComponent from 'lottie-react';

import * as avocadoAnimation from '@packages/assets/lotties/404.json';

interface LottieProps {
  animation: AvaiableAnimations;
}

export default function Lottie(props: LottieProps) {
  return <LottieComponent animationData={lottieAnimations[props.animation]} />;
}

type AvaiableAnimations = 'avocado';

const lottieAnimations: Record<AvaiableAnimations, Object> = {
  avocado: avocadoAnimation,
};
