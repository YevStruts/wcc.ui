import axios from "axios";
import { ApiUrls } from "../helpers/ConstantHelper";

export const GetRule = (id: number) => {
    return axios.get(ApiUrls.rule + id).then((response) => response.data);
};