import { connect } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import App from '../containers/App.js';
import * as actions from '../actions/questions.js'


const summary = (props) => {
    const score          = props.questions.pointEarned;
    const questionsCount = props.questions.currentQuestions[0].length;

    return (
        <Card className="text-center">
            <Card.Header as="h5">Game finished</Card.Header>
            <Card.Body>
                <Card.Title>Your Score { score } / { questionsCount }</Card.Title>
                <Card.Text>
                    Start a new game by clicking the button bellow
                </Card.Text>
                <Button onClick={ props.newGame } variant="primary">Start a new game</Button>
            </Card.Body>
        </Card>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        newGame: () => dispatch({type: actions.NEW_GAME}),
    }
}

const mapStateToProps = (state) => ({
    questions: state.questions
});


export default connect(mapStateToProps, mapDispatchToProps)(summary)
