import "./css/App.css";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
// import Navigation from "./Navigation";
import Main from "./Main";

const endpoint = `http://localhost:3001/1`;
function App() {
  const [isFetching, setIsFetching] = useState(true);
  const [pokemonList, setPokemon] = useState();

  const fetchData = useCallback(async () => {
    try {
      const retrievedPokemon = await axios.get(endpoint);
      setPokemon(retrievedPokemon.data);
      setIsFetching(false);
    } catch (err) {
      console.log(err.message);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="container-fluid">
      {/* <Navigation></Navigation> */}
      {!isFetching && <Main pokemonList={pokemonList}></Main>}
    </div>
  );
}

export default App;

// example icon use <span class="material-icons">face</span>
