import axios from "axios";
import { ApiUrls } from "../helpers/ConstantHelper";

export const GetNews = () => {
    return axios.get(ApiUrls.news_list).then((response) => response.data);
};
