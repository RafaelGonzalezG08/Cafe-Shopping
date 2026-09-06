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
        // Negro-ciruela profundo, para scrims de modales y detalles.
        espresso: {
          950: '#170B12',
          900: '#22101A',
          800: '#34172A',
          700: '#4A2438',
        },
        // Fondo neumorfico: un rosa casi-blanco. El MISMO tono es el fondo de
        // la pagina y el de las tarjetas; el relieve lo hacen las sombras
        // (shadow-neu / shadow-neu-inset), no los bordes. 50 = blanco puro para
        // los pocos sitios que aun lo piden.
        porcelain: {
          50: '#FFFFFF',
          100: '#F3E8EB',
          200: '#EBDBDF',
          300: '#E3CED4',
        },
        // Acento principal: la paleta rosa que pidio el cliente
        // (#e57d90 … #ffcdd4). copper.500 es el acento; 600/700 son derivados
        // mas profundos para texto y hover.
        copper: {
          50: '#FFECEF',
          100: '#FFCDD4',
          200: '#FDB4BF',
          300: '#F99AAA',
          400: '#F1889B',
          500: '#E57D90',
          600: '#C85F74',
          700: '#A6485C',
        },
        // Esmeralda (exito / saldado) — distinto del rosa a proposito, para que
        // "pagado"/"positivo" se lea claro entre tanto tono rosa.
        sage: {
          100: '#D2ECDD',
          500: '#0E8A5F',
          600: '#0A6B49',
          700: '#075136',
        },
        // Vino / borgona (alertas, deuda) — mas profundo y menos saturado que
        // el acento, para no confundirse con el.
        brick: {
          100: '#F3D8DC',
          500: '#A32347',
          600: '#841C3A',
          700: '#63152C',
        },
        // Rosa cuarzo — acento secundario (badges, estados intermedios).
        rose: {
          100: '#F8DCE6',
          400: '#DE84A4',
          500: '#C15C84',
          600: '#9C4468',
        },
        ink: '#33232A',
        muted: '#9A828A',
      },
      boxShadow: {
        // Relieve neumorfico: la luz cae arriba-izquierda, la sombra abajo-
        // derecha, ambas del color del fondo (rosa-gris / blanco).
        neu: '6px 6px 14px #D8C4CB, -6px -6px 14px #FFFFFF',
        'neu-sm': '4px 4px 10px #D8C4CB, -4px -4px 10px #FFFFFF',
        'neu-inset': 'inset 3px 3px 7px #D8C4CB, inset -3px -3px 7px #FFFFFF',
        'neu-pressed': 'inset 2px 2px 5px #D8C4CB, inset -2px -2px 5px #FFFFFF',
        // Antes era la sombra de "recibo"; ahora comparte el lenguaje neumorfico.
        ticket: '5px 5px 12px #D8C4CB, -5px -5px 12px #FFFFFF',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};
