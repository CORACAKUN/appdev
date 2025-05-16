// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-moving': 'linear-gradient(-45deg, #ff6ec4, #7873f5, #4ade80, #facc15)',
      },
      animation: {
        'bg-pan': 'bgPan 15s ease infinite',
      },
      keyframes: {
        bgPan: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
};
