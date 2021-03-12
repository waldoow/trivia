import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import ButtonRow from './response-type/multiple.js'


const question = (props) => {
    console.log('PROPS', props);

    var decodeHTML = function (html) {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    const index = props.questions.questionIndex;
    const question = decodeHTML(props.questions.currentQuestions[0][index].question);

    return (
        <Card className="text-center">
            <Card.Header>Question {index} / {props.questions.currentQuestions[0].length}</Card.Header>
            <Card.Body>
                <Card.Title>{props.questions.currentQuestions[0][index].category}</Card.Title>
                <Card.Text>{ question }</Card.Text>
                <ButtonRow question={props.questions.currentQuestions[0][index]} />
            </Card.Body>
            <Card.Footer className="text-muted">Points : {props.}</Card.Footer>
        </Card>
    )
}

const mapStateToProps = (state) => ({
    questions: state.questions
});

export default connect(
    mapStateToProps,
)(question);