import React from "react";
import { Switch, Route } from "react-router-dom";
import ChooseFighter from "./components/ChooseFighter";
// import FighterPreview from "./src/components/Fighterpreview";
// import FighterDetailed from "./src/components/FighterDetailed";
// import Fight from "./src/components/Fight";
export default function Main({ pokemonList }) {
  console.log(pokemonList);
  return (
    <main>
      <Switch>
        <Route path="/">
          <ChooseFighter pokemonList={pokemonList} />
        </Route>
        <Route path="/:id">{/* <FighterPreview /> */}</Route>
        <Route path="/:id/:info">{/* <FighterDetailed /> */}</Route>
        <Route path="/fight">{/* <Fight /> */}</Route>
      </Switch>
    </main>
  );
}
