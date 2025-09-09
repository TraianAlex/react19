import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

type Recipe = {
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  [key: string]: string;
};

export const HomeDetails = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRecipe = async (id: string): Promise<void> => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch recipe details');
      }
      const data = await response.json();
      if (!data.meals || data.meals.length === 0) {
        throw new Error('Recipe not found');
      }
      setRecipe(data.meals[0]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (recipeId) fetchRecipe(recipeId);
  }, [recipeId]);

  if (loading) {
    return <p>Fetching recipe details......</p>;
  }

  if (error) {
    return <p>Recipe not found.</p>;
  }

  return (
    <div className='d-flex'>
      <div className='me-4' style={{ minWidth: '30%' }}>
        <img
          className='img-fluid'
          src={recipe?.strMealThumb}
          alt={recipe?.strMeal}
        />
      </div>
      <div>
        <h5>Category: {recipe?.strCategory}</h5>
        <p>Area: {recipe?.strArea}</p>
        <p>
          <strong>Instructions:</strong> {recipe?.strInstructions}
        </p>
        <h5>Ingredients:</h5>
        <p>
          {Array.from({ length: 20 }).map((_, index) => {
            const ingredient = recipe?.[`strIngredient${index + 1}`];
            const measure = recipe?.[`strMeasure${index + 1}`];
            return (
              ingredient && (
                <li key={index}>
                  {ingredient} - {measure}
                </li>
              )
            );
          })}
        </p>
      </div>
    </div>
  );
};
