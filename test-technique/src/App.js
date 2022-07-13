import React from "react";
import './App.css';
import Codestation from './Composants/Codestation'

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
			
			<h1><center className="titre">Les stations situées à la Gironde - prise de températures des cours d'eau - office de tourisme</center> </h1><hr/>
		
			{
				items.map((item) => (
					<h2>{item.libelle_station}
					<Codestation codeStation={item.code_station}></Codestation></h2>
				))
			}
		</div>
	);
}
}

export default App;
