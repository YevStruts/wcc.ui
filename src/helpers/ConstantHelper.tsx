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

export const Constants = {
    Roles: {
        Admin: `Admin`,
        Manager: `Manager`,
        User: `User`
    },
    ApiUrls: {
        player: `${API}/player/`,
        player_poll: `${API}/player/poll`,
        news: `${API}/news/`,
        discord_authorize: `${API}/discord/authorize`,
        discord_exchange: `${API}/discord/exchange`,
        game: `${API}/game/`,
        tournament: `${API}/tournament/`,
        rule: `${API}/rule/`,
        settings: `${API}/settings/`,
        rating: `${API}/rating/`,
        user_whoami: `${API}/user/whoami`
    },
    TournamentTypes: {
        Rating: 1,
        Olympic: 2,
        Switz: 3
    }
};