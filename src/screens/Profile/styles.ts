import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import theme from '../../styles/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 227px;

  background-color: ${({ theme }) => theme.colors.header};

  padding: 0 24px;
  align-items: center;
`;

export const HeaderTop = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderTitle = styled.Text`

`;

export const LogoutButton = styled(BorderlessButton)`

`;

export const PhotoContainer = styled.View`

`;

export const Photo = styled.Image`

`;
