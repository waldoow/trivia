import QueryForm from '../components/form.js'
import Game from '../components/game.js'
import { connect } from 'react-redux';

function App(props) {
  return (
    <div className="App">
      <div className="container">
        {
          !props.questions.currentQuestions.length ?
            <QueryForm /> :
            <Game currentGame={props} />
        }
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    questions: state.questions
  }
}

export default connect(
  mapStateToProps,
)(App);
