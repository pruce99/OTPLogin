import "./App.css";
import Allroutes from "./Allroutes/Allroutes";
import LoginContextProvider from "./Contexts/LoginContext";

function App() {
  return (
    <div className="App">
      <LoginContextProvider>
        <Allroutes />
      </LoginContextProvider>
    </div>
  );
}

export default App;
