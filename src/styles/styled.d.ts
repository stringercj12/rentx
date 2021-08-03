import 'styled-components';
import theme from './theme';

declare module 'styled-components' {
  type ThemeType = typeof Theme;

  export interface DefaultTheme extends ThemeType { }
}