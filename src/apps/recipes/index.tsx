import { Outlet, Link, useSearchParams } from 'react-router-dom';

import { HomeList } from './recipes-list';
import LoadingSpinner from '../../components/loading-spinner';
import useRecipes from './useRecipes';

export type FoodCategory =
  | 'seafood'
  | 'beef'
  | 'chicken'
  | 'dessert'
  | 'vegetarian'
  | 'intercontinental';

export const CATEGORY_MAP: Record<FoodCategory, string> = {
  seafood: 'Seafood',
  beef: 'Beef',
  chicken: 'Chicken',
  dessert: 'Dessert',
  vegetarian: 'Vegetarian',
  intercontinental: 'Intercontinental',
};

export default function Home() {
  const [searchParams] = useSearchParams();
  const category = (searchParams.get('category') as FoodCategory) || 'seafood';
  const { recipes, loading, error, currentCategory } = useRecipes(category);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>Error loading recipes: {error}</p>;
  }

  return (
    <div className='container-fluid mt-5 pt-5'>
      <div className='row mb-3'>
        <div className='col-12'>
          <div className='btn-group' role='group'>
            {Object.keys(CATEGORY_MAP).map((cat) => (
              <Link
                key={cat}
                to={`/recipes/?category=${cat}`}
                className={`btn ${
                  category === cat ? 'btn-primary' : 'btn-outline-primary'
                }`}
              >
                {CATEGORY_MAP[cat as FoodCategory]}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-3'>
          <div className='card' style={{ width: '18rem' }}>
            <div className='card-header'>
              {CATEGORY_MAP[currentCategory]} Recipes
            </div>
            <HomeList recipes={recipes} />
          </div>
        </div>
        <div className='col-9'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
