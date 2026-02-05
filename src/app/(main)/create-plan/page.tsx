"use client"

import ChatPage from '@/components/generate-plan/ChatPage';
import Hero from '@/components/generate-plan/Hero';
import Map from '@/components/generate-plan/Map';
import TripPlan from '@/components/generate-plan/TripPlan';
import { RootState } from '@/store/store';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const CreatePlan = () => {
  const [ready, setReady] = useState<boolean>(false)
  const { plans } = useSelector((state: RootState) => state.ai);

  return (
    <div>
      {
        !ready ? <Hero setReady={setReady} /> : (!plans ? <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
          <ChatPage />
          <div className="h-[60vh] lg:h-[calc(100vh-120px)] lg:sticky lg:top-24">
            <Map />
          </div>
        </div> :
          <TripPlan plans={plans} task={"save"} />
        )
      }
    </div>
  );
};

export default CreatePlan;