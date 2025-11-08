import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashBoard from "../pages/DashBoard";
import Favorites from "./Favorites";
import SavedPlaces from "./SavePlaces";
import Login from "../pages/Login";
import Register from "../pages/Register";
const router = createBrowserRouter([
    { 
      path: "/",    
      element: <App />,
      children: [
        { index: true, element: <DashBoard /> },
        { path: "auth", children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register />}
        ]}
      ],
      
    }
 
]);

export default router;