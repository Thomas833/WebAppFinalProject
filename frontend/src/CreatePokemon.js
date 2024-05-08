import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const BASE_URL = 'http://localhost:3001';
//const imageArr = ["images/001-bulbasaur.png", "images/002-ivysaur.png"];


export default function CreatePokemon() {

	const images = useLoaderData();

	const initialFormData = {
		name: '',
		type:null,
		image: null,
		wins: 0,
	};

	const initialResultMessage = {
		msg: '',
		newId: null,
	};
	// INFO: Rather than use separate hooks, let's jam the state together
	const [formData, setFormData] = useState(initialFormData);
	const [message, setMessage] = useState(initialResultMessage);

	const handleChange = (event) => {
		const name = event.target.name;
		switch (name) {
			case 'name':
				setFormData({
					...formData,
					name: event.target.value,
				});
				break;
			case 'type':
				setFormData({
					...formData,
					type: event.target.value,
				});
				break;
			case 'img':
				var imagePath = event.target.value;
				var splitArr = imagePath.split("\\");
				//console.log(splitArr[splitArr.length -1]);
				setFormData({
					...formData,
					image: event.target.value,
				});
				break;
			default:
				return;
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const result = await fetch(`${BASE_URL}/createPokemon`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});
		if (result.status !== 201) {
			setMessage({ msg: "Failed to create...", newId: null });
			return;
		}
		setFormData(initialFormData);
		//console.log("reset data");
	}
	
	const pageStyle = {
    	body: {
      		backgroundColor: "#1e1e1e",
      		color: "#fff",
      		fontFamily: "Arial, sans-serif"
    	},
    	form: {
      		padding: "20px"
    	},
    	label: {
    	  	marginBottom: "5px"
    	},
    	input: {
    	  	marginBottom: "10px",
    	  	padding: "5px",
    	  	width: "100%",
    	  	boxSizing: "border-box",
    	  	borderRadius: "5px",
    	  	border: "1px solid #333",
    	  	backgroundColor: "#444",
    	  	color: "#fff"
    	},
    	select: {
    	  	marginBottom: "10px",
    	  	padding: "5px",
    	  	width: "100%",
    	  	boxSizing: "border-box",
    	  	borderRadius: "5px",
    	  	border: "1px solid #333",
    	  	backgroundColor: "#444",
    	  	color: "#fff"
    	},
    	button: {
    	  	padding: "10px 20px",
    	  	backgroundColor: "#333",
    	  	color: "#fff",
    	  	borderRadius: "5px",
    	  	border: "none",
    	  	cursor: "pointer"
    	}
  	};

	return (
		<div style={pageStyle.body}>
			<form style={pageStyle.form} onSubmit={handleSubmit}>
				<label> style={pageStyle.label} Name</label><br />
				<input style={pageStyle.input} type="text" name="name" id="name" placeholder="name" value={formData.name} onChange={handleChange} />
				<br/>
				<label style={pageStyle.label} htmlFor="type">Choose a type:</label>
				<select style={pageStyle.select} type="type" name="type" id="type" onChange={handleChange}>
					<option disabled selected hidden >Choose an option</option>
					<option value="Water">Water</option>
					<option value="Fire">Fire</option>
					<option value="Bug">Bug</option>
					<option value="Flying">Flying</option>
					<option value="Normal">Normal</option>
					<option value="Electric">Electric</option>
					<option value="Ground">Ground</option>
				</select>
				<br/>
				<label style={pageStyle.label} htmlFor="img">Image:</label>
				<select style={pageStyle.select}>
					<option disabled selected hidden >Choose an Image</option>
					{images.map((image) =>(
						<option>{image}</option>
					))}
				</select>
				<br/>
				<button style={pageStyle.button} type="submit">Create</button>
			</form>
		</div>
	)
}


export async function LoadImages() {
	const result = await fetch(`${BASE_URL}/createPokemon`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await result.json();
}