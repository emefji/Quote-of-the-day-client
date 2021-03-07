import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Title from "./components/Title";
import List from "./components/List";
import FingerprintJS from '@fingerprintjs/fingerprintjs';

function App() {

	const [fingerprint, setFingerprint] = useState("")

	useEffect(() => {

		(async () => {
			// We recommend to call `load` at application startup.
			const fp = await FingerprintJS.load();
		  
			// The FingerprintJS agent is ready.
			// Get a visitor identifier when you'd like to.
			const result = await fp.get();
		  
			// This is the visitor identifier:
			setFingerprint(result.visitorId);
		  })();
		
		return () => {
			
		}
	}, [])

  	return (
    	<div className="App">
			<Title Title={"Quote of the day"} />
			<List fingerprint={fingerprint}/>
		</div>
  	);
}

export default App;
