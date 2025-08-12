import { Roboto } from 'next/font/google'
import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'light', // 'dark' mode is also an option if you want a dark theme
    background: {
        default: '#FF8570'
    },
    primary: {
      main: '#015850',
    },
    secondary: {
      main: '#656565',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
})

export default theme
