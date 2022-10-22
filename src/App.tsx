import { Header, BarChart, LineChart, PieChart } from "./components/index";
// import logo from './logo.svg';
import './App.css';

const data = [
  {label: 'A', count: 590},
  {label: 'B', count: 300},
  {label: 'C', count: 350},
  {label: 'D', count: 150},
  {label: 'E', count: 50},
]

function App() {

  return (
    <div className="App">
      <section>
        <Header />
      </section>
      <section>
        <PieChart items={ data } />
        <LineChart items={ data } />
        <BarChart items={ data } />
      </section>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
    </div>
  );
}

export default App;
