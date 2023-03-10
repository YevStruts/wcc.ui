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

export const Leave = (id: number) => {
    return axios.post(ApiUrls.tournament + `leave/` + id).then((response) => response.data);
};

export const GetParticipationStatus = (tournamentId: number) => {
    return axios.get(ApiUrls.tournament + `getparticipationstatus/` + tournamentId).then((response) => response.data);
};