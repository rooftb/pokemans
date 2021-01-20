import React, { useEffect, useState, useContext } from 'react';
import Pokemon from './Pokemon.js';
import { AppContext, AppProvider } from './AppContext';

export default function Pokemen(props) {
  const [pokemonData, setPokemonData] = useState();

  const context = useContext(AppContext);

  let nums = context.nums.split(',');

  useEffect(() => {
    fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${nums[0]}?&offset=${nums[1]}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPokemonData(data.results);
      });
  }, [context]);

  return (
    <div className='d-flex justify-content-center align-items-center align-content-between flex-wrap'>
      {pokemonData &&
        pokemonData.map((pokemon) => (
          <Pokemon key={pokemon.id} details={pokemon} />
        ))}
    </div>
  );
}
