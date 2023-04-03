import axios from "axios";
import { ApiUrls } from "../helpers/ConstantHelper";

export const GetRating = () => {
    return axios.get(ApiUrls.rating + '1').then((response) => response.data);
};