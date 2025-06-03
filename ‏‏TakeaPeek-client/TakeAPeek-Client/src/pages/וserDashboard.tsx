// import React, { useState } from "react";
// import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, Typography, IconButton, AppBar, Toolbar, Button, Tooltip } from "@mui/material";
// import { Home, Person, Folder, Share, ExitToApp, Image, Menu } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { theme } from "../App";

// const menuItems = [
//   { text: "פרויקטים שלי", icon: <Folder />, path: "/projects" },
//   { text: "שיתופים שלי", icon: <Share />, path: "/shares" },
//   { text: "פרטים שלי", icon: <Person />, path: "/profile" },
//   { text: "דף הבית", icon: <Home />, path: "/" },
//   { text: "התנתק", icon: <ExitToApp />, path: "/logout" },
// ];

// const UserDashboard = () => {
//   const [open, setOpen] = useState(true);
//   const navigate = useNavigate();

//   return (
//     <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f4f4f4" }}>
//       {/* Sidebar בצד ימין */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: open ? 240 : 60,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: open ? 240 : 60,
//             transition: "width 0.3s ease-in-out",
//             overflowX: "hidden",
//             backgroundColor: "#f0f0f0", // צבע רקע אפור בהיר
//             color: "black", // צבע טקסט שחור
//             position: "relative", // חשיבות לסגירה ופתיחה של ה-sidebar
//           },
//         }}
//       >
//         <Toolbar>
//           <IconButton onClick={() => setOpen(!open)} sx={{ color: "#000" }}>
//             <Menu />
//           </IconButton>
//         </Toolbar>

//         {/* כפתור גלריה מבודל */}
//         <List>
//           <ListItemButton
//             onClick={() => navigate("/gallery")}
//             sx={{
//               margin:5,
//               borderRadius: 3,
//               textAlign: "center",
//               fontWeight: "bold",
//               backgroundColor: theme.palette.primary.main, // צבע ראשי
//               '&:hover': {
//                 backgroundColor: theme.palette.primary.dark, // אפקט hover
//               },
//               marginBottom: 20, // רווח בין כפתור הגלריה לשאר הכפתורים
//             }}
//           >
//             <ListItemIcon sx={{ color: "white" }}>
//               <Image />
//             </ListItemIcon>
//             {open && <ListItemText primary="גלריה" sx={{ color: "white" }} />}
//           </ListItemButton>

//           {/* שאר הכפתורים צמודים לתחתית */}
//           <Box sx={{ marginTop: "auto" }}>
//             {menuItems.map((item, index) => (
//               <Tooltip key={index} title={open ? "" : item.text} placement="right">
//                 <ListItemButton
//                   onClick={() => navigate(item.path)}
//                   sx={{
//                     '&:hover': {
//                       backgroundColor: theme.palette.primary.main, // אפקט hover
//                       color: "white",
//                       boxShadow: '0 4px 12px rgba(0,0,0,0.2)', // הוספת צל
//                       transform: 'scale(1.05)', // הגדלת הכפתור
//                     },
//                     margin: 1,
//                     borderRadius: 3, // עיצוב כפתורים מעוגל
//                     padding: "10px 20px", // ריווח יותר רחב בכפתורים
//                     fontSize: "14px",
//                     transition: 'all 0.3s ease', // אנימציה חלקה של כל השינויים
//                     // גודל גופן קטן
//                   }}
//                 >
//                   <ListItemIcon sx={{ color: "black" }}>{item.icon}</ListItemIcon>
//                   {open && <ListItemText primary={item.text} />}
//                 </ListItemButton>
//               </Tooltip>
//             ))}
//           </Box>
//         </List>
//       </Drawer>

//       {/* Main Content */}
//       <Box sx={{ flexGrow: 1, p: 3, textAlign: "center" }}>
//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
//           <Box sx={{ mt: 5 }}>
//             <Typography variant="h4" sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
//               ברוכים הבאים ל-Take a Peek
//             </Typography>
//             <motion.img src="/logo.png" alt="logo" style={{ width: 150, marginTop: 20 }}
//               initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} />
//                           <Button color="inherit" onClick={() => navigate("/")}>דף הבית</Button>
//           </Box>
//         </motion.div>
//       </Box>
//     </Box>
//   );
// };

