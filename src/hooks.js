import { useState, useEffect } from "react";
import axios from "axios";
import { v1 as uuid } from "uuid";

function useFlip() {
  const [notFlipped, flipCard] = useState(true);
  const toggle = () => {
    flipCard((notFlipped) => !notFlipped);
  };
  return [notFlipped, toggle];
}

function useAxios(name = null) {
  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify([]));
    localStorage.setItem("pokemonCards", JSON.stringify([]));
  }, []);
  const [cards, setCards] = useState([]);
  if (name === null) {
    const addCard = async () => {
      const response = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/draw/"
      );

      const existingCards = JSON.parse(localStorage.getItem("cards"));
      const withExtraCard = [
        ...existingCards,
        { ...response.data, id: uuid() },
      ];
      localStorage.setItem("cards", JSON.stringify(withExtraCard));
      setCards(withExtraCard);
    };
    return [cards, addCard];
  }
  const addPokemonCard = async (pokemonName) => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`
    );

    const existingPokemonCards = JSON.parse(
      localStorage.getItem("pokemonCards")
    );
    const withExtraPokemonCard = [
      ...existingPokemonCards,
      { ...response.data, id: uuid() },
    ];
    localStorage.setItem("pokemonCards", JSON.stringify(withExtraPokemonCard));
    setCards(withExtraPokemonCard);
  };
  return [cards, addPokemonCard];
}

export { useFlip, useAxios };
