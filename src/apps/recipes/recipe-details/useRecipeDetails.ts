import { useEffect, useState } from 'react';

import { Recipe } from '.';
import { apiUrl } from '../useRecipes';

const useRecipeDetails = (recipeId: string) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRecipe = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${apiUrl}/lookup.php?i=${id}`);
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

  return { recipe, error, loading };
};

export default useRecipeDetails;
