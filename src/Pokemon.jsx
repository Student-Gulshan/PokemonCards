import React, { useEffect,useState } from 'react'
import './index.css'
import PokemonCards from './PokemonCards';

const Pokemon = () => {

const API = "https://pokeapi.co/api/v2/pokemon?limit=240";
const [pokemon, setPokemon] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [search, setSearch] = useState("");

const fetchPokemon = async () => {
  try{
    const res = await fetch(API)
    const data = await res.json();
    // console.log(data);

    const detailerPokemonData = data.results.map(async(events) => {
      const res = await fetch(events.url);
      const data = await res.json();
      return data;
           
    })
    //  console.log(detailerPokemonData);
     
     const detailedResponse = await Promise.all(detailerPokemonData);
    //  console.log(detailedResponse);
     setPokemon(detailedResponse);
     setLoading(false);
  }
  catch(err){
    console.log(err);
    setLoading(false);
    setError(err);
  }
}

  useEffect(() => {
    fetchPokemon();
  }, []);

  //search functionality
   const filteredPokemon = pokemon.filter(curPok => curPok.name.toLowerCase().includes(search.toLowerCase()))


  if(error) return <h1>{error.message}</h1>
  
  return (
    <>
    <section className='container'>
      <header>
        <h1>
          Lets Catch Pokemon
        </h1>
      </header>
      <div className='pokemon-search'>
        <input type="text" placeholder='Search Pokemon' value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div>
        <ul className='cards'>
          {
            filteredPokemon.map((events) => {
              return <PokemonCards key={events.id} pokemonData={events}/>
            })
          }
        </ul>
      </div>
    </section>
    </>
  )
}

export default Pokemon
