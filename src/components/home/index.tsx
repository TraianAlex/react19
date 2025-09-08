import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { HomeList } from './home-list';

type Recipe = {
  strMeal: string;
  idMeal: string;
};

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();

        if (!data.meals || data.meals.length === 0) {
          throw new Error('No recipes found for this category');
        }
        setRecipes(data.meals);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <p>Loading spicy recipes...</p>;
  }

  if (error) {
    return <p>Error loading recipes: {error}</p>;
  }

  return (
    <div className='container-fluid mt-5 pt-5'>
      <div className='row'>
        <div className='col-3'>
          <div className='card' style={{ width: '18rem' }}>
            <div className='card-header'>Featured</div>
            <ul className='list-group list-group-flush'>
              <HomeList recipes={recipes} />
            </ul>
          </div>
        </div>
        <div className='col-9'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
