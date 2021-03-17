import { connect } from 'react-redux';

import { ButtonGroup, Button } from 'react-bootstrap';
import * as questionsType from '../../../actions/questions.js';
import './button.css';

const BoolButtons = (props) => {
    const correctAnswer = props.question.question.correct_answer;

    return (
        <ButtonGroup className="mr-2" aria-label="Second group">
            <Button onClick={(e) => submit(e.target.value, correctAnswer, props)} value="True" variant="outline-primary">True</Button>
            <Button onClick={(e) => submit(e.target.value, correctAnswer, props)} value="False" variant="outline-primary">False</Button>
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
)(BoolButtons);