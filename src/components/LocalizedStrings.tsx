/* doc: https://www.npmjs.com/package/react-localization */
import LocalizedStrings from 'react-localization';

let Strings = new LocalizedStrings({
    en:{
        /* header */
        news: "News",
        ratings: "Ratings",
        tournaments: "Tournaments",
        signin: "Sign In",
        manage: "Manage",
        logout: "Logout",
        /* ratings page */
        ratings_title: "RANKING",
        ratings_name: "Name",
        ratings_comment: "Comment",
        /* tournaments page */
        tournaments_title: "Tournaments",
        tournaments_card_participants: "participants",
        tournaments_card_created_at: "Created at",
        tournaments_card_learn_more: "LEARN MORE",
        /* single tournament */
        tournament_rules: "Rules",
        tournament_participants: "Participants",
        tournament_games: "Games",
        tournament_bracket: "Bracket",
        tournament_rules_settings_setting: "Setting",
        tournament_rules_settings_value: "Value",
        tournament_rules_settings_season: "Season",
        tournament_rules_settings_map_shape: "Map shape",
        tournament_rules_settings_terrain_type: "Terrain type",
        tournament_rules_settings_starting_resources: "Starting resources",
        tournament_rules_settings_minerals: "Minerals",
        tournament_rules_settings_map_size: "Map size",
        tournament_rules_settings_start_options: "Start options",
        tournament_rules_settings_baloon_options: "Baloon options",
        tournament_rules_settings_cannons: "Cannons",
        tournament_rules_settings_peace_time: "Peace time",
        tournament_rules_settings_18_century_options: "Eighteenth century options",
        tournament_rules_settings_capture: "Capture",
        tournament_rules_settings_dc_and_mrkt: "Dip. center and market",
        tournament_rules_settings_allies: "Allies",
        tournament_rules_settings_limit_of_population: "Limit of population",
        tournament_rules_settings_game_speed: "Game speed",
        tournament_games_date: "Date",
        tournament_games_games: "Games",
        tournament_games_score: "Score",
        tournament_games_youtube: "Youtube",
        tournament_join: "Join"
    },
    uk: {
        /* header */
        news: "Новини",
        ratings: "Рейтинги",
        tournaments: "Турніри",
        signin: "Вхід",
        manage: "Управління",
        logout: "Вийти",
        /* ratings page */
        ratings_title: "РЕЙТИНГ",
        ratings_name: "Імя",
        ratings_comment: "Коментар",
        /* tournaments page */
        tournaments_title: "Турніри",
        tournaments_card_participants: "учасників",
        tournaments_card_created_at: "Створено",
        tournaments_card_learn_more: "ДЕТАЛІ",
        /* single tournament */
        tournament_rules: "Правила",
        tournament_participants: "Учасники",
        tournament_games: "Ігри",
        tournament_bracket: "Сітка",
        tournament_rules_settings_setting: "Налаштування",
        tournament_rules_settings_value: "Значення",
        tournament_rules_settings_season: "Сезон",
        tournament_rules_settings_map_shape: "Тип мапи",
        tournament_rules_settings_terrain_type: "Вид рельєфу",
        tournament_rules_settings_starting_resources: "Початкові ресурси",
        tournament_rules_settings_minerals: "Ресурси",
        tournament_rules_settings_map_size: "Розмір карти",
        tournament_rules_settings_start_options: "Стартові опції",
        tournament_rules_settings_baloon_options: "Опції монгольф'єра",
        tournament_rules_settings_cannons: "Гармати",
        tournament_rules_settings_peace_time: "Час миру",
        tournament_rules_settings_18_century_options: "Опції 18 століття",
        tournament_rules_settings_capture: "Захоплення",
        tournament_rules_settings_dc_and_mrkt: "Дип.центр і ринок",
        tournament_rules_settings_allies: "Союзники",
        tournament_rules_settings_limit_of_population: "Ліміт населення",
        tournament_rules_settings_game_speed: "Швидкість гри",
        tournament_games_date: "Дата",
        tournament_games_games: "Ігри",
        tournament_games_score: "Рахунок",
        tournament_games_youtube: "Відео",
        tournament_join: "Приєднатися"
    }
});

Strings.setLanguage(localStorage.getItem("Language") ?? 'uk');

export default Strings;