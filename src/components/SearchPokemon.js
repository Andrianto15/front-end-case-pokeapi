import { useState } from "react";
import axios from "axios";

const baseUrl = "https://pokeapi.co/api/v2/ability/";

export default function SearchPokemon() {
  const [search, setSearch] = useState("");
  const [pokemonName, setPokemonNme] = useState([]);
  const [pokemonEffectEntries, setPokemonEffectEntries] = useState([]);
  const [pokemonFlavorText, setPokemonFlavorText] = useState([]);

  const findPokemon = () => {
    axios({
      method: "GET",
      url: `${baseUrl}${search}`,
    }).then((result) => {
      setPokemonNme(result.data.pokemon);
      setPokemonEffectEntries(result.data.effect_entries);
      setPokemonFlavorText(result.data.flavor_text_entries);
    });
  };

  return (
    <div>
      <h1>POKEMON KOMPONEN</h1>
      <div>
        <input placeholder="cari skill" onChange={(x) => setSearch(x.target.value)} />
        <button onClick={() => findPokemon()}>Find!</button>
      </div>
      <br />
      <div>
        <b>Nama Pokemon:</b>
        <br />
        {pokemonName.map((data, i) => {
          return <span key={i}>{data.pokemon.name}, </span>;
        })}
      </div>
      <div>
        <b>Pokemon Effect Entries:</b>
        <br />
        {pokemonEffectEntries.map((data, i) => {
          return <span key={i}>{data.short_effect}, </span>;
        })}
      </div>
      <div>
        <b>Pokemon Flavor Text:</b>
        <br />
        {pokemonFlavorText.map((data, i) => {
          if (data.language.name == "en") {
            return <span key={i}>{data.flavor_text}, </span>;
          }
        })}
      </div>
    </div>
  );
}
