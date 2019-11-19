import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from "react-router-dom";

import Film from './film.js';
import FilmsList from './filmsList';
import Search from './search';
import Upload from '../utils/upload';
import Form from './form';

import { Navbar as BNavbar, Nav, Jumbotron } from 'react-bootstrap'



class Navbar extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <BNavbar bg="light" expand="lg">
                        <BNavbar.Brand as={NavLink} to="/">WebbyLab Test</BNavbar.Brand>
                        <BNavbar.Toggle aria-controls="basic-navbar-nav" />
                        <BNavbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                {/* <Nav.Link as={NavLink} to="/">
                                    Home
                                </Nav.Link> */}
                                <Nav.Link as={NavLink} to="/films">
                                        Films
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/search">
                                        Search
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/upload">
                                        Upload
                                </Nav.Link>
                            </Nav>
                        </BNavbar.Collapse>
                    </BNavbar>


                    <Jumbotron>
                        <Switch>
                            <Route path="/films/:id" component={Film} />
                            <Route path="/films" component={FilmsList} />
                            <Route path="/search" component={Search}></Route>
                            <Route path="/upload" component={Upload}></Route>
                            <Route path="/form">
                                <Form mode={'create'}/>
                            </Route>
                            <Route path="/edit/:id" component={Form}>
                                {/* <Form mode={'edit'} /> */}
                            </Route>
                            <Route path="/">
                                Home
                            </Route>

                        </Switch>
                    </Jumbotron>
                    
                </div>
            </Router>
        )
    }
}

export default Navbar;