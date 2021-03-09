import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Slider from 'react-bootstrap-range-slider';

const QueryForm = (props) => {
    const stepValue = 5;
    const sliderMin = 5;
    const sliderMax = 50;

    const [themes, setThemes]                         = useState({});
    const [currentSliderValue, setCurrentSliderValue] = useState(sliderMin);
    const [formType, setFormType]                     = useState(null)
    const [formDifficulty, setFormDifficulty]         = useState(null);
    const [formTheme, setFormTheme]                   = useState(9)

    console.log(props)

    useEffect(() => {
        axios
            .get('https://opentdb.com/api_category.php')
            .then(response => {
                setThemes(response.data.trivia_categories);
            })
        ;
    }, [])
    
    function submit(updateGameState) {
        let baseUrl = 'https://opentdb.com/api.php?' + `&category=${formTheme}&amount=${currentSliderValue}` 

        if (null !== formType) {
            baseUrl = baseUrl + `&type=${formType}`;
        }

        if (null !== formDifficulty) {
            baseUrl = baseUrl + `&difficulty=${formDifficulty}`;
        }

        axios
            .get(baseUrl)
            .then(response => console.log(response))
        ;

        props.updateGameState(true);
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
                    // ref
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
                <Button variant="primary" onClick={submit}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default QueryForm;