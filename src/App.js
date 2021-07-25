import "./css/App.css";
import { useState, useEffect, Fragment } from "react";
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";
import React from "react";
// Can be a string as well. Need to ensure each key-value pair ends with ;

import CssBaseline from "@material-ui/core/CssBaseline";

import Container from "@material-ui/core/Container";

import axios from "axios";

import Main from "./Main";
import Navigation from "./Navigation";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function App() {
  const [isFetching, setIsFetching] = useState(true);
  const [pokemonList, setPokemonList] = useState();
  const [leaderboard, setLeaderboard] = useState();
  const [winnersList, setWinnersList] = useState();

  // fetch pokemon from backend
  useEffect(() => {
    axios
      .get("https://pokefight-group4.herokuapp.com/pokemon/")
      .then((data) => {
        console.log(data);
        setPokemonList(data.data);
        setIsFetching(false);
      })
      .catch((err) => {
        setIsFetching(false);
        console.log(err.message);
      });
  }, []);

  // fetch leaderboard from backend
  useEffect(() => {
    axios
      .get("https://pokefight-group4.herokuapp.com/pokemon/game/leaderboard")
      .then((data) => {
        setLeaderboard(data.data);
        const winners = data.data.map((e) => {
          return e["winner"];
        });

        // find occurrence for each winner
        const winnersOccurrences = winners.reduce((obj, winner) => {
          /* at each iterations winner(a key) is equal to itself + 1 it's encountered at every iteration,i.e. is truthy, 
                  otherwise winner is 1*/
          obj[winner] = obj[winner] ? obj[winner] + 1 : (obj[winner] = 1); // obj[winner] = (obj[winner] || 0) + 1;
          return obj;
        }, {});

        //sort winners by num of wins values, found at index 1
        const sortedWinners = Object.entries(winnersOccurrences).sort(
          (a, b) => b[1] - a[1]
        );

        setWinnersList(sortedWinners);
      })
      .catch((err) => {
        setIsFetching(false);
        console.log(err.message);
      });
  }, []);

  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Navigation />
        <div>
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
          {pokemonList && (
            <Main
              leaderboard={leaderboard}
              winnersList={winnersList}
              pokemonList={pokemonList}
            />
          )}
        </div>
      </Container>
    </Fragment>
  );
}

export default App;
