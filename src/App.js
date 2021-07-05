import "./css/App.css";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
// import Navigation from "./Navigation";
import Main from "./Main";

const endpoint = `http://localhost:3001/pokemon`;
function App() {
  const [isFetching, setIsFetching] = useState(true);
  const [pokemonList, setPokemonList] = useState();

  // const fetchData = useCallback(async () => {
  //   try {
  //     const retrievedPokemon = await axios.get(endpoint);
  //     setPokemon(retrievedPokemon.data);
  //     setIsFetching(false);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }, []);
  useEffect(() => {
    axios.get(endpoint).then(({ data }) => {
      setIsFetching(false);
      setPokemonList(data);
    });
    // fetchData();
  }, []);
  return (
    <div className="container-fluid">
      {/* <Navigation></Navigation> */}
      {!isFetching && <Main pokemonList={pokemonList}></Main>}
    </div>
  );
}

export default App;

// example icon use <span class="material-icons">face</span>
