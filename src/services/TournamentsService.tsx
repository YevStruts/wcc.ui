import axios from "axios";
import { ApiUrls } from "../helpers/ConstantHelper";

export const GetTournament = (id : number) => {
    return axios.get(ApiUrls.tournaments + id).then((response) => response.data);
};

export const GetTournamentsList = () => {
    return axios.get(ApiUrls.tournaments + `list`).then((response) => response.data);
};

export const GetTournamentBracket = (id : number) => {
    return axios.get(ApiUrls.tournaments + `bracket/` + id).then((response) => response.data);
};