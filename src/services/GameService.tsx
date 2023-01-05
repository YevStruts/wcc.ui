import axios from "axios";
import { ApiUrls } from "../helpers/ConstantHelper";

export const GetSchedule = (id : number) => {
    return axios.get(ApiUrls.game + `schedule/` + id).then((response) => response.data);
};