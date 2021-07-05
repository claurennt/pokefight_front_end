import React from "react";
import { Switch, Route } from "react-router-dom";
import ChooseFighter from "./components/ChooseFighter";
import FighterPreview from "./components/FighterPreview";

// import FighterDetailed from "./src/components/FighterDetailed";
import Fight from "./components/Fight";
export default function Main({ pokemonList, backendEntryPoint }) {
  return (
    <main>
      <Switch>
        <Route exact path="/">
          <ChooseFighter pokemonList={pokemonList} />
        </Route>
        <Route path="/fight/:id">
          <Fight />
        </Route>
        <Route path="/:id">
          <FighterPreview
            backendEntryPoint={backendEntryPoint}
            pokemonList={pokemonList}
          />
        </Route>

        <Route path="/:id/:info">{/* <FighterDetailed /> */}</Route>
      </Switch>
    </main>
  );
}
