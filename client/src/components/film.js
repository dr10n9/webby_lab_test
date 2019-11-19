import React from "react";
import axios from '../utils/axios';
import {
    Redirect,
} from 'react-router-dom'
import { Card, ListGroup, Button, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

import {setActors, setFormat, setId, setName, setYear} from '../store/actions/currentFilm';

class Film extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            id: this.props.match.params.id,
            name: '',
            yearOfIssue: '',
            actors: [],
            format: 'VHS',
            err: false,
            deleted: false,
            editing: false
        };
        axios.get(`/films/${this.state.id}`)
            .then(data => {
                console.log(data);
                this.setState({
                    name: data.data.name,
                    yearOfIssue: data.data.yearOfIssue,
                    format: data.data.format,
                    actors: data.data.actors
                });
                this.props.setIdAction(data.data.film_id);
                this.props.setNameAction(data.data.name);
                this.props.setYearAction(data.data.yearOfIssue);
                this.props.setFormatAction(data.data.format);
                this.props.setActorsAction(data.data.actors.join(', '));
                console.log(this.props);
            })
            .catch(err => {
                console.log(err);
            });
    }

    deleteFilm = () => {
        axios.delete(`/films/${this.state.id}`)
            .then(async data => {
                this.setState({
                    deleted: true
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    editFilm = () => {
        this.setState({
            editing: true
        });
    }
    
    render() {
        if(this.state.deleted) {
            return <Redirect to="/films" />
        }
        if(this.state.editing) {
            return <Redirect to={{
                pathname: `/edit/${this.state.id}`,
                mode: 'edit',
            }} />
        }
        return(
            <div>
                <Card style={{width: '18rem'}}>
                    <Card.Body>
                        <Card.Title>
                            {this.state.name}
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            {this.state.yearOfIssue} | {this.state.format}
                        </Card.Subtitle>
                        <ListGroup>
                            {this.state.actors.map((el, i) => {
                                return <ListGroup.Item key={i}>{el}</ListGroup.Item>
                            })}
                        </ListGroup>
                        <ButtonGroup>
                            <Button variant="outline-info" onClick={this.editFilm}>Edit</Button>
                            <Button variant="outline-danger" onClick={this.deleteFilm}>Delete</Button>
                        </ButtonGroup>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}


const mapToStateProps = store => {
    return {
        currentFilm: store.currentFilm,
        filmsList: store.filmsList
    }
}

const mapDispatchToActions = dispatch => {
    return {
        setNameAction: name => dispatch(setName(name)),
        setFormatAction: format => dispatch(setFormat(format)),
        setYearAction: year => dispatch(setYear(year)),
        setActorsAction: actors => dispatch(setActors(actors)),
        setIdAction: id => {console.log('setIdAction: ', id); dispatch(setId(id))}
    };
};

export default connect(mapToStateProps, mapDispatchToActions)(Film);