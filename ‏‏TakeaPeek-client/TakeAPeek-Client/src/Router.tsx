import { createBrowserRouter, Link } from "react-router-dom"
import Gallery from "./pages/gallery/Gallery";
import AppLayout from "./AppLayout";
import UserDashboard from "./pages/וserDashboard";
import HomePage from "./components/homepage/homePage";
import Login from "./components/login";
import AIFeaturesDashboard from "./components/ai/AIFeaturesDashboard";
import FreeSearch from "./components/ai/FreeSearch";
import ImageAnalysis from "./components/ai/ImageAnalysis";
import SmartFiltering from "./components/ai/SmartFiltering";
import CollageEditor from "./pages/collageEditor/collage-editor";



const Router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout/>,
   
        children:
            [{
                path: '/gallery',
                element: <Gallery />,
            },
            {
                
path:'/userDashboard',
element:<UserDashboard/>
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/homePage',
                element:<HomePage/>
            }
            ,
        {
            path:'/ai-features',
            element:<AIFeaturesDashboard/>
        },
        {
            path:'/ai-features/free-search',
            element:<FreeSearch/>
        },
        {
            path:'/ai-features/image-analysis',
            element:<ImageAnalysis/>
        },
        {
            path:'/ai-features/smart-filtering',
            element:<SmartFiltering/>
        },
        {
            path: '/design',
            element: <CollageEditor />,
        },
            

       ]
    },

]);

export default Router;



