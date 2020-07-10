import React, {Component} from 'react';
import {storage} from "./base";

class ImageUpload extends React.Component{
    constructor(props){
        super(props);
        this.state={
            image: null,
            url:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleChange = e =>{
        if(e.target.files[0]){
            const image = e.target.files[0];
            this.setState(()=>({image}));

        }
    }

    handleUpload=() =>{
        const {image} = this.state;
        const uploadTask = storage.ref('images/${image.name}').put(image);
        uploadTask.on('state_changed',
            (snapshot)=>{
                //progress function

            }
            ,
            (error) =>{
                console.log(error);

            },
            () =>{
                storage.ref('images').child(image.name).getDownloadURL().then(url =>{
                    console.log(url)
                })

            });
    }

    render(){
        return(
            <div>
                <input type="file" onChange={this.handleChange} />
                <button onClick={this.handleUpload}>Upload</button>
                <br/>
                <ima src={this.state.url} alt="Uploaded images" />
            </div>
        )
    }
}

export default ImageUpload