import React from 'react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';

interface Recipe {
  idMeal: string;
  strMeal: string;
}

interface RecipeListProps {
  recipes: Recipe[];
}

export const HomeList: React.FC<RecipeListProps> = ({ recipes }) => {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'seafood';
  const navigate = useNavigate();

  function handleRecipeClick(recipe: Recipe): void {
    navigate(`recipe/${recipe.idMeal}?category=${currentCategory}`, { state: { recipe } });
  }

  return (
    <ul className='list-group list-group-flush'>
      {recipes.map((recipe) => (
        <li key={recipe.idMeal} className='list-group-item'>
          {currentCategory === 'intercontinental' ? (
            <>
              <span className='me-n1'>by button:</span>
              <button
                className='btn btn-link'
                onClick={() => handleRecipeClick(recipe)}
              >
                {recipe.strMeal}
              </button>
              <br />
              <span className='me-4'>by link:</span>
              <Link
                to={`recipe/${recipe.idMeal}?category=${currentCategory}`}
                state={{ recipe }}
              >
                {recipe.strMeal}
              </Link>
            </>
          ) : (
            <NavLink to={`recipe/${recipe.idMeal}?category=${currentCategory}`}>
              {recipe.strMeal}
            </NavLink>
          )}
        </li>
      ))}
    </ul>
  );
};
