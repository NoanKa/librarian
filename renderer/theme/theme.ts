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
      primary: "#000000",
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
        outlined: ({ theme }) => ({
          color: theme.palette.primary.main,
          transition: "background-color 0.3s ease, color 0.3s ease",

          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            border: `1px solid ${theme.palette.primary.main} !important`,
          },
        }),
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
          color: "#015850",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "1px solid rgba(1, 88, 80, 0.40)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "1px solid rgba(1, 88, 80, 0.40)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid rgba(1, 88, 80, 0.40)",
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            border: "1px solid rgba(1, 88, 80, 0.40)",
          },
          "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
            border: "1px solid rgba(1, 88, 80, 0.40)",
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          tableLayout: "auto",
          minWidth: "500px",
          overflowX: "visible",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(1, 88, 80, 0.4)",
        },
        stickyHeader: {
          backgroundColor: "#ffffff",
          color: "#015850",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "transparent",
          },
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
