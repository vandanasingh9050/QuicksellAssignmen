import logo from "./logo.svg";
import "./App.css";
import Card from "./Card/card";
import CanbanBoard from "./Canbanboard/CanbanBoard";
function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      <CanbanBoard />
    </h1>
  );
}

export default App;
