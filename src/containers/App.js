import QueryForm from '../components/form.js'
import Game from '../components/game.js'
import store from '../store';
import {connect} from 'react-redux';
import gameTypes from '../actions/questions.js'

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

const mapDispatchToProps = (dispatch) => {
  return {
    // newGame : dispatch({
    //   type: gameTypes.SET_QUESTIONS,
    //   []
    // })
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
