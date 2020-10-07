import React from 'react';
import ReactDOM from 'react-dom';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SurveyForm from "./SurveyForm";

function App() {
  return (
    <div className="container">
      <br />
      <SurveyForm />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

