import { extendTheme } from '@chakra-ui/react';

const config = {
  useSystemColourMode: true,
};

const colors = {
  brand: {
    dark: '#27272A',
    green: '#56A938',
    orange: '#FED7AA',
    light: '#F4F4F5',
  },
};

const components = {
  Button: {
    variants: {
      fillBtn: {
        bg: 'brand.green',
        textColor: 'white',
      },
      outlineBtn: {
        bg: 'brand.light',
      },
    },
  },
  Heading: {
    variants: {
      RecipeCard: {
        fontSize: 'xl',
      },
      lightHeading: {
        color: 'brand.green',
      },
      cardcardHeading: {
        fontSize: 'lg',
        color: 'brand.blue',
      },
    },
  },
  Tag: {
    variants: {
      'recipe-card': {
        boxShadow: '0 0 2px 2px #efdfde',
        bg: 'brand.blue',
      },
    },
  },
  Text: {
    variants: {
      navlink: {
        fontSize: 'xl',
        fontWeight: 'thin',
        cursor: 'pointer',
      },
      navlinkActive: {
        fontSize: 'xl',
        fontWeight: 'normal',
        borderBottom: '1px black solid',
      },
    },
  },
};

const theme = extendTheme({ config, colors, components });

export default theme;
