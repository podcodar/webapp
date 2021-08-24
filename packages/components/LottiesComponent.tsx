import Lottie from 'react-lottie';
import * as avocadoAnimation from '@packages/utils/lotties/404.json';

export enum AvaiableAnimations {
  avocado = 'avocado',
}

interface ILottiesComponent {
  animation: AvaiableAnimations;
}

const defaultOptions = {
  loop: false,
  animationData: avocadoAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const lottieAnimations = {
  avocado: avocadoAnimation,
};

export default function LottiesComponent({ animation }: ILottiesComponent) {
  const options = {
    ...defaultOptions,
    animationData: lottieAnimations[animation],
  };
  return <Lottie options={options} isClickToPauseDisabled={true} />;
}
