import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./searchByLetter.module.css";
import { SearchRecipeCard } from "../../components/molecules/searchRecipeCard";

export function SearchByLetter() {
  const [recipeName, setRecipeName] = useState("");
  const [recipesFinded, setRecipesFinded] = useState([]);
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  async function handleSearch() {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${recipeName}`
      );
      setRecipesFinded(response.data.meals);
      console.log(recipesFinded);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleSearch();
  }, [recipeName]);

  return (
    <div className={styles.container_geral_search_name}>
      <div className={styles.container_search_name}>
        <div>
          <h2>Pesquisar receitas por letra:</h2>
          {letters.map((letter) => (
            <button onClick={() => setRecipeName(letter)} key={letter}>
              {letter}
            </button>
          ))}
        </div>
        <div className={styles.container_search_meals}>
          {recipesFinded ? (
            recipesFinded.map((recipe: any) => (
              <SearchRecipeCard
                titulo={recipe.strMeal}
                image={recipe.strMealThumb}
                key={recipe.idMeal}
              />
            ))
          ) : (
            <p>Não foi encontrada nenhuma receita.</p>
          )}
        </div>
      </div>
      <div>
        {/* <img src={image} alt="" /> */}
      </div>
    </div>
  );
}