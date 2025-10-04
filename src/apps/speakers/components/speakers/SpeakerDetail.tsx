import { Link } from 'react-router-dom';

import DeleteSpeakerButton from './DeleteSpeakerButton';
import EditSpeakerDialog from './EditSpeakerDialog';
import FavoriteSpeakerToggle from './FavoriteSpeakerToggle';
import SpeakerImageToggleOnScroll from './SpeakerImageToggleOnScroll';
import { SpeakerModalProvider } from '../contexts/SpeakerModalContext';
import SpeakerModal from '../speakerModal/SpeakerModal';

export default function SpeakerDetail({
  speakerRec,
  showDetails,
}: {
  speakerRec: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    bio: string;
    userBioShort: string;
    company: string;
    twitterHandle: string;
    imageUrl: string;
    favorite: boolean;
  };
  showDetails: boolean;
}) {
  // const { setRoute } = {
  //   setRoute: (route: string) => {
  //     window.location.href = route;
  //   },
  // };

  return (
    <SpeakerModalProvider>
      {speakerRec && <SpeakerModal />}
      <div className='col-xl-6 col-md-12'>
        <div className='card border-0'>
          <div className='row g-0'>
            <div className='col-4'>
              <SpeakerImageToggleOnScroll
                imageUrl={speakerRec?.imageUrl}
                alt={`${speakerRec?.firstName} ${speakerRec?.lastName}`}
                thumbNail={false}
              />
            </div>

            <div className='col-8 d-flex flex-column flex-nowrap'>
              <div className='card-body'>
                <div className='speaker-action d-flex'>
                  <div className='favoriteToggleWrapper'>
                    <FavoriteSpeakerToggle speakerRec={speakerRec} />
                  </div>

                  <div className='modifyWrapper'>
                    <EditSpeakerDialog {...speakerRec} />
                    <DeleteSpeakerButton id={speakerRec.id} />
                  </div>
                </div>
                <h4 className='card-title'>
                  <Link
                    to={`/speakers-app/speaker/${speakerRec.id}`}
                    onClick={() => {
                      // setRoute(`/speakers-app/speaker/${speakerRec.id}`);
                    }}
                  >
                    {speakerRec.firstName} {speakerRec.lastName}
                  </Link>
                </h4>

                {showDetails === true ? (
                  <p className='card-text'>{speakerRec.bio}</p>
                ) : (
                  <p className='card-text'>{speakerRec.userBioShort}</p>
                )}
              </div>

              <div className='card-footer text-muted d-flex flex-wrap justify-content-between align-items-center'>
                {speakerRec?.company?.length > 0 ? (
                  <small>
                    <strong>Company:</strong> {speakerRec.company}
                  </small>
                ) : null}

                {speakerRec.twitterHandle.length > 0 ? (
                  <small>
                    <strong>Twitter</strong>: {speakerRec.twitterHandle}
                  </small>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SpeakerModalProvider>
  );
}
