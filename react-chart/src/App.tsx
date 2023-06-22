import React from 'react';
import { Header, BarChart, LineChart, PieChart, DoughnutChart } from "./components/index";
// import logo from './logo.svg';
import './App.css';

const data = [
  {label: 'A', value: 590},
  {label: 'B', value: 300},
  {label: 'C', value: 350},
  {label: 'D', value: 150},
  {label: 'E', value: 50},
  {label: 'F', value: 250},
]

function App() {

  return (
    <div className="App">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <section>
        <Header />
      </section>
      <section className="app--section">
        <PieChart items={ data } />
        <LineChart items={ data } />
        <BarChart items={ data } />
        <DoughnutChart items={ data } />
      </section>
    </div>
  );
}

export default App;
