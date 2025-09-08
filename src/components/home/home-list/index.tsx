import React from 'react';
import { NavLink } from 'react-router-dom';

interface Recipe {
  idMeal: string;
  strMeal: string;
}

interface RecipeListProps {
  recipes: Recipe[];
}

export const HomeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <ul className='list-group list-group-flush'>
      {recipes.map((recipe) => (
        <li key={recipe.idMeal} className='list-group-item'>
          <NavLink to={`${recipe.idMeal}`}>{recipe.strMeal}</NavLink>
        </li>
      ))}
    </ul>
  );
};
