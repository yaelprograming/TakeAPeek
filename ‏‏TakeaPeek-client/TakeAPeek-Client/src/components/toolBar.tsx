// import React from "react";
// import { AppBar, Toolbar, Typography, Box } from "@mui/material";
// import { Link } from "react-router-dom";
// import AccountMenu from "./auth/accountMenu";

// const Header = () => {
//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         top: 0,
//         left: 0,
//         right: 0,
//         zIndex: 1201, // מבטיח שהכותרת תהיה מעל שאר התוכן
//         backgroundColor: "white",
//         boxShadow: 3,
//       }}
//     >
//       <Toolbar sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
//         {/* לוגו בצד שמאל */}
//         <Link to="/" >
//         {/* style={{ textDecoration: "none" }} */}
//           <Typography variant="h6" sx={{ color: "black", fontWeight: "bold" }}>
//             Take a Peek
//           </Typography>
//         </Link>

//         {/* AccountMenu בצד ימין */}
//         <Box> {/* דוחף את ה-AccountMenu לקצה הימני */}
//           <AccountMenu />
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;


//רק לבינתיים:
/* eslint-disable react-refresh/only-export-components */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CollectionsIcon from '@mui/icons-material/Collections';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import StarIcon from '@mui/icons-material/Star';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SearchIcon from '@mui/icons-material/Search';
import { useDemoRouter } from '@toolpad/core/internal';

import {
    AppProvider,
    type Navigation,
} from '@toolpad/core/AppProvider';
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import { Stack, Tooltip, IconButton, TextField } from '@mui/material';
import { theme } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import AccountMenu from './auth/accountMenu';
import Upload from '../hooks/upload';
import { Gallery } from '../pages/gallery/Gallery';
// import Gallery from '../page/gallery';


const NAVIGATION: Navigation = [
    {
        segment: 'Gallery',
        title: 'Gallery',
        icon: <DashboardIcon />,
    },
    {
        segment: 'Upload',
        title: 'Upload',
        icon: <UploadFileIcon />,
    },
    {
        segment: 'Collections',
        title: 'My Collections',
        icon: <CollectionsIcon />,
    },
    {
        segment: 'Design',
        title: 'Design',
        icon: <StarIcon />,
    },
    {
        segment: 'More',
        title: 'more',
        icon: <MoreHorizIcon />,
    },
];


function ToolbarActionsSearch() {
    return (
        <Stack direction="row" >
            <Tooltip title="Search" enterDelay={1000}>
                <div>
                    <IconButton
                        type="button"
                        aria-label="search"
                        sx={{
                            display: { xs: 'inline', md: 'none' },
                        }}
                    >
                        <SearchIcon />
                    </IconButton>
                </div>
            </Tooltip>
            <TextField
                label="Search"
                variant="outlined"
                size="small"
                slotProps={{
                    input: {
                        endAdornment: (
                            <IconButton type="button" aria-label="search" size="small">
                                <SearchIcon />
                            </IconButton>
                        ),
                        sx: { pr: 0.5 },
                    },
                }}
                sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1, left: '-500px' }}
            />
            <ThemeSwitcher />
        </Stack>
    );
}



function CustomAppTitle() {
    return (

        <>
            <Stack direction="row" alignItems="center" spacing={1}>
                <Link to='/home'><img style={{ width: 40 }} src="img/logo.png" alt="logo" /></Link>
                <Typography variant="h5" color='secondary'>FrameIt </Typography>
            </Stack>
            <AccountMenu />
        </>

    );
}


export default () => {

    const router = useDemoRouter('/dashboard');
    const navigate = useNavigate();
    // const location = useLocation();
   
    React.useEffect(() => {
        // if (router.pathname === '/Gallery') {
        //     navigate('/gallery');
        // }
        if (router.pathname === 'Gallery') {
            router.navigate('/gallery');
        }
    }, [router.pathname, navigate]);
   

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={theme}
        >
            <DashboardLayout
                sx={{ width: '1280px' }}
                slots={{
                    appTitle: CustomAppTitle,
                    toolbarActions: ToolbarActionsSearch
                }}
            >

                {router.pathname === '/Gallery' && <Gallery />}
                {/* {location.pathname.endsWith('gallery') && <Gallery/>} */}
                {router.pathname === '/Upload' && <Upload />}
                {/* {router.pathname === '/Collections' && <Collections />} */}
                {/* {router.pathname === '/Design' && <Design />} */}
                {/* {router.pathname === '/More' && <More />} */}
            </DashboardLayout>
        </AppProvider>
    );
}
