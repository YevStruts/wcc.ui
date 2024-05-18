import axios from "axios";
import { Constants } from "../helpers/ConstantHelper";
import { GameServerType } from "../pages/tournaments/tournament";
import { ScheduleProps } from "../components/DenseTable";

export const GetSchedule = (id : number) => {
    return axios.get(Constants.ApiUrls.game + `schedule/` + id).then((response) => response.data);
};

export const SaveGame = (game : ScheduleProps) => {
    return axios.post(Constants.ApiUrls.game, {
        id: game.id,
        date: game.date,
        gameType: 1,
        // Name: string,
        sideA: [ game.sideA ],
        sideB: [ game.sideB ],
        scoreA: game.scoreA,
        scoreB: game.scoreB,
        tournamentId: game.tournamentId,
        youtube: game.youtube 
    });
};

export const AddGame = (tournamentId: number, gametype: number) => {
    return axios.post(Constants.ApiUrls.game + `add`,
    {
        tournamentId: tournamentId,
        gametype: gametype
    }).then((response) => response.data);
}

// export const EditGame = (id: number) => {
//     return axios.post(Constants.ApiUrls.game + `edit`,
//     {
//         id: id
//     }).then((response) => response.data);
// }

export const GetGame = (id: string) => {
    return axios.get(Constants.ApiUrls.game + encodeURIComponent(id)).then((response) => response.data);
}

export const EditGame = (id: string) => {
    return axios.post(Constants.ApiUrls.game + encodeURIComponent(id),
    {
        id: id
    }).then((response) => response.data);
}

export const DeleteGame = (id: string) => {
    return axios.delete(Constants.ApiUrls.game + encodeURIComponent(id))
    .then((response) => response.data);
}