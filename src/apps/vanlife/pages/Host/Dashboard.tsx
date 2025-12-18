// import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { BsStarFill } from 'react-icons/bs';
import { getHostVans } from "../../api/firebase"
// import { getHostVans } from '../../api';
import { Van } from '../../types';

export const loader = async () => {
  const vans = await getHostVans();
  return { vans: vans as Van[] };
};

export default function Dashboard() {
  // const [vans, setVans] = useState<Van[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<any>(null);
  const { vans } = useLoaderData<typeof loader>();

  // useEffect(() => {
  //   async function fetchHostVans() {
  //     try {
  //       const data = await getHostVans();
  //       setVans(data as Van[]);
  //     } catch (error) {
  //       setError(error as any);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchHostVans();
  // }, []);

  function renderVanElements(vans: Van[]) {
    const hostVansEls = vans.map((van) => (
      <div className='host-van-single' key={van.id}>
        <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
        <div className='host-van-info'>
          <h3>{van.name}</h3>
          <p>${van.price}/day</p>
        </div>
        <Link to={`vans/${van.id}`}>View</Link>
      </div>
    ));

    return (
      <div className='host-vans-list'>
        <section>{hostVansEls}</section>
      </div>
    );
  }

  return (
    <>
      <section className='host-dashboard-earnings'>
        <div className='info'>
          <h1>Welcome!</h1>
          <p>
            Income last <span>30 days</span>
          </p>
          <h2>$2,260</h2>
        </div>
        <Link to='income'>Details</Link>
      </section>
      <section className='host-dashboard-reviews'>
        <h2>Review score</h2>

        <BsStarFill className='star' />

        <p>
          <span>5.0</span>/5
        </p>
        <Link to='reviews'>Details</Link>
      </section>
      <section className='host-dashboard-vans'>
        <div className='top'>
          <h2>Your listed vans</h2>
          <Link to='vans'>View all</Link>
        </div>
        {/* {loading ? (
          <h3 aria-live='polite'>Loading...</h3>
        ) : ( */}
          {renderVanElements(vans as Van[])}
        {/* )}
        {error && (
          <h3 aria-live='assertive'>
            Error fetching host vans: {error.message}
          </h3>
        )} */}
      </section>
    </>
  );
}
