import React from "react";
import { Form, Button, Modal } from "react-bootstrap";
import axios from '../utils/axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { setActors, setFormat, setId, setName, setYear } from '../store/actions/currentFilm';

class MyForm extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.currentFilm);
        console.log('MODE', this.props.mode);
        console.log(this.props.match);
        this.state = {
            id: this.props.currentFilm.id,
            name: '',
            format: 'VHS',
            actors: '',
            yearOfIssue: 0,
            mode: this.props.mode,
            done: false,
            validated: false,
            validations: {
                name: null,
                actors: null,
                year: null
            },
            error: {
                code: 0,
                data: '',
                show: false
            }
        };
        console.log(this.state);
        if (this.props.id > 0) {
            axios.get(`/films/${this.state.id}`)
                .then(data => {
                    console.log(data);
                })
                .catch(err => {
                    console.log(err.response);
                })
        }
    }

    componentDidMount() {
        console.log('mount');
        console.log(this.state.id);
        console.log(this.props.currentFilm);
        if(this.state.mode == 'create') this.clearCurrentFilm();
    }

    componentWillUnmount() {
        console.log('unmount');
        this.clearCurrentFilm();
        console.log(this.props.currentFilm);
    }

    clearCurrentFilm = () => {
        this.props.setNameAction('');
        this.props.setYearAction(0);
        this.props.setActorsAction([]);
        this.props.setFormatAction('');
    }

    handleError = (error) => {
        this.setState({
            error: {
                code: `${error.status} (${error.statusText})`,
                data: error.data.err,
                show: true
            }
        });
    }

    sendCreateRequest = async () => {
        try {
            let response = await axios.post('/films', {
                name: this.state.name,
                yearOfIssue: this.state.yearOfIssue,
                format: this.state.format,
                actors: this.state.actors
            });
            // console.log(response);
            this.clearCurrentFilm();
            if (response.data.test === false) {
                console.log('format');
            }
            else {
                this.setState({
                    id: response.data.film_id,
                    done: true
                });
            }

        } catch (error) {
            console.log(error.response);
            this.handleError(error.response);
        }
    }

    sendEditRequest = async () => {
        try {
            let response = await axios.patch(`/films/${this.props.currentFilm.id}`, this.props.currentFilm);
            console.log(response);
            this.setState({
                done: true
            });
            this.clearCurrentFilm();
        } catch (error) {
            console.log(error.response);
            this.handleError(error.response);
        }
    }

    activateButton = () => {
        if (this.state.mode === 'create') {
            return (
                <Button variant="outline-primary" onClick={this.sendCreateRequest}>Create</Button>
            )
        }
        else {
            return (
                <Button variant="outline-primary" onClick={this.sendEditRequest}>Edit</Button>
            )
        };
    }

    onNameChanged = (event) => {
        console.log(event.target.value)
        this.setState({
            name: event.target.value,
            validations: {
                name: (event.target.value.length > 0 ? (event.target.value.trim().length > 0 ? true : false) : false)
            }
        });
        this.props.setNameAction(event.target.value); 
        console.log(this.props.currentFilm.name);
    }

    onYearChanged = (event) => {
        event.target.setAttribute(event.target.checkValidity() ? 'isValid' : 'isInvalid', true);
        this.setState({
            yearOfIssue: event.target.value,
            validations: event.target.checkValidity()
        });
        this.props.currentFilm.yearOfIssue = event.target.value;
    }

    onFormatChanged = (event) => {
        this.setState({
            format: event.target.value
        });
        this.props.currentFilm.format = event.target.value;
    }

    onActorsChanged = (event) => {
        this.setState({
            actors: event.target.value
        });
        this.props.currentFilm.actors = event.target.value;
    }

    handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation();
        console.log('submitted');
        if(this.state.mode == 'create') {
            this.sendCreateRequest();
        } else {
            this.sendEditRequest();
        }
    }

    render() {
        if (this.state.done) {
            return (<Redirect to={`/films/${this.state.id}`} />)
        }
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Film name</Form.Label>
                        <Form.Control type="text" placeholder="Titanic" onChange={this.onNameChanged} value={
                           this.props.currentFilm.name
                        } required />
                        <Form.Control.Feedback type="invalid">Should not be empty</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Year of issue (1850-2025)</Form.Label>
                        <Form.Control type="number" placeholder="1997" onChange={this.onYearChanged} value={
                            this.props.currentFilm.yearOfIssue
                        } min="1850" max="2025" required />
                        <Form.Control.Feedback type="invalid">Should be in range from 1850 to 2025</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Format (VHS by default)</Form.Label>
                        <Form.Control as="select" onChange={this.onFormatChanged} value={
                            this.props.currentFilm.format
                        }>
                            <option value="VHS">VHS</option>
                            <option value="DVD">DVD</option>
                            <option value="Blu-Ray">Blu-Ray</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Actors (Use text only)</Form.Label>
                        <Form.Control type="text" placeholder="Kate Winslet, Leonardo DiCaprio" onChange={this.onActorsChanged}
                            value={this.props.currentFilm.actors} title="Should not contain numbers" required
                            pattern="^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"/>
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                    {/* {this.activateButton()} */}
                </Form>
                <Modal
                    show={this.state.error.show}
                    dialogClassName="modal-90w"
                    onHide={() => this.setState({ modal: false })}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Oops! You got {this.state.error.code} error!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.error.data}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({error:{code: false}})}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const mapToStateProps = store => {
    return {
        currentFilm: store.currentFilm
    }
}

const mapDispatchToActions = dispatch => {
    return {
        setNameAction: name => dispatch(setName(name)),
        setFormatAction: format => dispatch(setFormat(format)),
        setYearAction: year => dispatch(setYear(year)),
        setActorsAction: actors => dispatch(setActors(actors)),
        setIdAction: id => dispatch(setId(id))
    };
};

export default connect(mapToStateProps, mapDispatchToActions)(MyForm);