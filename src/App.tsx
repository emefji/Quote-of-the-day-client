import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Title from "./components/Title";
import List from "./components/List";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { io } from "socket.io-client";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";
import CommentsPage from "./components/CommentsPage";
import socket from "./functions/socket_connection";
function App() {

	const [fingerprint, setFingerprint] = useState("")

	useEffect(() => {

		socket.emit("ping", "ping");
		socket.emit("ping", "ping");

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

		<Router>
			<Switch>
				<Route path="/comments/:id" component={CommentsPage} />
				
				<Route path="/">
					<div className="App">
						<Title Title={"Quote of the day"} />
						<List fingerprint={fingerprint}/>
					</div>
				</Route>
			</Switch>
		</Router>
  	);
}

export default App;
