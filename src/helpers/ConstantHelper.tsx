const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const API = isDevelopment ?
    "http://localhost:5001/api" :
    "https://wcc-cossacks.com:5001/api";

// const API = isDevelopment ?
//     "https://localhost:5002/api" :
//     "https://wcc-cossacks.com:5002/api";

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
} else {
    // production code
}

export const ApiUrls = {
    player: `${API}/player/`,
    player_rating: `${API}/player/list`,
    player_poll: `${API}/player/poll`,
    news: `${API}/news/`,
    discord_authorize: `${API}/discord/authorize`,
    discord_exchange: `${API}/discord/exchange`,
    game: `${API}/game/`,
    tournament: `${API}/tournament/`,
    rule: `${API}/rule/`,
    settings: `${API}/settings/`,
};
