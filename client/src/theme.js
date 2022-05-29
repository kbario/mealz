import { extendTheme } from '@chakra-ui/react';

const config = {
  useSystemColourMode: true,
};

const colors = {
  brand: {
    dark: '#27272A',
    blue: '#0369A1',
    orange: '#FED7AA',
    light: '#F4F4F5',
  },
};

const components = {
  Button: {
    variants: {
      fillBtn: {
        bg: 'brand.blue',
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
        color: 'brand.blue',
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
};

const theme = extendTheme({ config, colors, components });

export default theme;
