import axios from "axios";
import { Constants } from "../helpers/ConstantHelper";

export const GetNewsList = () => {
    return axios.get(Constants.ApiUrls.news + `list`).then((response) => response.data);
};

export const GetNewsItem = (id: string) => {
    return axios.get(Constants.ApiUrls.news + id).then((response) => response.data);
};