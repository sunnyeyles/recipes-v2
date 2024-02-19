"use client";
import { useEffect, useState } from "react";
import { RecipeType } from "@/types/mainTypes";
import { RecipeCard } from "@/components/custom/recipe-card";
import { Nav } from "../../components/custom/nav";
import { deleteRecipe } from "@/api-client/deleteRecipe";
import { likeRecipe } from "@/api-client/likeRecipe";
import { fetchLikedRecipesInDB } from "@/api-client/fetchLikedRecipes";

const Recipes = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const fetchRecipes = async () => {
    try {
      const response = await fetchLikedRecipesInDB();

      if (response) {
        setRecipes(response);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRecipes();
  }, []);

  // delete recipe
  const handleDelete = (key: string) => {
    deleteRecipe(key);
    console.log("deleted");
  };
  const handleLike = (key: string) => {
    likeRecipe(key);
    console.log("liked");
  };

  return (
    <div>
      <Nav />
      <div className="m-12 flex">
        {!recipes.length && !isLoading ? (
          <div>
            <p className="mt-4 text-lg text-gray-600 text-center">
              Looks like you don't have any liked recipes
            </p>
          </div>
        ) : (
          recipes
            .slice()
            .reverse()
            .map((recipe) => (
              <RecipeCard
                {...recipe}
                recipeName={recipe.recipeName}
                ingredients={recipe.ingredients}
                method={recipe.method}
                key={String(recipe._id)}
                deleteRecipe={() => handleDelete(String(recipe._id))}
                likeRecipe={() => handleLike(String(recipe._id))}
              />
            ))
        )}
      </div>
    </div>
  );
};
export default Recipes;
