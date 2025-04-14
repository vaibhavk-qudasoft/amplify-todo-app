import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Amplify } from "aws-amplify";
import amplifyconfig from "./amplifyconfiguration.json";
// import SpeakerColumns from "./components/SpeakerColumns";


if (window.location.hostname === 'localhost') {
    amplifyconfig.aws_cloud_logic_custom = amplifyconfig.aws_cloud_logic_custom.map((config) => {
        config.endpoint = `http://localhost:3001`;
        return config;
    });
}
Amplify.configure(amplifyconfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
        <App />
        {/* <SpeakerColumns/> */}
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
