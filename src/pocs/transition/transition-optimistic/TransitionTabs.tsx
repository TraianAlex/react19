import { useOptimistic, useState } from 'react';
import TabButton from './TabButton';
import AboutTab from './AboutTab';
import PostsTab from './PostsTab';
import ContactTab from './ContactTab';

export default function TransitionOptimistic() {
  const [tab, setTab] = useState('about');
  const [optimisticTab, setOptimisticTab] = useOptimistic(tab);
  const isTransitioning = tab !== optimisticTab;

  return (
    <>
      <TabButton
        isActive={optimisticTab === 'about'}
        action={() => setTab('about')}
      >
        About
      </TabButton>
      <TabButton
        isActive={optimisticTab === 'posts'}
        action={() => {
          setTab('posts');
          setOptimisticTab('posts');
        }}
      >
        Posts (slow)
      </TabButton>
      <TabButton
        isActive={optimisticTab === 'contact'}
        action={() => setTab('contact')}
      >
        Contact
      </TabButton>
      <hr />
      {isTransitioning ? (
        <div>Loading...</div>
      ) : (
        (tab === 'about' && <AboutTab />) ||
        (tab === 'posts' && <PostsTab />) ||
        (tab === 'contact' && <ContactTab />)
      )}
    </>
  );
}
