import axios from "axios";
import { Constants } from "../helpers/ConstantHelper";

export const GetLiveScore = (id : string) => {
    return axios.get(Constants.ApiUrls.widget_livescore + encodeURIComponent(id)).then((response) => response.data);
}