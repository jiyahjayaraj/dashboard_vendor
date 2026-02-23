import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { Box, Button, Card, IconButton, InputAdornment, Stack, Typography, Divider } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import FormikTextField from 'ui-component/common/loginInput';
import { userLogin } from 'container/LoginContainer/slice';

import logo from 'assets/images/logo.png';
const AppVersion = import.meta.env.VITE_APP_VERSION;

const AuthLogin = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = Yup.object({
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    ['user_id', 'full_name', 'sid', 'user_image'].forEach((cookie) => Cookies.remove(cookie));
  }, []);

  useEffect(() => {
    if (props.failAction?.statusText) {
      setLoginError(props.failAction.statusText);
      const timeout = setTimeout(() => setLoginError(''), 3000);
      return () => clearTimeout(timeout);
    }
  }, [props.failAction]);

  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'radial-gradient(circle at top, #000000, #0b0f14)',
      px: 2
    }}
  >
    <Card
      sx={{
        width: { xs: '100%', sm: '400px', md: '450px' },
        p: { xs: 3, sm: 4 },
        borderRadius: 3,
        backgroundColor: '#000000',
        boxShadow: '0px 0px 15px #ff7a18',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >

      <Box sx={{ mb: 3 }}>
        <Box
          component="img"
          src={logo}
          alt="Eventora"
          sx={{ height: { xs: 40, sm: 60 } }}
        />
      </Box>

      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          textAlign: 'center',
          color: 'text.primary',
          mb: 1
        }}
      >
        Welcome Back
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mb: 3,
          textAlign: 'center',
          color: 'text.secondary'
        }}
      >
        Login to manage your events
      </Typography>


      <Formik
        initialValues={{ client_id: 'webapp', client_secret: 'saqw21!@', email: '', password: '' }}
        validationSchema={validate}
        onSubmit={(values) => dispatch(userLogin({ ...values, navigate }))}
      >
        {() => (
          <Form style={{ width: '100%' }}>
            <Stack spacing={2}>
              <FormikTextField
                name="email"
                label="Email Address"
                type="text"
                fullWidth
              />

              <FormikTextField
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                        sx={{ color: '#ff7a18' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 1,
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: 16,
                  color: '#000',
                  backgroundColor: '#ff7a18',
                  borderRadius: 2,
                  border: '1px solid #ff7a18',
                  boxShadow: '0px 6px 16px rgba(255, 122, 24, 0.35)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#ff7a18',
                    border: '1px solid #ff7a18',
                    boxShadow: '0px 8px 20px rgba(255, 122, 24, 0.45)'
                  }
                }}
              >
                Login
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>

      {/* ERROR */}
      {loginError && (
        <Typography color="error" sx={{ mt: 2 }}>
          {loginError}
        </Typography>
      )}

      <Divider sx={{ my: 3, width: '100%', borderColor: 'divider' }} />

      {/* FOOTER */}
      <Typography
        variant="caption"
        sx={{ textAlign: 'center', color: 'text.secondary' }}
      >
        Designed & Developed by Eventora
      </Typography>

      <Typography
        sx={{ mt: 0.5, fontSize: 12, color: '#ff7a18' }}
      >
        Version : {AppVersion}
      </Typography>
    </Card>
  </Box>
);

};

export default AuthLogin;
