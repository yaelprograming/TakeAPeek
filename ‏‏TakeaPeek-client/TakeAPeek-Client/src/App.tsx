
import { RouterProvider } from 'react-router-dom'
import './App.css'
import Router from './Router'
import { createTheme, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import store from './globalStates/store';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0c678d', 
    },
    secondary: {
      main: '#0d818f', 
    },
  },
});

/*
primary: 
secondary:
... #0aa997
*/ 

function App() {

  return (
    <>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={Router} />
      </Provider>
    </ThemeProvider>

  </> 
  )
}

export default App
