import { useLocation, useNavigate, useParams } from 'react-router-dom';

import LoadingSpinner from '../../../components/loading-spinner';
import useRecipeDetails from './useRecipeDetails';

export type Recipe = {
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  [key: string]: string;
};

const HomeDetails = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { recipe, error, loading } = useRecipeDetails(recipeId || '');
  // Access the state passed via Link
  const recipeByButton = (location.state || {}).recipe as Recipe;

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
          src={recipeToDisplay.strMealThumb}
          alt={recipeToDisplay.strMeal}
        />
      </div>
      <div>
        <h5>Category: {recipeToDisplay.strCategory}</h5>
        <p>Area: {recipeToDisplay.strArea}</p>
        <p>
          <strong>Instructions:</strong> {recipeToDisplay.strInstructions}
        </p>
        <h5>Ingredients:</h5>
        <p>
          {Array.from({ length: 20 }).map((_, index) => {
            const ingredient =
              recipeToDisplay[`strIngredient${index + 1}` as keyof Recipe];
            const measure =
              recipeToDisplay[`strMeasure${index + 1}` as keyof Recipe];
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
