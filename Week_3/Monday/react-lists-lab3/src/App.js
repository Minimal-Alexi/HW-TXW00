// src/App.js
import TourList from "./Components/TourList";
import { tours } from "./Components/toursData";
import "./App.css";

function App() {
  return (
    <main>
      <TourList tours={tours} />
    </main>
  );
}

export default App;