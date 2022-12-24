import axios from "axios";
import { useRoutes } from "react-router-dom";
import { GetToken } from "../helpers/AuthHelper";
import News from "../pages/news";
import Ratings from "../pages/ratings";

(function () {
    let token = GetToken();
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
})();

const Routes = () => {
    return useRoutes([
        { path: "/", element: <Ratings /> },
        { path: "news", element: <News /> },
        { path: "ratings", element: <Ratings /> },
        // ...
    ]);
};

export default Routes;
