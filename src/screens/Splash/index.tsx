import React from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import {
  Container
} from './styles';

export function Splash() {
  const splashAnimation = useSharedValue(0);

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: 0
    }
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: 0
    }
  });

  return (
    <Container>
      <Animated.View style={brandStyle}>
        <BrandSvg
          width={80}
          height={50}
        />
      </Animated.View>
      <Animated.View style={logoStyle}>
        <LogoSvg
          width={180}
          height={20}
        />
      </Animated.View>
    </Container>
  );
}