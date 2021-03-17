import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import ButtonRow from './response-type/multiple.js'
import BoolRow from './response-type/boolean.js'

const question = (props) => {
    var decodeHTML = (html) => {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    const index    = props.questions.questionIndex;
    const question = decodeHTML(props.questions.currentQuestions[0][index].question);
    const type     = props.questions.currentQuestions[0][index];

    return (
        <Card className="text-center">
            <Card.Header>Question { index } / { props.questions.currentQuestions[0].length }</Card.Header>
            <Card.Body>
                <Card.Title>{ props.questions.currentQuestions[0][index].category }</Card.Title>
                <Card.Text>{ question }</Card.Text>
                <ButtonType question={type} />
            </Card.Body>
            <Card.Footer className="text-muted">Points : { props.questions.pointEarned }</Card.Footer>
        </Card>
    )
}

const ButtonType = (type) => {
    if (type.question.type === "multiple") {
        return <ButtonRow question={ type } />
    }

    return <BoolRow question={ type } />
}

const mapStateToProps = (state) => ({
    questions: state.questions
});

export default connect(
    mapStateToProps,
)(question);