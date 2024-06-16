"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { LayoutList, Loader, Users } from "lucide-react";
import EndCallButton from "./EndCallButton";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";


const MeetingRoom = () => {
  var isPersonalRoom = useSearchParams();
      // isPersonalRoom=!!searchParams.get('personal');

  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const router = useRouter();

  const [showParticipant, setShowParticipats] = useState(false);
  const {useCallCallingState} = useCallStateHooks();
        const callingState = useCallCallingState();

        if(callingState !== CallingState.JOINED) return <Loader/>
  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="right" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };
  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className=" relative flex size-full item-center justify-center ">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "show-block": showParticipant,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipats(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
        <CallControls onLeave={() => router.push(`/`)} />

        <DropdownMenu>
          <div className="flex items-center">
             <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d]">
               <LayoutList size={20} className="text-white px-4 py-2 hover:bg-[#4c535b]"/>

             </DropdownMenuTrigger>

          </div>


          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {['Grid' , 'Speaker-Left' , 'Speaker-Right'].map((item , index)=>(
              <div key={index}>

              <DropdownMenuItem className="cursor-pointer" onClick={()=>{
                setLayout(item.toLowerCase() as CallLayoutType)
              }}>

                {item}
              </DropdownMenuItem>
               <DropdownMenuSeparator className="border-dark-1"/>

              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton/>
        <button onClick={()=>setShowParticipats((prev)=>!prev)}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 hover:bg-[#4c535b]">
            <Users size ={20} className="text-white"/>


          </div>

        </button>
        {isPersonalRoom && <EndCallButton/>}
      </div>
    </section>
  );
};

export default MeetingRoom;
