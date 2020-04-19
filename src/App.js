import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

	const [repositores, setRepositories] = useState([]);

	useEffect(()=>{
		api.get('repositories').then(resp=>{
			setRepositories(resp.data);
		})
	},[]);

	async function handleAddRepository() {
		const resp = await api.post('/repositories',{
			title:"ReactJs",
			url:"https://reactjs.org/",
			techs:"reactjs"
		});
		setRepositories([...repositores, resp.data ])
	}

	async function handleRemoveRepository(id) {
		await api.delete(`repositories/${id}`)
		setRepositories(repositores.filter(repository => repository.id !== id))
	}

	return (
	<div>
		<ul data-testid="repository-list">
		{repositores.map(repository=>(
			<li key={repository.id}>
				{repository.title}

				<button onClick={() => handleRemoveRepository(repository.id)}>
				Remover
				</button>
			</li>
		))}
		</ul>

		<button onClick={handleAddRepository}>Adicionar</button>
	</div>
	);
}

export default App;
