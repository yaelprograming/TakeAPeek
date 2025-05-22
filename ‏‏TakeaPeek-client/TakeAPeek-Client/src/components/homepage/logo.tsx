import React from 'react';
import yourLogo from './your-logo.png'; // Import your logo image
import { SxProps, Theme } from '@mui/material/styles';

interface LogoProps {
  sx?: SxProps<Theme>;
}

function Logo({ sx }: LogoProps) {
  return <img src="img/TakeAPeekLogo.png" alt="Logo" style={sx} />;
}

export default Logo;
