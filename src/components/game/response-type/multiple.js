import { connect } from 'react-redux';

import { ButtonGroup, Button } from 'react-bootstrap';
import * as questionsType from '../../../actions/questions.js';
import './button.css';

const ButtonRow = (props) => {
    const answers = props.question.question.answers;
    const correctAnswer = props.question.question.correct_answer;

    console.log(props);

    return (
        <ButtonGroup className="mr-2" aria-label="Second group">
            {
                answers.map((answer) => {
                    return (
                        <Button onClick={(e) => submit(e.target.value, correctAnswer, props)} value={answer} key={answer} variant="outline-primary">{answer}</Button>
                    )
                })
            }
        </ButtonGroup>
    )
}

const submit = (answer, correctAnswer, props) => {
    if (answer === correctAnswer) {
        props.addPoint();
    }

    props.updateIndex();
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateIndex: () => dispatch({type: questionsType.SET_QUESTION_INDEX}),
        addPoint: () => dispatch({type: questionsType.ADD_EARNED_POINT})
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.questions
    }
}
    
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ButtonRow);