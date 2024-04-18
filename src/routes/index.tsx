import axios from "axios";
import { useRoutes } from "react-router-dom";
import { GetLanguage, GetToken } from "../helpers/AuthHelper";
import Ratings from "../pages/ratings";
import News from "../pages/news";
import Article from "../pages/news/article";
import Tournaments from "../pages/tournaments";
import Tournament from "../pages/tournaments/tournament";
import Settings from "../pages/settings";
import Rules from "../pages/rules";
import Profile from "../pages/profile";
import Players from "../pages/manage/players";
import Games from "../pages/manage/games";
import Schedule from "../pages/schedule";

(function () {
    let token = GetToken();
    if (token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
    let language = GetLanguage();
    if (language !== null && language !== undefined) {
        axios.defaults.headers.common["locale"] = language;
    } else {
        axios.defaults.headers.common["locale"] = "uk";
    }
})();

const Routes = () => {
    return useRoutes([
        { path: "/", element: <Ratings /> },
        { path: "news", element: <News /> },
        { path: "rules", element: <Rules /> },
        { path: "news/:id", element: <Article /> },
        { path: "ratings", element: <Ratings /> },
        { path: "tournaments", element: <Tournaments /> },
        { path: "tournaments/:id", element: <Tournament /> },
        { path: "manage/games", element: <Games /> },
        { path: "manage/players", element: <Players /> },
        { path: "settings", element: <Settings /> },
        { path: "profile/:id", element: <Profile /> },
        { path: "schedule", element: <Schedule /> }
        // ...
    ]);
};

export default Routes;
