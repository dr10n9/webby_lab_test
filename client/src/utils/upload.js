import React from 'react';
import axios from './axios';
import { Button, Modal } from "react-bootstrap";

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            modal: false,
            count: ''
        }
    }

    onChangeHandler = (event) => {
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        });
    }

    onClickHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();

        let data = new FormData();
        data.append('file', this.state.selectedFile);
        axios.post('/upload', data, {})
            .then(data => {
                console.log(data);
                this.setState({
                    modal: true,
                    count: data.data.created
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    fileName = () => {
        if(this.state.selectedFile) {
            return this.state.selectedFile.name
        } else {
            return 'Choose file'
        }
    }

    render() {
        return (
            <div>
                <form>
                    <input type="file" name="file" onChange={this.onChangeHandler} />
                    <button onClick={this.onClickHandler}>Upload</button>
                </form>
                <Modal
                    show={this.state.modal}
                    dialogClassName="modal-90w"
                    // onHide={() => this.setState({ modal: false })}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Response
                            {/* Oops! You got {this.state.error.code} error! */}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.count} created, check DevTools for info</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({modal: false})}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Upload;