

import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import AccountMenu from "../auth/accountMenu";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1201, // מבטיח שהכותרת תהיה מעל לשאר התוכן
        backgroundColor: "white", // צבע הרקע של ה-header
        boxShadow: 3, // קצת צל עבור ה-header
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* לוגו בצד שמאל */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography variant="h6" sx={{ color: "black", fontWeight: "bold" }}>
            Take a Peek
          </Typography>
        </Link>
        {/* AccountMenu בצד ימין */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AccountMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;