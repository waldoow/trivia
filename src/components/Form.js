import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Slider from 'react-bootstrap-range-slider';
import { useDispatch } from 'react-redux';
import * as gameTypes from '../actions/questions.js';


const QueryForm = (props) => {
    const stepValue = 5;
    const sliderMin = 5;
    const sliderMax = 50;

    const [themes, setThemes]                         = useState({});
    const [currentSliderValue, setCurrentSliderValue] = useState(sliderMin);
    const [formType, setFormType]                     = useState(null)
    const [formDifficulty, setFormDifficulty]         = useState(null);
    const [formTheme, setFormTheme]                   = useState(9)

    const dispatch = useDispatch()

    useEffect(() => {
        axios
            .get('https://opentdb.com/api_category.php')
            .then(response => {
                setThemes(response.data.trivia_categories);
            })
        ;
    }, [])

     async function submit() {
        let baseUrl = `https://opentdb.com/api.php?&category=${formTheme}&amount=${currentSliderValue}` 

        if (null !== formType) {
            baseUrl = baseUrl + `&type=${formType}`;
        }

        if (null !== formDifficulty) {
            baseUrl = baseUrl + `&difficulty=${formDifficulty}`;
        }

        const questions = await axios
            .get(baseUrl)
            .then(response => {
                return response.data.results;
            })
        ;

        return questions;
    }

    const saveGame = async () => {
        const questions = await submit();

        dispatch({
            type: gameTypes.SET_QUESTIONS,
            payload: questions
        })
    }

    return (
        <div className="container">
            <Form>
                <Form.Group controlId="formTheme" onChange={(event) => {
                    setFormTheme(event.target.value);
                }}>
                    <Form.Label>Choose a theme</Form.Label>
                    <Form.Control as="select">
                        {
                            Object.keys(themes).map(key => {
                                return <option value={themes[key].id} key={key}>{themes[key].name}</option>
                            })
                        }
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formDifficulty" onChange={(event) => {
                    setFormDifficulty(event.target.value);
                }}>
                    <Form.Label>Choose a difficulty</Form.Label>
                    <Form.Control as="select" defaultValue="Any Difficulty">
                        <option>Any Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </Form.Control>
                </Form.Group>

                <Slider
                    value={currentSliderValue}
                    onChange={changeEvent => setCurrentSliderValue(changeEvent.target.value)}
                    max={sliderMax}
                    min={sliderMin}
                    step={stepValue}
                    variant="dark"
                />

                <Form.Group controlId="formType" onChange={(event)=>{
                    setFormType(event.target.value);
                }}>
                    <Form.Label>Choose a type</Form.Label>
                    <Form.Control as="select" defaultValue="Any Type">
                        <option>Any Type</option>
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True / False</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" onClick={saveGame}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default QueryForm;