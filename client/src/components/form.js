import React from "react";
import { Form as BForm, Button } from "react-bootstrap";
import axios from '../utils/axios';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { setActors, setFormat, setId, setName, setYear } from '../store/actions/currentFilm';

class Form extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.currentFilm);
        console.log('MODE', this.props.mode);
        this.state = {
            id: this.props.id ? this.props.id : null,
            name: '',
            format: '',
            actors: '',
            yearOfIssue: 0,
            mode: this.props.mode,
            done: false
        };
        console.log(this.state);
        if (this.props.id > 0) {
            axios.get(`/films/${this.state.id}`)
                .then(data => {
                    console.log(data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    sendCreateRequest = async () => {
        try {
            let response = await axios.post('/films', {
                name: this.state.name,
                yearOfIssue: this.state.yearOfIssue,
                format: this.state.format,
                actors: this.state.actors
            });
            console.log(response);
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
            alert('error occured, check devtools console');
            console.log(error);
        }
    }

    sendEditRequest = async () => {
        try {
            let response = await axios.patch(`/films/${this.props.currentFilm.id}`, this.props.currentFilm);
            console.log(response);
            this.setState({
                done: true
            });
        } catch (error) {
            console.log(error);
        }
    }

    activateButton = () => {
        if (this.state.mode == 'create') {
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
        this.setState({
            name: event.target.value
        });
        this.props.currentFilm.name = event.target.value;
    }

    onYearChanged = (event) => {
        this.setState({
            yearOfIssue: event.target.value
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

    render() {
        if(this.state.done) {
            return (<Redirect to={`/films/${this.state.id}`} />)
        }
        return (
            <div>
                <BForm>
                    <BForm.Group controlId="exampleBForm.ControlInput1">
                        <BForm.Label>Film name</BForm.Label>
                        <BForm.Control type="text" placeholder="Titanic" onChange={this.onNameChanged} value={
                            this.state.mode != 'create' ? this.props.currentFilm.name : null
                        } />
                    </BForm.Group>
                    <BForm.Group>
                        <BForm.Label>Year of issue</BForm.Label>
                        <BForm.Control type="number" placeholder="1997" onChange={this.onYearChanged} value={
                            this.state.mode != 'create' ? this.props.currentFilm.yearOfIssue : null
                        } />
                    </BForm.Group>
                    <BForm.Group controlId="exampleBForm.ControlSelect1">
                        <BForm.Label>Format</BForm.Label>
                        <BForm.Control as="select" onChange={this.onFormatChanged} value={
                            this.state.mode != 'create' ? this.props.currentFilm.format : null
                        }>
                            <option value="VHS">VHS</option>
                            <option value="DVD">DVD</option>
                            <option value="Blu-Ray">Blu-Ray</option>
                        </BForm.Control>
                    </BForm.Group>
                    <BForm.Group>
                        <BForm.Label>Actors</BForm.Label>
                        <BForm.Control type="text" placeholder="Kate Winslet, Leonardo DiCaprio" onChange={this.onActorsChanged} value={
                            this.state.mode != 'create' ? this.props.currentFilm.actors : null
                        } />
                    </BForm.Group>
                    {this.activateButton()}
                </BForm>
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

export default connect(mapToStateProps, mapDispatchToActions)(Form);