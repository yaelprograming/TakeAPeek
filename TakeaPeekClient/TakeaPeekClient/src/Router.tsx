import { createBrowserRouter } from "react-router-dom"
import AppLayout from "./AppLayout";
import UserDashboard from "./pages/וserDashboard";
import HomePage from "./pages/homePage/homePage";

import Login from "./components/login";
import CollageEditor from "./pages/collageEditor/collage-editor";
import { Gallery } from "./pages/gallery/Gallery";
import PhotographerCalendar from "./pages/PhotographerCalendar";

const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />, // פה ה-Header
    children: [
      { path: '', element: <HomePage /> }, // index route
      { path: 'userDashboard', element: <UserDashboard /> },
      { path: 'login', element: <Login /> },
      { path: 'gallery', element: <Gallery /> },
      { path: 'design', element: <CollageEditor /> },
      { path: 'calendar', element: <PhotographerCalendar /> },
    ],
  },
]);

 export default Router;
