import { combineReducers } from 'redux'
import questions from './questions.js';
import user from './user.js';

const rootReducer = combineReducers({questions: questions, user: user})

export default rootReducer;