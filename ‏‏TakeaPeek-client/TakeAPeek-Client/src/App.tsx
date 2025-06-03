
import { RouterProvider } from 'react-router-dom'
import './App.css'
import Router from './Router'
import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import store from './globalStates/store';
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from './components/AuthContext';

export const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: '#0c678d', 
  //   },
  //   secondary: {
  //     main: '#0d818f', 
  //   },
  // },
    // direction: "rtl",
    palette: {
      primary: {
        main: "#0d818f",
        light: "#5EEAD4",
        dark: "#0c678d",
      },
      secondary: {
        main: "#0aa997",
        light: "#67E8F9",
        dark: "#0891B2",
      },
      background: {
        default: "#f8fafc",
        paper: "#ffffff",
      },
    },
    typography: {
      fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 12,
              "&:hover fieldset": { borderColor: "#0d818f" },
              "&.Mui-focused fieldset": { borderColor: "#0d818f" },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: "none",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: { borderRadius: 16 },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { borderRadius: 16 },
        },
      },
    },
  })


/*
primary: 
secondary:
... #0aa997
*/ 

const App:React.FC = () => {

  // return (
  //   <>
  //   <ThemeProvider theme={theme}>
  //     <Provider store={store}>
  //       <RouterProvider router={Router} />
  //     </Provider>
  //   </ThemeProvider>

  // </> 
  // )
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
      // sx={{ direction: "rtl" }}
      >
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {
            <AuthProvider>
              <Provider store={store}>
                <RouterProvider router={Router} />
              </Provider>
            </AuthProvider>
          }
        </SnackbarProvider>
      </Box>
    </ThemeProvider>
  )
}

export default App
