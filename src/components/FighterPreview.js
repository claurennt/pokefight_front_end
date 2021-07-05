import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import axios from "axios";
export default function FighterPreview({ backendEntryPoint }) {
  const { id } = useParams();

  const [fighterDetail, setFighterDetail] = useState();

  const fetchData = useCallback(async () => {
    try {
      const retrievedPokemon = await axios.get(`${backendEntryPoint}/${id}`);
      setFighterDetail(retrievedPokemon.data);
    } catch (err) {
      console.log(err.message);
    }
  }, [backendEntryPoint, id]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log(fighterDetail);
  return <NavLink to={`./fight/${id}`}>FIGHT!</NavLink>;
}
