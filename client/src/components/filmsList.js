import React from 'react';
import axios from '../utils/axios';
import { Link } from 'react-router-dom';
import { ListGroup, Row, Col, Button, InputGroup } from 'react-bootstrap';

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
        console.log('mount');
        this.loadFilms(1);
    }

    handleSort = (event) => {
        this.setState({
            sort: event.target.checked,
            page: 1
        }, () => {
            this.loadFilms(this.state.page);
        });
    }

    loadFilms = (page, more = false) => {
        axios.get(`/films/?page=${page}&sort=${this.state.sort}`)
            .then(data => {
                console.log(data);
                if (more) {
                    this.setState({
                        films: this.state.films.concat(data.data.docs)
                    });
                } else {
                    this.setState({
                        films: data.data.docs,
                        page: data.data.page,
                        totalPages: data.data.totalPages
                    });
                }
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
                <Button variant="outline-primary" onClick={this.handleClick}>
                    Load more
                </Button>
            );
        } else {
            return '';
        }
    }

    resetList = (event) => {
        this.setState({
            more: false,
            sort: false
        })
        this.loadFilms(1);
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <InputGroup>
                            <InputGroup.Checkbox onChange={this.handleSort} />
                            <InputGroup.Text id="basic-addon2">Sort</InputGroup.Text>
                        </InputGroup>
                    </Col>
                    <Col>
                        <Button variant="outline-info" as={Link} to="/form">create form</Button>
                    </Col>
                </Row>
                <ListGroup>
                    {this.state.films.map(el => {
                        return (
                            <div key={el.film_id}>
                                <ListGroup.Item>
                                    <Link to={"/films/" + el.film_id}>
                                        Name: {el.name}
                                    </Link>
                                </ListGroup.Item>
                            </div>
                        )
                    })}
                </ListGroup>
                {this.canLoadMore()}
                <Button variant="outline-primary" onClick={this.resetList}>Reset list</Button>
            </div>
        );
    }
}


export default FilmsList;   


// const mapToStateProps = store => {
//     return {
//         filmsList: store.filmsList
//     }
// }

// const mapDispatchToActions = dispatch => {
//     return {
//         setFilmsActions: films => dispatch(setFilms(films)),
//         addFilmsAction: films => dispatch(addFilms(films)),
//         clearFilmsAction: () => dispatch(clearFilms()),
//         setPageAction: (page) => dispatch(setPage(page)),
//         setPagesAction: (pages) => dispatch(setPages(pages))
//     }
// }

// export default connect(mapToStateProps, mapDispatchToActions)(FilmsList);