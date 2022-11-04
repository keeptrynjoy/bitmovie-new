import './App.css';
import {useState} from "react";
import axios from "axios";
import Movie from "./movie";
function App() {
  const [id,setid]=useState();
  const selectall=()=> {
    axios.get("/select")
        .then((res) => {
          console.log(res.data);
          console.log("000");
        })
  }
  return (
      <div className="App">
        <button type={"button"} onClick={selectall}>select</button>
        <h1>Hello World!</h1>
        <h1>Hello World!</h1>
        <h1>Hello World!</h1>
        <Movie/>
      </div>
  );
}

export default App;
