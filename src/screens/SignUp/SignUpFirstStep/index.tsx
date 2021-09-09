import React from 'react';
import { useNavigation } from '@react-navigation/core';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';
import { Bullet } from '../../../components/Bullet';
import { BackButton } from '../../../components/BackButton';

export function SignUpFirstStep() {

  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }
  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
        <Steps>
          <Bullet active />
          <Bullet />
        </Steps>
      </Header>

      <Title>
        Crie sua{'\n'}conta
      </Title>
      <SubTitle>
        Faça seu cadastro de {'\n'}
        forma rápida e fácil.
      </SubTitle>

      <Form>
        <FormTitle>1. Passo</FormTitle>

      </Form>
    </Container>
  );
}