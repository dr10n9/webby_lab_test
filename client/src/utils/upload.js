import React from 'react';
import axios from './axios';

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        }
    }

    onChangeHandler = (event) => {
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        });
    }

    onClickHandler = () => {
        let data = new FormData();
        data.append('file', this.state.selectedFile);
        axios.post('/upload', data, {})
            .then(data => {
                console.log(data);
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
            </div>
        )
    }
}

export default Upload;