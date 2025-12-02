import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getVans } from '../../api';
// import { getAllVans } from '../../api/firebase';
import { Van } from '../../types';

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vans, setVans] = useState<Van[]>([]);
  const [loading, setLoading] = useState(true);

  const typeFilter = searchParams.get('type');

  useEffect(() => {
    getVans()
      .then((data) => {
        setVans(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching vans:', error);
        setLoading(false);
      });
  }, []);

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

  function renderVanElements(vans: Van[]) {
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
        >
          <img src={van.imageUrl} />
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

  if (loading) {
    return (
      <div className='van-list-container'>
        <h1>Explore our van options</h1>
        <h2>Loading vans...</h2>
      </div>
    );
  }

  return (
    <div className='van-list-container'>
      <h1>Explore our van options</h1>
      {renderVanElements(vans)}
    </div>
  );
}
