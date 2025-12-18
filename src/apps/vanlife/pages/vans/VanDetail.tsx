// import { useEffect, useState } from 'react';
import { Link, useLoaderData, useLocation, useParams } from 'react-router-dom';
import type { LoaderFunctionArgs } from 'react-router';
// import { getVans } from '../../api';
import { Van } from '../../types';
import { getVan } from '../../api/firebase';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.id) {
    throw new Response('Van ID is required', { status: 400 });
  }
  const van = await getVan(params.id);
  return { van: van as Van };
};

export default function VanDetail() {
  const location = useLocation();
  //const { id } = useParams();
  // const [van, setVan] = useState<Van | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<any>(null);
  const { van } = useLoaderData<typeof loader>();

  const search = location.state?.search || '';
  const type = location.state?.type || 'all';

  // useEffect(() => {
  //   async function fetchVan() {
  //     try {
  //       setLoading(true);
  //       const data = await getVan(id as string);
  //       setVan(data as Van);
  //     } catch (err) {
  //       setError(error as any);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchVan();
  // }, [id]);

  // if (loading) {
  //   return <h2 aria-live='polite'>Loading...</h2>;
  // }

  if (!van) {
    return <h2 aria-live='assertive'>Van not found</h2>;
  }

  // if (error) {
  //   return (
  //     <div className='van-detail-container'>
  //       <h2 aria-live='assertive'>Error fetching van: {error.message}</h2>
  //       <Link to={`..${search}`} relative='path' className='back-button'>
  //         &larr; <span>Back to {type} vans</span>
  //       </Link>
  //     </div>
  //   );
  // }

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
