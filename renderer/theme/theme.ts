import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "light", // 'dark' mode is also an option if you want a dark theme
    background: {
      default: "#FF8570",
    },
    primary: {
      main: "#015850",
    },
    text: {
      primary: "#015850",
    },
    secondary: {
      main: "#656565",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
        },
        containedPrimary: {
          backgroundColor: "#015850",
        },
        containedSecondary: {
          backgroundColor: "#656565",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover': {
            borderColor: "rgba(1, 88, 80, 0.4)"
          },
          '&.Mui-focused': {
            borderColor: "#015850",
            boxShadow: 'none'
          }
        },
        input: {
          "&:-webkit-autofill": {
            WebkitTextFillColor: "inherit",
            border: "1px solid rgba(1, 88, 80, 0.4)",
            color: "#015850",
            '&:hover': {
            borderColor: "rgba(1, 88, 80, 0.4)"
          }
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(1, 88, 80, 0.4)",
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "#015850",
          "&.Mui-selected": {
            backgroundColor: "#015850 !important",
            color: "#FFFFFF !important",
          },
        },
      },
    },
  },
});

export default theme;
