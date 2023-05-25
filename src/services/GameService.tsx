import axios from "axios";
import { Constants } from "../helpers/ConstantHelper";
import { GameServerType } from "../pages/tournaments/tournament";

export const GetSchedule = (id : number) => {
    return axios.get(Constants.ApiUrls.game + `schedule/` + id).then((response) => response.data);
};

export const SaveGame = (game : GameServerType) => {
    return axios.post(Constants.ApiUrls.game + `save`, game);
};