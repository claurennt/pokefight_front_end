import "./css/App.css";
import { useState, useCallback, useEffect, Fragment } from "react";
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import axios from "axios";

import Main from "./Main";
import Navigation from "./Navigation";
const backendEntryPoint = `http://localhost:3001/pokemon`;

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function App() {
  const [isFetching, setIsFetching] = useState(true);
  const [pokemonList, setPokemonList] = useState();

  const fetchData = useCallback(async () => {
    try {
      const retrievedPokemons = await axios.get(backendEntryPoint);
      setPokemon(retrievedPokemons.data);
      setIsFetching(false);
      setPokemonList(data);
    });
    // fetchData();

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  console.log(pokemonList);
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Navigation />
        {isFetching && (
          <div className="sweet-loading">
            <FadeLoader
              color="maroon"
              loading={true}
              css={override}
              size={150}
            />
          </div>
        )}
        {!isFetching && (
          <Main
            backendEntryPoint={backendEntryPoint}
            pokemonList={pokemonList}
          ></Main>
        )}
      </Container>
    </Fragment>
  );
}

export default App;

// example icon use <span class="material-icons">face</span>
