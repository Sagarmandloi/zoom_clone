"use client"
import MeetingRoom from '@/components/ui/MeetingRoom';
import MeetingSetup from '@/components/ui/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { Loader } from 'lucide-react';
import React, { useState } from 'react'
import { useParams } from 'next/navigation';

const Meeting = ({ params }: { params: { id : string } }) => {
  const {id}=useParams();
  const {user , isLoaded} = useUser();
  const [ isSetupComplete , setIsSetupComplete] = useState(false);
  const {call , isCallLoading} = useGetCallById(id);

  if(!isLoaded || isCallLoading) return <Loader/>
  return (
    <main>
      <StreamCall call={call}>
     <StreamTheme>
     {!isSetupComplete ? (
        <MeetingSetup setIsSetupComplete={setIsSetupComplete}/>
      ):(<MeetingRoom/>)}
     

     </StreamTheme>


      </StreamCall>


    </main>
  )
}

export default Meeting
