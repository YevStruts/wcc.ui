import axios from "axios";
import { Constants } from "../helpers/ConstantHelper";

export const GetSettings = () => {
    return axios.get(Constants.ApiUrls.settings).then((response) => response.data);
}

export const SaveSettings = (nickename: string) => {
    return axios.post(Constants.ApiUrls.settings, {
        nickname: nickename
    });
}