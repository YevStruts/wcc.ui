import axios from "axios";
import { ApiUrls } from "../helpers/ConstantHelper";

export const GetTournament = (id : string) => {
    return axios.get(ApiUrls.tournaments + id).then((response) => response.data);
};

export const GetTournamentsList = () => {
    return axios.get(ApiUrls.tournaments + `list`).then((response) => response.data);
};