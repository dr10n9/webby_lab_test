import React from 'react';
import axios from './axios';
import { Button, Modal } from "react-bootstrap";

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            modal: {
                title: '',
                body: '',
                show: false
            },
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

        if (this.state.selectedFile == undefined) {
            this.setState({
                modal: {
                    show: true,
                    title: 'Error',
                    body: 'No file selected'
                }
            });
        }

        // check if file size is more than 5 mb
        else if (this.state.selectedFile.size > 5242880) {
            this.setState({
                modal: {
                    show: true,
                    title: 'Error',
                    body: 'File size should be less then 5 mb'
                }
            });
        } else {
            let data = new FormData();
            data.append('file', this.state.selectedFile);
            axios.post('/upload', data, {})
                .then(data => {
                    console.log(data);
                    this.setState({
                        modal: {
                            show: true,
                            title: 'Response',
                            body: `${data.data.created} created, check DevTools for info`
                        },
                    });
                })
                .catch(err => {
                    err = err.response.data;
                    this.setState({
                        modal: {
                            show: true,
                            title: `${err.type} error: ${err.code}`,
                            body: err.message
                        }
                    })
                });
        }
    }

    fileName = () => {
        if (this.state.selectedFile) {
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
                    show={this.state.modal.show}
                    dialogClassName="modal-90w"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.state.modal.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.modal.body}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ modal: { show: false } })}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Upload;