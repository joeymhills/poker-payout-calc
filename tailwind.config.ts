import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {

    colors: {
      'monza': {
          '50': '#fff0f0',
          '100': '#ffe2e3',
          '200': '#ffcace',
          '300': '#ff9ea7',
          '400': '#ff6779',
          '500': '#ff324f',
          '600': '#ef0f38',
          '700': '#cf0630',
          '800': '#a9082f',
          '900': '#900b2f',
          '950': '#510014',
      },

    },
    extend: {
      fontFamily: {
        primary: "poker",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
