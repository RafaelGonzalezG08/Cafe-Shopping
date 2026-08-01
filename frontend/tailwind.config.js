/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Negro-ciruela profundo (vitrina de joyeria, tono rosado elegante en
        // vez de negro carbon puro — antes "espresso" cafetero)
        espresso: {
          950: '#170B12',
          900: '#22101A',
          800: '#34172A',
          700: '#4A2438',
        },
        // Blanco perla con fondo rosa palido (antes "porcelain" marfil/cafe)
        porcelain: {
          50: '#FFFFFF',
          100: '#FBF2F1',
          200: '#F3E0E1',
          300: '#E6C7C9',
        },
        // Oro rosa / rose gold — acento principal (antes cobre/oro de cafeteria)
        copper: {
          50: '#FBEDEB',
          100: '#F4D2CD',
          400: '#C97B79',
          500: '#B75D66',
          600: '#96434C',
          700: '#723038',
        },
        // Esmeralda (exito / saldado) — se mantiene distinto del rosa a proposito,
        // para que "pagado"/"positivo" siga leyendose claro entre tanto tono rosa
        sage: {
          100: '#D2ECDD',
          500: '#0E8A5F',
          600: '#0A6B49',
          700: '#075136',
        },
        // Vino / borgoña (alertas, deuda) — mas profundo que un rosa para
        // distinguirse del acento principal
        brick: {
          100: '#F3D8DC',
          500: '#A32347',
          600: '#841C3A',
          700: '#63152C',
        },
        // Rosa cuarzo — acento secundario, protagonista del tema (badges,
        // estados intermedios, detalles). Rosa elegante, no rosa chicle.
        rose: {
          100: '#F8DCE6',
          400: '#DE84A4',
          500: '#C15C84',
          600: '#9C4468',
        },
        ink: '#241019',
        muted: '#93767C',
      },
      boxShadow: {
        ticket: '0 1px 0 rgba(42,33,24,0.04), 0 8px 24px -12px rgba(42,33,24,0.18)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};
