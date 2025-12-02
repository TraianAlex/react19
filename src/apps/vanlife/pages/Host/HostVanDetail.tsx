import React, { useEffect, useState } from 'react';
import { useParams, Link, NavLink, Outlet } from 'react-router-dom';
// import { getVan } from "../../api/firebase"
import { getHostVans } from '../../api';
import { Van } from '../../types';

export default function HostVanDetail() {
  const { id } = useParams();
  const [currentVan, setCurrentVan] = useState<Van | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVan() {
      try {
        setLoading(true);
        const data = await getHostVans(id);
        // getHostVans returns data.vans which could be an array or single object
        const vanData = Array.isArray(data) ? data[0] : (data as Van);
        setCurrentVan(vanData);
      } catch (err) {
        console.error('Failed to fetch van:', err);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchVan();
    }
  }, [id]);

  const activeStyles = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616',
  };

  if (loading) {
    return (
      <section>
        <Link to='..' relative='path' className='back-button'>
          &larr; <span>Back to all vans</span>
        </Link>
        <h2>Loading...</h2>
      </section>
    );
  }

  if (!currentVan) {
    return (
      <section>
        <Link to='..' relative='path' className='back-button'>
          &larr; <span>Back to all vans</span>
        </Link>
        <h2>Van not found</h2>
      </section>
    );
  }

  return (
    <section>
      <Link to='..' relative='path' className='back-button'>
        &larr; <span>Back to all vans</span>
      </Link>
      <div className='host-van-detail-layout-container'>
        <div className='host-van-detail'>
          <img src={currentVan.imageUrl} />
          <div className='host-van-detail-info-text'>
            <i className={`van-type van-type-${currentVan.type}`}>
              {currentVan.type}
            </i>
            <h3>{currentVan.name}</h3>
            <h4>${currentVan.price}/day</h4>
          </div>
        </div>

        <nav className='host-van-detail-nav'>
          <NavLink
            to='.'
            end
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
          >
            Details
          </NavLink>
          <NavLink
            to='pricing'
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
          >
            Pricing
          </NavLink>
          <NavLink
            to='photos'
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
          >
            Photos
          </NavLink>
        </nav>
        <Outlet context={{ currentVan }} />
      </div>
    </section>
  );
}
