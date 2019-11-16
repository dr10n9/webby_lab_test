import React from "react";
import axios from '../utils/axios';
import {
    NavLink,
    useParams
} from 'react-router-dom'

class Film extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            name: '',
            yearOfIssue: '',
            actors: [],
            err: false
        };
        axios.get(`/films/${this.state.id}`)
            .then(data => {
                console.log(data);
                this.setState({
                    name: data.data.name,
                    yearOfIssue: data.data.yearOfIssue,
                    actors: data.data.actors.map(el => {
                    return <div>{el}</div>
                    })
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
    
    render() {
        return(
            <div>
                Name: {this.state.name}<br/>
                Date of issue: {this.state.yearOfIssue}<br/>
                Actors: {this.state.actors}<br/>
            </div>
        );
    }
}

export default Film;