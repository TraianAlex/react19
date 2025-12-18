import { Await, Link, useLoaderData, useSearchParams } from 'react-router-dom';
//import { getVans } from '../../api';
import { getAllVans } from '../../api/firebase';
import { Van } from '../../types';
import { Suspense } from 'react';

export const loader = () => {
  return { vans: getAllVans() as Promise<Van[]> };
};

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [vans, setVans] = useState<Van[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<any>(null);
  const dataPromise = useLoaderData<typeof loader>();

  const typeFilter = searchParams.get('type');

  // useEffect(() => {
  //   async function fetchVans() {
  //     try {
  //       const data = await getAllVans();
  //       setVans(data as Van[]);
  //     } catch (error) {
  //       setError(error as any);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchVans();
  // }, []);

  function handleFilterChange(key: string, value: string | null) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  function renderVanElements(vans: any[]) {
    const displayedVans = typeFilter
      ? vans.filter((van) => van.type === typeFilter)
      : vans;

    const vanElements = displayedVans.map((van) => (
      <div key={van.id} className='van-tile'>
        <Link
          to={van.id}
          state={{
            search: `?${searchParams.toString()}`,
            type: typeFilter,
          }}
          aria-label={`View details for ${van.name}, priced at $${van.price} per day`}
        >
          <img src={van.imageUrl} alt={`Image of ${van.name}`} />
          <div className='van-info'>
            <h3>{van.name}</h3>
            <p>
              ${van.price}
              <span>/day</span>
            </p>
          </div>
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
        </Link>
      </div>
    ));

    return (
      <>
        <div className='van-list-filter-buttons'>
          <button
            onClick={() => handleFilterChange('type', 'simple')}
            className={`van-type simple 
                        ${typeFilter === 'simple' ? 'selected' : ''}`}
          >
            Simple
          </button>
          <button
            onClick={() => handleFilterChange('type', 'luxury')}
            className={`van-type luxury 
                        ${typeFilter === 'luxury' ? 'selected' : ''}`}
          >
            Luxury
          </button>
          <button
            onClick={() => handleFilterChange('type', 'rugged')}
            className={`van-type rugged 
                        ${typeFilter === 'rugged' ? 'selected' : ''}`}
          >
            Rugged
          </button>

          {typeFilter ? (
            <button
              onClick={() => handleFilterChange('type', null)}
              className='van-type clear-filters'
            >
              Clear filter
            </button>
          ) : null}
        </div>
        <div className='van-list'>{vanElements}</div>
      </>
    );
  }

  // if (loading) {
  //   return (
  //     <div className='van-list-container'>
  //       <h1 aria-live='polite'>Explore our van options</h1>
  //       <h2>Loading vans...</h2>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className='van-list-container'>
  //       <h1 aria-live='assertive'>Error fetching vans</h1>
  //       <p>{error.message}</p>
  //     </div>
  //   );
  // }

  return (
    <div className='van-list-container'>
      <h1>Explore our van options</h1>
      <Suspense fallback={<h2>Loading vans...</h2>}>
        <Await resolve={dataPromise.vans}>{renderVanElements}</Await>
      </Suspense>
    </div>
  );
}

/*
function genNewSearchParamString(key: string, value: string | null) {
  const sp = new URLSearchParams(searchParams);
  if (value === null) {
    sp.delete(key);
  } else {
    sp.set(key, value);
  }
  return `?${sp.toString()}`;
}
*/
