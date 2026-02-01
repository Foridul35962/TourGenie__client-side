"use client"

import ChatPage from '@/components/generate-plan/ChatPage';
import Hero from '@/components/generate-plan/Hero';
import TripPlan from '@/components/generate-plan/TripPlan';
import React, { useState } from 'react';

const CreatePlan = () => {
  const [ready, setReady] = useState<boolean>(false)

  return (
    <div>
      {
        !ready ? <Hero setReady={setReady}/> : <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
          <ChatPage />
          <TripPlan />
        </div>
      }
    </div>
  );
};

export default CreatePlan;