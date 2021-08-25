import LottieComponent, { Options } from 'react-lottie';

import * as avocadoAnimation from '@packages/assets/lotties/404.json';

interface LottieProps {
  animation: AvaiableAnimations;
}

export default function Lottie(props: LottieProps) {
  const options = processOptions(props);

  return (
    <LottieComponent
      options={options}
      isClickToPauseDisabled={true}
      width="70%"
    />
  );
}

type AvaiableAnimations = 'avocado';

const lottieAnimations: Record<AvaiableAnimations, Object> = {
  avocado: avocadoAnimation,
};

function processOptions(props: LottieProps): Options {
  return {
    loop: false,
    animationData: lottieAnimations[props.animation],
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
}
