import axios from "axios";
import { Constants } from "../helpers/ConstantHelper";
import { GameServerType } from "../pages/tournaments/tournament";

export const GetSchedule = (id : number) => {
    return axios.get(Constants.ApiUrls.game + `schedule/` + id).then((response) => response.data);
};

export const SaveGame = (game : GameServerType) => {
    return axios.post(Constants.ApiUrls.game + `save`, game);
};

export const GetGame = (id: number) => {
    return axios.get(Constants.ApiUrls.game + id).then((response) => response.data);
}

export const AddGame = (tournamentId: number, gametype: number) => {
    return axios.post(Constants.ApiUrls.game + `add`,
    {
        tournamentId: tournamentId,
        gametype: gametype
    }).then((response) => response.data);
}

export const EditGame = (id: number) => {
    return axios.post(Constants.ApiUrls.game + `edit`,
    {
        id: id
    }).then((response) => response.data);
}

export const DeleteGame = (id: number) => {
    return axios.post(Constants.ApiUrls.game + `delete`,
    {
        id: id
    }).then((response) => response.data);
}