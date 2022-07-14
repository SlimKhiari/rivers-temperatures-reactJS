import React from "react";
import './App.css';
import Codestation from './Composants/Infosstation'
import Table from 'react-bootstrap/Table';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			items: [],
			EstChargee: false
		};
	}

	componentDidMount() {
		fetch("https://hubeau.eaufrance.fr/api/v1/temperature/station?code_departement=33&size=20&exact_count=true&format=json&pretty")
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					items: json.data,
					EstChargee: true
				});
			})
	}

	render() {
		const { EstChargee, items } = this.state;

		if (!EstChargee) return <div>
			<h1> Erreur de chargement des données depuis l'API.</h1> </div> ;

		return (
		<div className = "App">
			<center> Test Technique In System - Slim Khiari - 14 Juillet 2022</center> <hr/>
			
			<h1><center>Les stations situées à la Gironde - prise de températures des cours d'eau - office de tourisme</center> </h1><hr/>
			<Table striped bordered hover>
				<thead>
				
					<th>Code de la station</th>
					<th>Libellé de la station</th>
					<th>Température</th>
					{
						items.map((item) => (
							<tr> <td>{item.code_station}</td>
							<td>{item.libelle_station}</td>
							<td><Codestation codeStation={item.code_station}></Codestation></td></tr>
						))
					}
				</thead>
			</Table>
		</div>
	);
}
}

export default App;
