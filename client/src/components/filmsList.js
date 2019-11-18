import React from 'react';
import axios from '../utils/axios';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import { MDBBtn } from 'mdbreact';
import { connect } from 'react-redux';

import { setFilms, addFilms, clearFilms } from '../store/actions/filmsList';

class FilmsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            totalPages: 0,
            films: [],
            sort: false
        };
    }

    componentDidMount = () => {
        this.loadFilms(1);
    }

    handleSort = (event) => {
        this.setState({
            sort: event.target.checked,
            page: 1
        }, () => {
            this.loadFilms(this.loadFilms(this.state.page));
        });
    }

    loadFilms = (page, more = false) => {
        axios.get(`/films/?page=${page}&sort=${this.state.sort}`)
            .then(data => {
                let tmp = data.data.docs.map(el => {
                    return (
                        <div key={el.film_id}>
                            <ListGroup.Item>
                                <Link to={"/films/" + el.film_id}>
                                    Name: {el.name}
                                </Link>
                            </ListGroup.Item>
                        </div>
                    )
                });
                if (more) tmp = this.state.films.concat(tmp);
                this.setState({
                    films: tmp,
                    page: data.data.page,
                    totalPages: data.data.pages
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleClick = () => {
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.loadFilms(this.state.page, true);
        });
    }

    canLoadMore = () => {
        if (this.state.page < this.state.totalPages) {
            return (
                <MDBBtn outline onClick={this.handleClick}>
                    Load more
                </MDBBtn>
            );
        } else {
            return '';
        }
    }

    render() {
        return (
            <div>
                Sort  <input type="checkbox" type="checkbox" onChange={this.handleSort} />
                <ListGroup>
                    {this.state.films}
                </ListGroup>
                {this.canLoadMore()}
            </div>
        );
    }
}

const mapToStateProps = store => {
    return {
        filmsList: store.filmsList
    }
}

const mapDispatchToActions = dispatch => {
    return {
        setFilmsActions: films => dispatch(setFilms(films)),
        addFilmsAction: films => dispatch(addFilms(films)),
        clearFilmsAction: () => dispatch(clearFilms())
    }
}

export default connect(mapToStateProps, mapDispatchToActions)(FilmsList);