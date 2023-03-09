import axios from "axios";
import { ApiUrls } from "../helpers/ConstantHelper";

export const GetTournament = (id : number) => {
    return axios.get(ApiUrls.tournament + id).then((response) => response.data);
};

export const GetTournamentsList = () => {
    return axios.get(ApiUrls.tournament + `list`).then((response) => response.data);
};

export const Join = (id: number) => {
    return axios.post(ApiUrls.tournament + `join/` + id).then((response) => response.data);
};