import React from 'react';
import axios from '../utils/axios';
import {} from 'react-router-dom';


class FilmsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            totalPages: 0,
            films: []
        };

        this.loadFilms = this.loadFilms.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
    }

    loadFilms(page) {
        axios.get(`/films/?page=${page}`)
            .then(data => {
                this.setState({
                    films: data.data.docs.map(el => {
                        return (
                            <div key={el.film_id}>
                                <a href={"/films/" + el.film_id}>Name: {el.name}</a>
                            </div>
                        )
                    }),
                    page: data.data.page,
                    totalPages: data.data.pages
                });
                console.log(this.state);
            })
            .catch(err => {
                console.log(err);
            })
    }

    buttonClick() {
        this.loadFilms(1);
    }

    render() {
        return(
            <div>
                <button onClick={this.buttonClick}>load</button> <br/>
                {this.state.films}
            </div>
        );
    }
}

export default FilmsList;