import { SxProps, Theme } from '@mui/material/styles';

interface LogoProps {
  sx?: SxProps<Theme>;
}

import { Box } from '@mui/material';

function Logo({ sx }: LogoProps) {
  console.log("Rendering Logo");
  return (
    <Box component="img" src="img/logo.png" alt="Logo" sx={sx} />
  );
}

export default Logo;
