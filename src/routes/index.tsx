import axios from "axios";
import { useRoutes } from "react-router-dom";
import { GetToken } from "../helpers/AuthHelper";
import NewsItem from "../pages/news/article";
import NewsList from "../pages/news";
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
        { path: "news", element: <NewsList /> },
        { path: "news/article", element: <NewsItem /> },
        { path: "ratings", element: <Ratings /> },
        // ...
    ]);
};

export default Routes;