// import React, { useState } from 'react';
// import {
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Typography,
//   Button,
//   Divider,
//   Link,
//   styled,
//   IconButton,
//   SxProps,
//   Theme,
// } from '@mui/material';
// import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
// import FolderIcon from '@mui/icons-material/Folder';
// import ShareIcon from '@mui/icons-material/Share';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import HomeIcon from '@mui/icons-material/Home';
// import LogoutIcon from '@mui/icons-material/Logout';
// import MenuIcon from '@mui/icons-material/Menu';
// import Logo from '../components/homepage/logo';

// // Styled Components for enhanced styling
// const StyledDrawer = styled(Drawer)(({ theme }) => ({
//   width: (props: { collapsed: boolean }) => props.collapsed ? 60 : 240,
//   flexShrink: 0,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   '& .MuiDrawer-paper': {
//     width: (props: { collapsed: boolean }) => props.collapsed ? 60 : 240,
//     boxSizing: 'border-box',
//     backgroundColor: theme.palette.grey[100],
//     borderRight: `1px solid ${theme.palette.divider}`,
//     overflowX: 'hidden',
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
// }));

// const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
//   borderRadius: '8px',
//   margin: theme.spacing(0.5),
//   transition: 'background 0.3s ease, transform 0.2s ease',
//   '&:hover': {
//     background: theme.palette.primary.light,
//     transform: 'scale(1.05)',
//   },
// }));

// const StyledGalleryButton = styled(Button)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.main,
//   color: theme.palette.common.white,
//   margin: theme.spacing(2),
//   transition: 'background 0.3s ease, transform 0.2s ease',
//   '&:hover': {
//     backgroundColor: theme.palette.primary.dark,
//     transform: 'scale(1.05)',
//   },
//   borderRadius: '12px',
// }));

// interface SidebarProps {
//   onLogout: () => void;
// }

// function Sidebar({ onLogout }: SidebarProps) {
//   const [collapsed, setCollapsed] = useState(false);

//   const toggleSidebar = () => {
//     setCollapsed(!collapsed);
//   };

//   return (
//     <StyledDrawer variant="permanent" anchor="right" collapsed={collapsed}>
//       <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', marginTop: '64px' }}>
//         <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end'}}>
//           <IconButton onClick={toggleSidebar}>
//             <MenuIcon />
//           </IconButton>
//         </Box>
//         <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
//           <StyledGalleryButton
//             variant="contained"
//             startIcon={<PhotoLibraryIcon />}
//             fullWidth
//           >
//             {collapsed ? <PhotoLibraryIcon/> : "Gallery"}
//           </StyledGalleryButton>
//         </Box>

//         <Divider />

//         <List sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingBottom: '20px' }}>
//           <StyledListItemButton>
//             <ListItemIcon>{collapsed ? <FolderIcon/> : <FolderIcon />}</ListItemIcon>
//             {!collapsed && <ListItemText primary="My projects" />}
//           </StyledListItemButton>

//           <StyledListItemButton>
//             <ListItemIcon>{collapsed ? <ShareIcon/> : <ShareIcon />}</ListItemIcon>
//             {!collapsed && <ListItemText primary="My shares" />}
//           </StyledListItemButton>

//           <StyledListItemButton>
//             <ListItemIcon>{collapsed ? <AccountCircleIcon/> : <AccountCircleIcon />}</ListItemIcon>
//             {!collapsed && <ListItemText primary="My details" />}
//           </StyledListItemButton>

//           <StyledListItemButton>
//             <ListItemIcon>{collapsed ? <HomeIcon/> : <HomeIcon />}</ListItemIcon>
//             {!collapsed && <ListItemText primary="Home page" />}
//           </StyledListItemButton>

//           <StyledListItemButton onClick={onLogout}>
//             <ListItemIcon>{collapsed ? <LogoutIcon/> : <LogoutIcon />}</ListItemIcon>
//             {!collapsed && <ListItemText primary="Log out" />}
//           </StyledListItemButton>
//         </List>

//       </Box>
//     </StyledDrawer>
//   );
// }

