import axios from "axios";
import { ApiUrls } from "../helpers/ConstantHelper";

export const GetTournamentsList = () => {
    return axios.get(ApiUrls.tournaments + `list`).then((response) => response.data);
};