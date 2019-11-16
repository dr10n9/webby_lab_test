import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from "react-router-dom";
import Film from './film.js';
import FilmsList from './filmsList';


class Navbar extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/films">Film</NavLink>
                            </li>
                        </ul>
                    </nav>

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/films/:id" component={Film} />
                        {/* <Router path="/films/:id">
                            <Film />
                        </Router> */}
                        <Route path="/films" component={FilmsList} />
                        <Route path="/">
                            Home
                        </Route>

                    </Switch>
                </div>
            </Router>
        )
    }
}

export default Navbar;