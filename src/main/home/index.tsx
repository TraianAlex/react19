import { useEffect, useState } from 'react';
import { Outlet, useSearchParams, Link } from 'react-router-dom';

import { HomeList } from './home-list';
import LoadingSpinner from '../../components/loading-spinner';

type Recipe = {
  strMeal: string;
  idMeal: string;
};

type FoodCategory =
  | 'seafood'
  | 'beef'
  | 'chicken'
  | 'dessert'
  | 'vegetarian'
  | 'intercontinental';

const CATEGORY_MAP: Record<FoodCategory, string> = {
  seafood: 'Seafood',
  beef: 'Beef',
  chicken: 'Chicken',
  dessert: 'Dessert',
  vegetarian: 'Vegetarian',
  intercontinental: 'Intercontinental',
};

export const apiUrl = 'https://www.themealdb.com/api/json/v1/1';

export default function Home() {
  // throw new Error('Test error boundaries');
  const [searchParams] = useSearchParams();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] =
    useState<FoodCategory>('seafood');

  const category = (searchParams.get('category') as FoodCategory) || 'seafood';

  useEffect(() => {
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

    fetchRecipes();
  }, [category]);

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
                to={`/?category=${cat}`}
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
