/*
 * @Author: chen qi
 * @Date: 2022-09-18 18:07:13
 * @LastEditors: chen qi
 * @LastEditTime: 2023-03-21 09:42:29
 * @Description: ~
 */
/** @type {import('tailwindcss').Config} */
import plugin from 'windicss/plugin'
const themeColor = 'red'
module.exports = {
  plugins: [
    createEnterPlugin(),
    plugin(({ addUtilities }) => {
      const center = {
        '.flex-center': {
          'display': 'flex',
          'flex': '1',
          'justify-content': 'center',
          'align-items': 'center',
        },
        '.center': {
          'display': 'flex',
          'justify-content': 'center',
          'align-items': 'center',
        },
      }
      addUtilities(center)
    }),
  ],
  content: [
    // Example content paths...
    './public/**/*.html',
    './examples/**/*.{js,jsx,ts,tsx,vue}',
    './packages/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    // 自定义
    // colors: {
    //   // cqColor: 'pink'
    // },

    // 原有属性覆盖
    extend: {
      zIndex: {
        '-1': '-1',
      },
      backgroundImage: {
        'user-bg': 'url(\'/src/assets/images/userBg.png\')',
        'temp-bg': 'url(\'/src/assets/images/temp-bg.png\')',
      },
      backgroundSize: {
        'auto-100%': 'auto 100%',
      },
      colors: {
        primary: themeColor,
      },
      screens: {
        // 手机
        'sm': '576px',
        'md': '768px',
        // 平板
        'lg': '992px',
        'xl': '1200px',
        '2xl': '1600px',
      },
    },
  },
}

/**
 * Used for animation when the element is displayed.
 * @param maxOutput The larger the maxOutput output, the larger the generated css volume.
 */
function createEnterPlugin(maxOutput = 6) {
  const createCss = (index: number, d = 'x') => {
    const upd = d.toUpperCase()
    return {
      [`*> .enter-${d}:nth-child(${index})`]: {
        transform: `translate${upd}(50px)`,
      },
      [`*> .-enter-${d}:nth-child(${index})`]: {
        transform: `translate${upd}(-50px)`,
      },
      [`* > .enter-${d}:nth-child(${index}),* > .-enter-${d}:nth-child(${index})`]: {
        'z-index': `${10 - index}`,
        'opacity': '0',
        'animation': `enter-${d}-animation 0.4s ease-in-out 0.3s`,
        'animation-fill-mode': 'forwards',
        'animation-delay': `${(index * 1) / 10}s`,
      },
    }
  }
  const handler = ({ addBase }) => {
    const addRawCss = {}
    for (let index = 1; index < maxOutput; index++) {
      Object.assign(addRawCss, {
        ...createCss(index, 'x'),
        ...createCss(index, 'y'),
      })
    }
    addBase({
      ...addRawCss,
      '@keyframes enter-x-animation': {
        to: {
          opacity: '1',
          transform: 'translateX(0)',
        },
      },
      '@keyframes enter-y-animation': {
        to: {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
    })
  }
  return { handler }
}
