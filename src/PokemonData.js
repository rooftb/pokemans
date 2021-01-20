import React, { useEffect, useState, useContext } from 'react';
import Pokemon from './Pokemon.js';
import Loader from './Loader';
import { AppContext, AppProvider } from './AppContext';

export default function Pokemen() {
  const [pokemonData, setPokemonData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const context = useContext(AppContext);

  let nums = context.nums.split(',');

  useEffect(() => {
    fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${nums[0]}?&offset=${nums[1]}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPokemonData(data.results);
        setLoading(!loading);
      })
      .catch((err) => {
        setError(error);
        setLoading(!loading);
      });
  }, [context]);

  return (
    <div className='d-flex justify-content-center align-items-center align-content-between flex-wrap'>
      {loading ? <Loader /> : <div>{error}</div>}
      {pokemonData &&
        pokemonData.map((pokemon) => (
          <Pokemon key={pokemon.id} details={pokemon} />
        ))}
    </div>
  );
}
