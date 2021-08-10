import React from 'react';

import {
  Container,
  Title
} from './styles';

interface Props {
  title: string;
  color?: string;
  // onPres: () => void;
}

export function Button({ title, color, ...rest }: Props) {
  return (
    <Container
      {...rest}
      color={color}
    >
      <Title>{title}</Title>
    </Container>
  );
}