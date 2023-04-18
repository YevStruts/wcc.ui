import axios from "axios";
import { Constants } from "../helpers/ConstantHelper";

export const GetRule = (id: number) => {
    return axios.get(Constants.ApiUrls.rule + id).then((response) => response.data);
};