// function MainContent() {
//   const logoSx: SxProps<Theme> = { my: 4, width: 150, height: 150 };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100vh',
//         textAlign: 'center',
//       }}
//     >
//       <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main' }}>
//         Welcome to Take A Peek
//       </Typography>
//       <Logo sx={logoSx} />
//       <Link href="/" variant="body2" sx={{ color: 'primary.dark' }}>
//         Go to Home Page
//       </Link>
//     </Box>
//   );
// }

// function UserDashboard() {
//   const handleLogout = () => {
//     console.log('Logged out');
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <MainContent />
//       <Sidebar onLogout={handleLogout} />
//     </Box>
//   );
// }


import  { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Link,
  styled,
  IconButton,
  SxProps,
  Theme,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import ShareIcon from '@mui/icons-material/Share';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../components/homepage/logo'; // Corrected logo import path
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Styled Components for enhanced styling
const StyledDrawer = styled(Drawer)<{ collapsed: boolean }>(({ theme, collapsed }) => ({
  width: collapsed ? 60 : 240,
  flexShrink: 0,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  '& .MuiDrawer-paper': {
    width: collapsed ? 60 : 240,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.grey[100],
    borderRight: `1px solid ${theme.palette.divider}`,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}))


const StyledListItemButton = styled(ListItemButton)(() => ({
 // borderRadius: '8px', // Rounded corners
  //margin: theme.spacing(0.5), // Spacing between buttons
  transition: 'color 0.3s ease', // Transition for font color changes
  '&:hover': {
    color: '#009688', // Change font color on hover to primary color
  },
  direction: 'rtl', // Right-to-left layout
}));

const StyledBalanceButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#009688', // Green background color
  color: theme.palette.common.white, // White font color
  marginBottom: theme.spacing(2), // Spacing around the button
  transition: 'color 0.3s ease', // Transition for font color changes
  '&:hover': {
    color:'#009688',
  backgroundColor: theme.palette.common.white, // Green background color
  // Change font color on hover to primary light color
  },
  borderRadius: '20px', // Rounded corners
  direction: 'rtl', // Right-to-left layout
}));

interface SidebarProps {
  onLogout: () => void;
}

function Sidebar({ onLogout }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navigateToGallery = () => {
    navigate('/gallery'); // Navigate to /gallery route
  };

  return (
    <StyledDrawer variant="permanent" anchor="right" collapsed={collapsed}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', marginTop: '64px' }}>
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
          <StyledBalanceButton variant="contained" fullWidth onClick={navigateToGallery}>
            לגלריה
          </StyledBalanceButton>
        </Box>

        <List sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingBottom: '20px' }}>
          <StyledListItemButton>
            <ListItemIcon>{collapsed ? <FolderIcon /> : <FolderIcon />}</ListItemIcon>
            {!collapsed && <ListItemText primary="My projects" />}
          </StyledListItemButton>

          <StyledListItemButton>
            <ListItemIcon>{collapsed ? <ShareIcon /> : <ShareIcon />}</ListItemIcon>
            {!collapsed && <ListItemText primary="My shares" />}
          </StyledListItemButton>

          <StyledListItemButton>
            <ListItemIcon>{collapsed ? <AccountCircleIcon /> : <AccountCircleIcon />}</ListItemIcon>
            {!collapsed && <ListItemText primary="My details" />}
          </StyledListItemButton>

          <StyledListItemButton>
            <ListItemIcon>{collapsed ? <HomeIcon /> : <HomeIcon />}</ListItemIcon>
            {!collapsed && <ListItemText primary="Home page" />}
          </StyledListItemButton>

          <StyledListItemButton onClick={onLogout}>
            <ListItemIcon>{collapsed ? <LogoutIcon /> : <LogoutIcon />}</ListItemIcon>
            {!collapsed && <ListItemText primary="Log out" />}
          </StyledListItemButton>
        </List>
      </Box>
    </StyledDrawer>
  );
}

function MainContent() {
  const logoSx: SxProps<Theme> = { my: 4, width: 150, height: 150 };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main' }}>
        Welcome to Take A Peek
      </Typography>
      <Logo sx={logoSx} />
      <Link href="/" variant="body2" sx={{ color: 'primary.dark' }}>
        Go to Home Page
      </Link>
    </Box>
  );
}

function UserDashboard() {
  const handleLogout = () => {
    console.log('Logged out');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <MainContent />
      <Sidebar onLogout={handleLogout} />
    </Box>
  );
}

export default UserDashboard;

