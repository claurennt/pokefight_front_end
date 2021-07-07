import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <NavLink to="/">
      <img
        src="https://cdn.emojidex.com/emoji/seal/Pokeball.png"
        alt="pokeball"
        width="40px"
        style={{ position: "relative", float: "left" }}
      />
      <h1>PokeFight </h1>
    </NavLink>
  );
}
