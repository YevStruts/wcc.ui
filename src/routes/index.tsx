import axios from "axios";
import { useRoutes } from "react-router-dom";
import { GetToken } from "../helpers/AuthHelper";
import Ratings from "../pages/ratings";
import News from "../pages/news";
import Article from "../pages/news/article";
import Tournaments from "../pages/tournaments";

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
        { path: "news/article", element: <Article /> },
        { path: "ratings", element: <Ratings /> },
        { path: "tournaments", element: <Tournaments /> },
        // ...
    ]);
};

export default Routes;
