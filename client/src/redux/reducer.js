import { GET_VIDEOGAMES,
         SEARCH,
         ERROR,
         CLOSE_ERROR,
         GET_BY_RATING,
         GET_BY_ALP, 
         GET_GENRES,
         GET_BY_GENRE
        } from "./actions";

const initialState = {
    videoGames: [],
    sortGames: [],
    genres: [],
    error: false,
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_VIDEOGAMES:
            const g = [...action.payload]
            return {
                ...state,
                videoGames: action.payload,
                sortGames: g
            };
        case GET_BY_RATING:
            const gamesSorted = action.payload === "higer"
                              ? state.videoGames.sort((a, b) => b.rating - a.rating)
                              : action.payload === "lower"
                              ? state.videoGames.sort((a,b) => a.rating - b.rating)
                              : [...state.videoGames];
            return {
                ...state,
                sortGames: gamesSorted
            };
        case GET_BY_ALP:
            const sortByAlp = action.payload === "asc"
                              ? state.sortGames.sort((a,b) => {if(a.name > b.name) return 1;
                                                                if(a.name < b.name) return -1;
                                                                return 0;
                                                               })
                              : action.payload === "desc"
                              ? state.sortGames.sort((a,b) => {if(a.name > b.name) return -1;
                                                                if(a.name < b.name) return 1;
                                                                return 0;
                                                               })
                              : [...state.videoGames];
            return {
                ...state,
                sortGames: sortByAlp
            }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case GET_BY_GENRE:
            let gamesFilt = state.videoGames.filter(game => game.genres.includes(action.payload));
            let err = !gamesFilt.length
            return {
                ...state,
                sortGames: gamesFilt,
                error: err ? !state.error : state.error
            }

        case SEARCH:
            return {
                ...state,
                videoGames: action.payload,
            };
        case CLOSE_ERROR:
            return {
                ...state,
                error: state.error === false ? false : false
            }
        case ERROR:
            return {
                ...state,
                error: true,
            }
        default:
            return {
                ...state,
            };
    };
};

export default rootReducer;