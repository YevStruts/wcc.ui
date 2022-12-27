import axios from "axios";
import { ApiUrls } from "../helpers/ConstantHelper";

export const GetNewsList = () => {
    return axios.get(ApiUrls.news + `list`).then((response) => response.data);
};

export const GetNewsItem = (id: string) => {
    return axios.get(ApiUrls.news + id).then((response) => response.data);
};