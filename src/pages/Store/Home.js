
import React from 'react';
import { useHeader } from '../../hooks/headerHook';

export default function Home() {

  useHeader({ 
    topNavPaths: ['/cart']
  });

  return (
    <section>
      <div className="container-x">
        <div>Welcome to DailyNeeds Store Manager</div>
      </div>

    </section>
  );
}
