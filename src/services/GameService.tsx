import axios from "axios";
import { Constants } from "../helpers/ConstantHelper";

export const GetSchedule = (id : number) => {
    return axios.get(Constants.ApiUrls.game + `schedule/` + id).then((response) => response.data);
};