import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import LoadingSpinner from '../../loading-spinner';
import { apiUrl } from '..';

type Recipe = {
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  [key: string]: string;
};

const HomeDetails = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // Get the state by navigate - location
  const navigate = useNavigate();
  const location = useLocation();
  // Access the state passed via Link
  const recipeByButton = (location.state || {}).recipe as Recipe;

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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>Recipe not found.</p>;
  }

  // Handle cases where the state is missing
  if (!recipeByButton && !recipe) {
    return (
      <h2 className='d-flex justify-content-center align-items-center vh-100'>
        Recipe data not found.{' '}
        <button className='btn btn-primary ms-3' onClick={() => navigate(-1)}>
          Go Back
        </button>
      </h2>
    );
  }

  const recipeToDisplay = recipeByButton || recipe;

  return (
    <div className='d-flex'>
      <div className='me-4' style={{ minWidth: '30%' }}>
        <img
          className='img-fluid'
          src={recipeToDisplay?.strMealThumb}
          alt={recipeToDisplay?.strMeal}
        />
      </div>
      <div>
        <h5>Category: {recipeToDisplay?.strCategory}</h5>
        <p>Area: {recipeToDisplay?.strArea}</p>
        <p>
          <strong>Instructions:</strong> {recipeToDisplay?.strInstructions}
        </p>
        <h5>Ingredients:</h5>
        <p>
          {Array.from({ length: 20 }).map((_, index) => {
            const ingredient = recipeToDisplay?.[`strIngredient${index + 1}`];
            const measure = recipeToDisplay?.[`strMeasure${index + 1}`];
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

export default HomeDetails;
