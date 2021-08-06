import React from 'react';

import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CardImage,
} from './styles';

interface Props {
  imagesUrl: string[]
}

export function ImageSlider({ imagesUrl }: Props) {
  return (
    <Container>
      <ImageIndexes>
        <ImageIndex active={true} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
      </ImageIndexes>

      <CarImageWrapper>
        <CardImage
          source={{ uri: imagesUrl[0] }}
          resizeMode="contain"
        />
      </CarImageWrapper>
    </Container>
  );
}