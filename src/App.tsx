import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BarChart, PieChart } from "./components/index";

function App() {



  return (
    <div className="App">
      <BarChart />
      <PieChart />
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
    </div>
  );
}

export default App;
