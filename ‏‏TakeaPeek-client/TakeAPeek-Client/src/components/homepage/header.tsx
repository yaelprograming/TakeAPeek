// import React, { useState } from "react";
// import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar, Box } from "@mui/material";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { useNavigate } from "react-router-dom";

// const Header: React.FC = () => {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const navigate = useNavigate();
//   const token = document.cookie.split("; ").find(row => row.startsWith("authToken="))?.split("=")[1];
//   const isAuthenticated = Boolean(token);
  
//   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleNavigation = (path: string) => {
//     handleMenuClose();
//     navigate(path);
//   };

//   return (
//     <AppBar position="sticky" sx={{ backgroundColor: "#333" }}>
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//         {/* לוגו */}
//         <Typography
//           variant="h6"
//           sx={{ fontWeight: "bold", cursor: "pointer" }}
//           onClick={() => navigate("/")}
//         >
//           Take a Peek
//         </Typography>

//         {/* תפריט משתמש */}
//         <Box>
//           <IconButton onClick={handleMenuOpen} color="inherit">
//             {isAuthenticated ? <Avatar sx={{ width: 32, height: 32 }} /> : <AccountCircleIcon />}
//           </IconButton>
//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleMenuClose}
//           >
//             {isAuthenticated ? (
//               <>
//                 <MenuItem onClick={() => handleNavigation("/profile")}>הפרופיל שלי</MenuItem>
//                 <MenuItem onClick={() => handleNavigation("/settings")}>הגדרות</MenuItem>
//                 <MenuItem onClick={() => handleNavigation("/logout")}>התנתקות</MenuItem>
//               </>
//             ) : (
//               <MenuItem onClick={() => handleNavigation("/login")}>התחברות</MenuItem>
//             )}
//           </Menu>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;
{/* <Link to='/home'><img style={{ width: 50, top: 20, right: 40, position: 'absolute' , zIndex: 2}} src="img/logo.png" alt="logo" /></Link> */}

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