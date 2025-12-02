import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getVans } from '../../api';
import { Van } from '../../types';
// import { getVan } from "../../api/firebase"

export default function VanDetail() {
  const location = useLocation();
  const { id } = useParams();
  const [van, setVan] = useState<Van | null>(null);
  const [loading, setLoading] = useState(true);

  const search = location.state?.search || '';
  const type = location.state?.type || 'all';

  useEffect(() => {
    async function fetchVan() {
      try {
        setLoading(true);
        const data = await getVans(id);
        setVan(data);
      } catch (err) {
        console.error('Failed to fetch van:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchVan();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!van) {
    return <h2>Van not found</h2>;
  }

  return (
    <div className='van-detail-container'>
      <Link to={`..${search}`} relative='path' className='back-button'>
        &larr; <span>Back to {type} vans</span>
      </Link>
      <div className='van-detail'>
        <img src={van.imageUrl} />
        <i className={`van-type ${van.type} selected mb-3`}>{van.type}</i>
        <h2>{van.name}</h2>
        <p className='van-price'>
          <span>${van.price}</span>/day
        </p>
        <p>{van.description}</p>
        <button className='link-button'>Rent this van</button>
      </div>
    </div>
  );
}
