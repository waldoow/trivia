import * as actions from '../actions/questions.js'

const initialState = {
    currentQuestions: [],
    questionIndex: 0,
    pointEarned: 0
}

const game = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_QUESTIONS:
            return {
                ...state,
                currentQuestions: [...state.currentQuestions, getQuestionsSetup(action.payload)]
            }
        case actions.SET_QUESTION_INDEX:
            return {
                ...state,
                questionIndex: state.questionIndex + 1
            }
        case actions.ADD_EARNED_POINT:
            return {
                ...state,
                pointEarned: state.pointEarned + 1
            }
        default:
            return state;
	}
};

function getQuestionsSetup(allQuestions) {
    allQuestions.forEach(question => {
        if ('multiple' === question.type) {
            const allAnswers = question.incorrect_answers.concat([question.correct_answer]);
            question.answers = allAnswers;

            question.answers.sort(() => Math.random() - 0.5)
        }
    });

    return allQuestions;
}

export default game;