import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Button, 
   
  Typography, 

  Container, 
  CircularProgress,
  Paper,
  Grid,
  InputAdornment,
  styled,
  TextField
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { AppDispatch, RootState } from '../globalStates/store';
import { login } from '../globalStates/authSlice';

// Custom styled components
const primaryColor = '#001F4D'; // צבע כחול כהה
const pinkColor = '#FF4081'; // צבע ורוד לכפתור התחברות
const LogoRing = styled(Box)(({ theme }) => ({
    width: 200,
    height: 200,
    border: '20px solid white',
    borderRadius: '50%',
    position: 'relative',
    margin: '0 auto 30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));


  const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.5)',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
    '& .MuiInputBase-input': {
      color: 'white',
    },
    '& .MuiInputLabel-root': {
      color: 'white',
    },
    '& .MuiOutlinedInput-root:hover': {
      '& > fieldset': {
        borderColor: 'white',
      }
    },
    '& .MuiInputAdornment-root .MuiSvgIcon-root': {
      color: 'white',
    },
  });
  
  

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setErrorMessage(null);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!credentials.email || !credentials.password) {
      setErrorMessage("יש להזין אימייל וסיסמה.");
      return;
    }
  
    const resultAction = await dispatch(login(credentials));
  
    if (login.fulfilled.match(resultAction)) {
      navigate("/personal");
    } else if (login.rejected.match(resultAction)) {
      setErrorMessage(error || "שגיאה בהתחברות, אנא נסה שוב.");
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      direction: 'rtl' 
    }}>
      <Grid container sx={{ minHeight: '100vh' }}>
        <Grid item xs={12} md={6} sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          p: 4,
          bgcolor: primaryColor, // שינוי הרקע לכחול כהה
          color: 'white'
        }}>
          <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <LogoRing>
                <Typography variant="h5" component="div" align="center" sx={{ 
                  position: 'absolute', 
                  width: '100%', 
                  fontWeight: 'bold',
                  color: 'white' // שינוי צבע הטקסט ללבן
                }}>
                  כמה טוב<br />שבאת!
                </Typography>
              </LogoRing>
              
              <Typography variant="h4" component="h1" mb={4} sx={{ color: 'white' }}>
                התחברות לאזור האישי
              </Typography>
              
              <Paper elevation={0} sx={{ width: '100%', p: 2, bgcolor: 'transparent' }}>
                
                <form onSubmit={handleLogin}>
                  <StyledTextField 
                    fullWidth 
                    name="email" 
                    placeholder="אימייל*" 
                    variant="outlined" 
                    margin="normal" 
                    value={credentials.email}    
                    onChange={handleChange} 
                    sx={{ mb: 2 }} 
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: 'white' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  <StyledTextField 
                    fullWidth  
                    name="password" 
                    type="password"  
                    placeholder="סיסמה*"  
                    variant="outlined" 
                    margin="normal"  
                    value={credentials.password} 
                    onChange={handleChange}  
                    sx={{ mb: 3 }} 
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: 'white' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  <Button  
                    type="submit" 
                    fullWidth 
                    variant="contained" 
                    disabled={loading} 
                    sx={{   
                      bgcolor: pinkColor, // שינוי צבע הכפתור לורוד
                      py: 1.5, 
                      '&:hover': { 
                        bgcolor: '#E03070' // ורוד כהה יותר בhover
                      } 
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'התחברות'}
                  </Button>
                </form>
              </Paper>
            </Box>
          </Container>
        </Grid>

        {/* התמונה בחצי השני של העמוד */}
        <Grid item xs={12} md={6} sx={{
          backgroundImage: 'url(/d.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}></Grid>
      </Grid>
    </Box>
  );
};

export default Login;



