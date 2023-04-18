import axios from "axios";
import { Constants } from "../helpers/ConstantHelper";

export const GetWhoAmI = () => {
    return axios.get(Constants.ApiUrls.user_whoami).then((response) => response.data);
};