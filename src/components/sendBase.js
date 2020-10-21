import axios from 'axios'; 

import React,{Component} from 'react'; 

class SendFile extends Component { 

	state = { 

	// Initially, no file is selected 
	selectedFile: null
	}; 
	
	// On file select (from the pop up) 
	onFileChange = event => { 
	
	// Update the state 
	this.setState({ selectedFile: event.target.files[0] }); 
	
	}; 
	
	// On file upload (click the upload button) 
	onFileUpload = () => { 
	
	// Create an object of formData 
	const formData = new FormData(); 
	
    // Update the formData object 
    
    var content = '<a id="a"><b id="b">hey!</b></a>'; // содержимое нового файла...
    var blob = new Blob([content], { type: "text/xml"});

	formData.append(
        "base", 
        this.state.selectedFile
	
	); 
	
	// Details of the uploaded file 
	console.log(formData); 
	
	// Request made to the backend api 
	// Send formData object 
    axios.post("http://localhost:8888/.netlify/functions/uploadfile",formData); 
    }; 
	
	// File content to be displayed after 
	// file upload is complete 
	fileData = () => { 
	
	if (this.state.selectedFile) { 
		
		return ( 
		<div> 
			<h2>File Details:</h2> 
			<p>File Name: {this.state.selectedFile.name}</p> 
			<p>File Type: {this.state.selectedFile.type}</p> 
			<p> 
			Last Modified:{" "} 
			{this.state.selectedFile.lastModifiedDate.toDateString()} 
			</p> 
		</div> 
		); 
	} else { 
		return ( 
		<div> 
			<br /> 
			<h4>Choose before Pressing the Upload button</h4> 
		</div> 
		); 
	} 
	}; 
	
	render() { 
	
	return ( 
		<div> 
			
			<form action="http://localhost:8888/.netlify/functions/uploadfile" method="post" enctype="multipart/form-data" > 
				<input type="file"  name="upload" /> 
				<input type="submit" value="upload" /> 
				
				
			</form> 
		{this.fileData()} 
		</div> 
	); 
	} 
} 

export default SendFile; 
