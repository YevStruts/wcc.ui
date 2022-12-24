import axios from "axios";
import { ApiUrls } from "../helpers/ConstantHelper";

export const GetNewsList = () => {
    return axios.get(ApiUrls.news_list).then((response) => response.data);
};
