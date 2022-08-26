import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./contexts/AppContext"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AppContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</AppContextProvider>
	</React.StrictMode>
);
