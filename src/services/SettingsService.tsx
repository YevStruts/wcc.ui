import axios from "axios";
import { ApiUrls } from "../helpers/ConstantHelper";

export const GetSettings = () => {
    return axios.get(ApiUrls.settings).then((response) => response.data);
}

export const SaveSettings = (nickename: string) => {
    return axios.post(ApiUrls.settings, {
        nickname: nickename
    });
}