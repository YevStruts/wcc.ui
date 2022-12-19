import axios from "axios";
import { ApiUrls } from "../helpers/ConstantHelper";

export const GetAuthorizeUrl = () => {
    return axios.get(ApiUrls.discord_authorize).then((response) => response.data);
};

export const Exchange = (code: string, state: string) => {
    return axios.post(ApiUrls.discord_exchange, {
        code: code,
        state: state,
    });
};
