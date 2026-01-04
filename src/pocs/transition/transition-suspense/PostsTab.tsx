import React, { memo } from 'react';

const PostsTab = memo(function PostsTab() {
  // Log once. The actual slowdown is inside SlowPost.
  console.log('[ARTIFICIALLY SLOW] Rendering 500 <SlowPost />');

  const itemsPromise = new Promise<React.ReactNode[]>((resolve) => {
    let items: React.ReactNode[] = [];
    for (let i = 0; i < 500; i++) {
      items.push(<SlowPost key={i} index={i} />);
    }
    resolve(items);
  });

  return <ul className='items'>{itemsPromise}</ul>;
});

function SlowPost({ index }: { index: number }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return <li className='item'>Post #{index + 1}</li>;
}

export default PostsTab;
