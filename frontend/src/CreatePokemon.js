import { useState } from "react"
const BASE_URL = 'http://localhost:3001';
export default function CreatePokemon() {
	const initialFormData = {
		name: '',
		type:'',
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
		const type = event.target.type;
		switch (type) {
			case 'text':
				if (event.target.id === "name"){
				setFormData({
					...formData,
					name: event.target.value,
				});
				}
				break;
			case 'select':
				setFormData({
					...formData,
					type: event.target.type,
				});
				break;
			case 'file':
				setFormData({
					...formData,
					image: event.target.image,
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
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>Name</label><br />
				<input type="text" id="name" placeholder="name" value={formData.name} onChange={handleChange} />
				<br/>
				<label htmlFor="type">Choose a type:</label>
				<select type="select" name="type" id="type">
					<option value="water">Water</option>
					<option value="fire">Fire</option>
					<option value="bug">Bug</option>
					<option value="flying">Flying</option>
					<option value="normal">Normal</option>
					<option value="electric">Electric</option>
					<option value="ground">Ground</option>
				</select>
				<br/>
				<label htmlFor="img">Select image:</label>
  				<input type="file" id="img" name="img" accept="image/*"></input>
				<br/>
				<button type="submit">Create</button>
			</form>
		</>
	)
}