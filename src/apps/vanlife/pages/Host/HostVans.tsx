import { Await, Link, useLoaderData } from 'react-router-dom';
// import { getHostVans } from '../../api';
import { getHostVans } from '../../api/firebase';
import { Van } from '../../types';
import { Suspense } from 'react';

export const loader = () => {
  return { vans: getHostVans() as Promise<Van[]> };
};

export default function HostVans() {
  // const [vans, setVans] = useState<Van[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<any>(null);
  const dataPromise = useLoaderData<typeof loader>();

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
      <Link to={van.id} key={van.id} className='host-van-link-wrapper'>
        <div className='host-van-single' key={van.id}>
          <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
          <div className='host-van-info'>
            <h3>{van.name}</h3>
            <p>${van.price}/day</p>
          </div>
        </div>
      </Link>
    ));

    return (
      <div className='host-vans-list'>
        <section>{hostVansEls}</section>
      </div>
    );
  }

  // if (loading) {
  //   return (
  //     <section>
  //       <h1 className='host-vans-title'>Your listed vans</h1>
  //       <h2 aria-live='polite'>Loading vans...</h2>
  //     </section>
  //   );
  // }

  // if (error) {
  //   return (
  //     <section>
  //       <h1 className='host-vans-title'>Your listed vans</h1>
  //       <h2 aria-live='assertive'>Error fetching vans: {error.message}</h2>
  //     </section>
  //   );
  // }

  return (
    <section>
      <h1 className='host-vans-title'>Your listed vans</h1>
      <Suspense fallback={<h2>Loading vans...</h2>}>
        <Await resolve={dataPromise.vans}>{renderVanElements}</Await>
      </Suspense>
    </section>
  );
}
