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
        // Negro carbon / vitrina de joyeria (antes tonos cafe "espresso")
        espresso: {
          950: '#050506',
          900: '#0D0C10',
          800: '#18161C',
          700: '#2A2530',
        },
        // Marfil / perla (antes "porcelain")
        porcelain: {
          50: '#FFFFFF',
          100: '#FAF8F3',
          200: '#EFE8DA',
          300: '#E1D6BF',
        },
        // Oro / laton (antes tonos cobre) — mas saturado que el original
        copper: {
          50: '#FBF2DC',
          100: '#EFD98A',
          400: '#D9A81A',
          500: '#C4900D',
          600: '#9C7208',
          700: '#785705',
        },
        // Esmeralda (exito / saldado) — mas saturado que el original
        sage: {
          100: '#D2ECDD',
          500: '#0E8A5F',
          600: '#0A6B49',
          700: '#075136',
        },
        // Rubi (alertas / deuda) — mas saturado que el original
        brick: {
          100: '#F8DCE1',
          500: '#C21F42',
          600: '#9C1834',
          700: '#771228',
        },
        // Rosa cuarzo, tono suave para variar el acento (uso puntual: estado
        // "con abonos" en Cobros, algun detalle secundario). A proposito
        // mas apagado/mauve que un rosa chicle, para que combine con el
        // negro/oro sin que el conjunto se sienta demasiado femenino.
        rose: {
          100: '#F5DEE6',
          400: '#D0728F',
          500: '#BC4E71',
          600: '#96395A',
        },
        ink: '#15120D',
        muted: '#8A8172',
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
