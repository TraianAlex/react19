import { useOutletContext } from 'react-router-dom';
import { Van } from '../../types';

export default function HostVanPhotos() {
  const { currentVan } = useOutletContext<{ currentVan: Van | null }>();

  if (!currentVan) {
    return <h3>Loading...</h3>;
  }

  return <img src={currentVan.imageUrl} className='host-van-detail-image' />;
}
