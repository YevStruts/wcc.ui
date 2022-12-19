import axios from "axios";
import { ApiUrls } from "../helpers/ConstantHelper";

export const GetRating = () => {
    return axios.get(ApiUrls.player_rating).then((response) => response.data);
};

export const GetPoll = () => {
    return axios.get(ApiUrls.player_poll).then((response) => response.data);
};
