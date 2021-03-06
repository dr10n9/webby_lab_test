import React from 'react';
import axios from '../utils/axios';
import { Link } from 'react-router-dom';
import { MDBBtn, MDBListGroup, MDBFormInline } from 'mdbreact';
import { ListGroup } from 'react-bootstrap';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filmName: '',
            actorName: '',
            result: [],
            page: 0,
            pages: 0,
            searchingBy: '',
            typingStarted: false
        };

    }

    handleActorName = (event) => {
        this.setState({
            typingStarted: true,
            actorName: event.target.value,
            page: 1
        }, () => {
            this.searchByActorName(this.state.page);
        });
    }

    handleFilmName = (event) => {
        this.setState({
            typingStarted: true,
            filmName: event.target.value,
            page: 1
        }, () => {
            this.searchByFilmName(this.state.page);
        });
    }

    searchByFilmName = (page, more = false) => {
        this.setState({
            searchingBy: 'filmName'
        }, () => {
            axios.get(`/search/searchByName?name=${this.state.filmName}&page=${page > 0 ? page : 1}`)
                .then(data => {
                    console.log(data);
                    let tmp = data.data.docs.map(el => {
                        return (
                            <div key={el.film_id}>
                                <ListGroup.Item>
                                    <Link to={`/films/${el.film_id}`}>Name: {el.name}</Link>
                                </ListGroup.Item>
                            </div>
                        );
                    });
                    if (more) tmp = this.state.result.concat(tmp);
                    this.setState({
                        result: tmp,
                        page: data.data.page,
                        pages: data.data.totalPages
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        });

    }

    searchByActorName = (page, more = false) => {
        this.setState({
            searchingBy: 'actor'
        }, () => {
            axios.get(`/search/searchByActor?actorName=${this.state.actorName}&page=${page > 0 ? page : 1}`)
                .then(data => {
                    let tmp = data.data.docs.map(el => {
                        return (
                            <div key={el.film_id}>
                                <ListGroup.Item>
                                    <Link to={`/films/${el.film_id}`}>Name: {el.name}</Link>
                                </ListGroup.Item>
                            </div>
                        );
                    });
                    if (more) tmp = this.state.result.concat(tmp);
                    this.setState({
                        result: tmp,
                        page: data.data.page,
                        pages: data.data.pages
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        });
    }

    canLoadMore = () => {
        if (this.state.page < this.state.pages) {
            return (
                <MDBBtn outline onClick={this.moreClicked}>
                    Load more
                </MDBBtn>
            );
        } else {
            return '';
        }
    }

    moreClicked = () => {
        this.setState({
            page: this.state.page + 1
        }, () => {
            if (this.state.searchingBy === 'actor') this.searchByActorName(this.state.page, true);
            else this.searchByFilmName(this.state.page, true);
        });

    }

    renderResult = () => {
        if (!this.state.typingStarted) {
            return <div>Start typing to search</div>
        } else {
            if (this.state.result.length === 0) {
                return <div>Nothing found</div>
            } else {
                return (
                    <div>
                        <MDBListGroup>
                            {this.state.result}
                        </MDBListGroup>
                        { this.canLoadMore() }
                    </div>
                    
                )

            }
        }
    }

    render() {
        return (
            <div>
                <MDBFormInline className="md-form">
                    <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="FilmName" aria-label="Search"
                        onChange={this.handleFilmName} />
                    <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="ActorName" aria-label="Search"
                        onChange={this.handleActorName} />
                </MDBFormInline>
                {this.renderResult()}
            </div>
        )
    }
}

export default Search;
