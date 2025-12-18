import {
  Link,
  NavLink,
  Outlet,
  LoaderFunctionArgs,
  useLoaderData,
  Await,
} from 'react-router-dom';
import { getVan } from '../../api/firebase';
// import { getHostVans } from '../../api';
import { Van } from '../../types';
import { Suspense } from 'react';

export const loader = ({ params }: LoaderFunctionArgs) => {
  if (!params.id) {
    throw new Response('Van ID is required', { status: 400 });
  }
  return { currentVan: getVan(params.id) as Promise<Van> };
};

export default function HostVanDetail() {
  // const { id } = useParams();
  // const [currentVan, setCurrentVan] = useState<Van | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<any>(null);
  const dataPromise = useLoaderData<typeof loader>();

  // useEffect(() => {
  //   async function fetchVan() {
  //     try {
  //       setLoading(true);
  //       const data = await getVan(id as string);
  //       setCurrentVan(data as Van);
  //     } catch (error) {
  //       setError(error as any);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   if (id) {
  //     fetchVan();
  //   }
  // }, [id]);

  const activeStyles = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616',
  };

  // if (loading) {
  //   return (
  //     <section>
  //       <Link to='..' relative='path' className='back-button'>
  //         &larr; <span>Back to all vans</span>
  //       </Link>
  //       <h2 aria-live='polite'>Loading...</h2>
  //     </section>
  //   );
  // }

  // if (!currentVan) {
  //   return (
  //     <section>
  //       <Link to='..' relative='path' className='back-button'>
  //         &larr; <span>Back to all vans</span>
  //       </Link>
  //       <h2 aria-live='assertive'>Van not found</h2>
  //     </section>
  //   );
  // }

  // if (error) {
  //   return (
  //     <section>
  //       <h2>Error fetching van: {error.message}</h2>
  //       <Link to='..' relative='path' className='back-button'>
  //         &larr; <span>Back to all vans</span>
  //       </Link>
  //     </section>
  //   );
  // }

  return (
    <section>
      <Link to='..' relative='path' className='back-button'>
        &larr; <span>Back to all vans</span>
      </Link>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Await resolve={dataPromise.currentVan}>
          {(currentVan) => (
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
                  style={({ isActive }) =>
                    isActive ? activeStyles : undefined
                  }
                >
                  Details
                </NavLink>
                <NavLink
                  to='pricing'
                  style={({ isActive }) =>
                    isActive ? activeStyles : undefined
                  }
                >
                  Pricing
                </NavLink>
                <NavLink
                  to='photos'
                  style={({ isActive }) =>
                    isActive ? activeStyles : undefined
                  }
                >
                  Photos
                </NavLink>
              </nav>
              <Outlet context={{ currentVan }} />
            </div>
          )}
        </Await>
      </Suspense>
    </section>
  );
}
