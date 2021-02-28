import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Title from "./components/Title";
import List from "./components/List";

function App() {
  	return (
    	<div className="App">
			<Title Title={"Quotes"} />
			<List />
		</div>
  	);
}

export default App;
