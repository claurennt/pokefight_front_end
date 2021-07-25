import React from "react";
import { Switch, Route } from "react-router-dom";
import ChooseFighter from "./components/ChooseFighter";
import FighterPreview from "./components/FighterPreview";

// import FighterDetailed from "./src/components/FighterDetailed";
import Fight from "./components/Fight";
export default function Main({ pokemonList, leaderboard, winnersList }) {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <ChooseFighter
            pokemonList={pokemonList}
            leaderboard={leaderboard}
            winnersList={winnersList}
          />
        </Route>
        <Route path="/fight/">
          <Fight />
        </Route>
        <Route path="/:id">
          <FighterPreview pokemonList={pokemonList} />
        </Route>
      </Switch>
    </>
  );
}
