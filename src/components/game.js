import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import Question from './game/question.js';
import game from '../reducers/questions.js';
import Summary from './summary.js';


const Game = (props) => {
    const [isGameOver, setIsGameOver]                     = useState(false)
    const currentIndex = props.questions.questionIndex;
    const allQuestions                                    = props.questions.currentQuestions[0];
    const questionsCount                                  = allQuestions.length;

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

    function Template(isGameOver) {
        return (questionsCount === currentIndex ? <Summary /> : <Question /> );
    }

    getQuestionsSetup(allQuestions);

    return (
        <Template isGameOver={isGameOver}/>
    )
}

const mapStateToProps = (state) => ({
    questions: state.questions
});

export default connect(
    mapStateToProps,
)(Game);