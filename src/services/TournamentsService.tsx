import axios from "axios";
import { Constants } from "../helpers/ConstantHelper";

export const GetTournament = (id : number) => {
    return axios.get(Constants.ApiUrls.tournament + id).then((response) => response.data);
};

export const GetTournamentParticipants = (id : number) => {
    return axios.get(Constants.ApiUrls.tournament + `participant/` + id).then((response) => response.data);
};

export const GetTournamentsList = () => {
    return axios.get(Constants.ApiUrls.tournament).then((response) => response.data);
};

export const Join = (id: number) => {
    return axios.post(Constants.ApiUrls.tournament + `join/` + id).then((response) => response.data);
};

export const Leave = (id: number) => {
    return axios.post(Constants.ApiUrls.tournament + `leave/` + id).then((response) => response.data);
};

export const GetParticipationStatus = (tournamentId: number) => {
    return axios.get(Constants.ApiUrls.tournament + `getparticipationstatus/` + tournamentId).then((response) => response.data);
};

export const GetSwitzTable = (tournamentId: number) => {
    return axios.get(Constants.ApiUrls.tournament + `getswitztable/` + tournamentId).then((response) => response.data);
}
