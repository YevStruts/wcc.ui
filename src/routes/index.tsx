import axios from "axios";
import { useRoutes } from "react-router-dom";
import { GetToken } from "../helpers/AuthHelper";
import NewsItem from "../pages/news-item";
import NewsList from "../pages/news-list";
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
        { path: "news-list", element: <NewsList /> },
        { path: "news-item", element: <NewsItem /> },
        { path: "ratings", element: <Ratings /> },
        // ...
    ]);
};

export default Routes;
