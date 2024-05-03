import axios from "axios";
import { Constants } from "../helpers/ConstantHelper";

export const GetStanding = (id : string) => {
    return axios.get(Constants.ApiUrls.standing_roundrobin + id).then((response) => response.data);
}