import * as actions from '../actions/game.js'

const game = (state = [], action) => {
    switch (action.type) {
        case actions.ADD_GAME:
            console.log(action.payload)
            return {
                ...state,
                game: [...state, action.payload]
            }
        default:
            return state;
	}
};

// store.dispatch({ type: actions.ADD_GAME })
// console.log(store);

export default game;