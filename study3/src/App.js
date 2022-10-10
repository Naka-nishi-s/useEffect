import React, { useState, useEffect } from "react";
import "./App.css";
import Recipe from "./Recipe";

function App() {
  const APP_ID = "60481ec4";
  const APP_KEY = "0e8f0b75299b3886f2289fc416fb6a0c";

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("banana");
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q="${query}"&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  const updateSearch = (e) => {
    setSearch(e.currentTarget.value);
  };

  useEffect(() => {
    getRecipes();
  }, [query]);

  return (
    <div className="App">
      <form onSubmit={getSearch}>
        <input type="text" value={search} onChange={updateSearch} />
        <button type="submit">検索</button>
      </form>
      <div>
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
