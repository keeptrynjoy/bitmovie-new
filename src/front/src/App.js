import './App.css';
import RouterMain from "./routers/RouterMain";
import {BrowserRouter} from "react-router-dom";
import ScrollTop from "./service/ScrollTop";

function App() {

  return (
      <BrowserRouter>
          <ScrollTop/>
        <RouterMain/>
      </BrowserRouter>
  );
}

export default App;
