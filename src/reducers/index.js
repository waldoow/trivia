import { combineReducers } from 'redux'
import game from './game.js';
import user from './user.js';

const rootReducer = combineReducers({game: game, user: user})

export default rootReducer;