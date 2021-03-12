import * as actions from '../actions/questions.js'

const initialState = {
    currentQuestions: [],
}

const game = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_QUESTIONS:
            // console.log('randoms   ', action.questions);
            return {
                ...state,
                currentQuestions: [...state.currentQuestions, action.questions]
            }
        default:
            return state;
	}
};

export default game;