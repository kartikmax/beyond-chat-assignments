import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#eeeee",
    },
    secondary: {
      main: "#3390ec",
    },
    tertiary: {
      main: "#eab68e",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#212121",
    },
    secondary: {
      main: "#8774e1",
    },
    tertiary: {
      main: "#eee",
    },
  },
});

export { lightTheme, darkTheme };
