import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashBoard from "../pages/DashBoard";
import Favorites from "../pages/Favorites";
import SavedPlaces from "../pages/SavedPlaces";
import Login from "../pages/Login";
import Register from "../pages/Register";
const router = createBrowserRouter([
    { 
      path: "/",    
      element: <App />,
      children: [
        { index: true, element: <DashBoard /> },
        { path: "favorites", element: <Favorites /> },
        { path: "saved-places", element: <SavedPlaces /> },
        { path: "auth", children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register />}
        ]}
      ],
      
    }
 
]);

export default router;