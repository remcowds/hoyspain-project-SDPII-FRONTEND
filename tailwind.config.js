module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
      colors: {
        weboranje : '#EF6C00',
        webwit : '#FFFFFF',
        webgrijs : '#384A59',
        weblichtgrijs : '#B1b3b5', 
        webdonkerlichtgrijs : '#74828e', 
        weblichtoranje : '#FCEDE8',
        weblichtgroen : '#89AB30',
        webdonkergrijs: '#252628',
        webrood: '#D40C0C',

      },
    borderRadius: {
     'big': '40px',
     'very-big': '70px',
    },
    boxShadow: {
      super: '0 0 1px 5px #fff',
      smol: '0 0 1px 1px #fff',
    },
  },
    
  },
  variants: {
    extend: {
      display: ["group-hover"],
      boxShadow: ["hover"],
      rotate: ["hover"],
      borderRadius: ['hover', 'focus'],
      width: ['group-hover'],
      fontSize: ['group-hover'],
      scale: ['group-hover'],
      transform: ['group-hover'],
      opacity: ['disabled'],
      opacity: ['group-hover'],
    },
  },
  plugins: [],
}