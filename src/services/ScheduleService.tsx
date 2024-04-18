import axios from "axios";
import { Constants } from "../helpers/ConstantHelper";

export const GetSchedule = (tournamentId: string, page: string, count: string) => {
    const params = new URLSearchParams();
    params.append("tournamentId", tournamentId);
    params.append("page", page);
    params.append("count", count);
    return axios.get(Constants.ApiUrls.schedule + `?` + params.toString()).then((response) => response.data);
};

export const GetScheduleCount = (tournamentId: string) => {
    const params = new URLSearchParams();
    params.append("tournamentId", tournamentId);
    return axios.get(Constants.ApiUrls.schedule + `count?` + params.toString()).then((response) => response.data);
};