import { useEffect, useRef, useState } from 'react';

import { CATEGORY_MAP, FoodCategory } from '.';

type Recipe = {
  strMeal: string;
  idMeal: string;
};

export const apiUrl = 'https://www.themealdb.com/api/json/v1/1';

const useRecipes = (category: FoodCategory) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] =
    useState<FoodCategory>('seafood');
  const mountedRef = useRef(false);

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);

    try {
      const categoryName = CATEGORY_MAP[category];
      const response =
        categoryName === 'Intercontinental'
          ? await fetch(`${apiUrl}/search.php?s=`)
          : await fetch(`${apiUrl}/filter.php?c=${categoryName}`);

      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();

      if (!data.meals || data.meals.length === 0) {
        throw new Error('No recipes found for this category');
      }
      setRecipes(data.meals);
      setCurrentCategory(category);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    fetchRecipes();
  }, [category]);

  return { recipes, loading, error, currentCategory };
};

export default useRecipes;
