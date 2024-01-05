module.exports = {
  content: [
    './app/**/*.html',
    './app/components/**/*.js',
    './app/containers/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        robotocondesed: ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-color-1':
          'var(--new-gradient-color-1, linear-gradient(90deg, #7620F3 0%, #270655 100%))',
        'gradient-color-2':
          'var(--new-gradient-color-2, linear-gradient(90deg, #E7A024 0.11%, #F0CC2E 99.85%))',
        'gradient-color-3':
          'var(--new-gradient-color-3, linear-gradient(90deg, rgba(0, 104, 139, 0.15) 0%, rgba(2, 203, 219, 0.15) 100%))',
        'gradient-color-4':
          'var(--new-gradient-color-4, linear-gradient(90deg, #00688B 0%, #02CBDB 100%))',
        'gradient-color-5':
          'var(--new-gradient-color-5, linear-gradient(180deg, rgba(39, 6, 85, 0.80) 0%, rgba(118, 32, 243, 0.81) 100%)',
      },
      fontSize: {
        10: '10px',
        12: '12px',
        14: '14px',
        15: '15px',
        16: '16px',
        18: '18px',
        20: '20px',
        22: '22px',
        24: '24px',
        26: '26px',
        36: '36px',
        46: '46px',
        76: '76px',
      },
      colors: {
        primary: {
          100: '#081420',
          200: '#192431',
          300: '#6D5AE6',
          400: '#1BCE93',
          500: '#FFFFFF',
          600: '#ffffff14',
          700: '#F9B223',
          800: '#ECECEC',
          900: '#B1B1B5',
          1000: '#70798B',
          1100: '#2B3541',
        },
        gray: {
          900: '#3D3D3D',
        },
        maroon: '#C6224E',
        blue: '#7620F3',
        green: '#098224',
        bluewhalelight: '#006E8F',
        lightgray: '#999999',
        yellow: '#FEAE04',
        astronautblue: '#0f425e',
        mutedblue: '#37779c',
        gainsboro: '#dadedf',
        lightgreen: 'rgba(217, 217, 217, 0.20)',
        stormdust: '#626262',
        deeppink: '#F82E2E',
        dark: '#1E2029',
        lightestgray: '#E6E7EB',
        tealishblue: '#969CCB',
        riverbed: '#3F4765',
        darkjunglegreen: '#222222',
      },
      borderRadius: {
        20: '20px',
      },
    },
    screens: {
      sm: '	640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
};
