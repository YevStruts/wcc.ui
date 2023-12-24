import axios from "axios";
import { Constants } from "../helpers/ConstantHelper";

export const GetCountries = () => {
    return axios.get(Constants.ApiUrls.country + `/list`).then((response) => response.data);
};