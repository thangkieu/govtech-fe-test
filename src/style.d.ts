// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      border: string;
      bg: string;
      link: string;
      disabled: string;
    };
  }
}
