import axios from "axios";
import { ApiUrls } from "../helpers/ConstantHelper";

export const GetTournamentsList = () => {
    return axios.get(ApiUrls.tournaments).then((response) => response.data);
};