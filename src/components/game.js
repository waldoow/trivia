import { Card, Button } from 'react-bootstrap';
import { useStore } from 'react-redux';
import { useState, useEffect } from 'react';
import Question from './game/question.js';


const Game = (props) => {
    const [question, setQuestion]                         = useState({});
    const [isGameOver, setIsGameOver]                     = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const allQuestions                                    = useStore().getState().questions.currentQuestions[0];
    const questionsCount                                  = allQuestions.length;

    useEffect(() => {
        setQuestion(allQuestions[currentQuestionIndex]);

        if (questionsCount - 1 === currentQuestionIndex) {
            setIsGameOver(true);
        }
    }, [currentQuestionIndex])

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
        if (true === isGameOver) {
            return (
                <h1>game over</h1>
            )
        }

        return (
            <Question />
        )
    }

    getQuestionsSetup(allQuestions);

    return (
        <Template isGameOver={isGameOver}/>
    )
}

export default Game;