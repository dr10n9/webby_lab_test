import React from "react";
import Navbar from './components/navbar';
import { Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';




export default function App() {
    return (
        <Container>
            <Navbar /> <br />
        </Container>
    );
}
