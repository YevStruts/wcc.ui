import axios from "axios";
import { Constants } from "../helpers/ConstantHelper";

export const GetAuthorizeUrl = () => {
    return axios.get(Constants.ApiUrls.discord_authorize).then((response) => response.data);
};

export const Exchange = (code: string, state: string) => {
    return axios.post(Constants.ApiUrls.discord_exchange, {
        code: code,
        state: state,
    });
};
