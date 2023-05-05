import axios from "axios";
import { Constants } from "../helpers/ConstantHelper";

export const GetRating = () => {
    return axios.get(Constants.ApiUrls.rating + '2').then((response) => response.data);
};