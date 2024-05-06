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


	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>Name</label><br />
				<input type="text" name="name" id="name" placeholder="name" value={formData.name} onChange={handleChange} />
				<br/>
				<label htmlFor="type">Choose a type:</label>
				<select type="type" name="type" id="type" onChange={handleChange}>
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
				<label htmlFor="img">Image:</label>
				<select>
					<option disabled selected hidden >Choose an Image</option>
					{images.map((image) =>(
						<option>{image}</option>
					))}
				</select>
				<br/>
				<button type="submit">Create</button>
			</form>
		</>
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