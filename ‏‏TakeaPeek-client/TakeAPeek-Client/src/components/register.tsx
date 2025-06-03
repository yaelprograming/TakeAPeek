import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container, 
  CircularProgress,
  FormHelperText,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../globalStates/store';
import { register } from '../globalStates/authSlice';
// Custom styled components
const LogoRing = styled(Box)(({ theme }) => ({
  width: 250,
  height: 250,
  border: `25px solid ${theme.palette.error.main}`,
  borderRadius: '50%',
  position: 'relative',
  margin: '0 auto 40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    Name: '',
    Email: '',
    Password: '',
    roleName: 'Editor'
  });

  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
    setFormError(null);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("State before submission:", newUser)
    if (!newUser.Name || !newUser.Email || !newUser.Password) {
      setFormError("יש למלא את כל השדות.");
      return;
    }

    try {
      const resultAction = await dispatch(register(newUser));
      console.log("Server response:", resultAction); // 🔍 Check what is sent
      if (register.fulfilled.match(resultAction)) {
        navigate("/");
      }
    } catch (err) {
      setFormError("שגיאה בהרשמה, אנא נסה שוב.");
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: '#070716', backgroundImage: 'radial-gradient(circle at center, #0c0c1d 0%, #070716 70%)', color: 'white', direction: 'rtl' }}>
      <Container maxWidth="sm">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
          <LogoRing>
            <Typography variant="h4" component="div" align="center" sx={{ position: 'absolute', width: '100%', fontWeight: 'bold', textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
              כיף שבאת<br />אורח.ת!
            </Typography>
          </LogoRing>
          <Typography variant="h4" component="h1" mb={4}>
            מוכנים להצטרף אלינו?
          </Typography>
          <Paper elevation={0} sx={{ width: '100%', bgcolor: 'transparent', p: 2 }}>
            <form onSubmit={handleRegister}>
              <TextField fullWidth name="Name" placeholder="שם מלא*" variant="outlined" margin="normal" value={newUser.Name} onChange={handleChange} sx={{ bgcolor: 'white', borderRadius: 1, mb: 2 }} error={!!formError} />
              <TextField fullWidth name="email" placeholder="אימייל*" variant="outlined" margin="normal" value={newUser.Email} onChange={handleChange} sx={{ bgcolor: 'white', borderRadius: 1, mb: 2 }} error={!!formError} />
              <TextField fullWidth name="password" type="password" placeholder="סיסמה*" variant="outlined" margin="normal" value={newUser.Password} onChange={handleChange} sx={{ bgcolor: 'white', borderRadius: 1, mb: 2 }}  />
              {(formError || error) && (
                <FormHelperText error sx={{ mb: 2 }}>
                  {formError || error}
                </FormHelperText>
              )}
              <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ bgcolor: '#ff0e63', py: 1.5, '&:hover': { bgcolor: '#d60b54' } }}>
                {loading ? <CircularProgress size={24} color="inherit" /> : 'הרשמה'}
              </Button>
            </form>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
