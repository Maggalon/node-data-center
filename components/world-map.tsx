"use client";

import { useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";

export function WorldMap() {
  const [zoom, setZoom] = useState(1);

  return (
    <div className="w-full md:w-2/3 relative rounded-lg overflow-hidden md:flex md:items-end">
      <div 
        className="transition-transform duration-300 ease-in-out w-[1000px] h-[500px]"
        style={{ transform: `scale(${zoom})` }}
      >
        <Image
          src="https://tan-worried-grasshopper-459.mypinata.cloud/ipfs/bafkreicvbrncgifbmecqzq4kjc625c6bj7u3cdgo3vcvxf66bsi4ld2kl4"
          alt="World Map"
          fill
          sizes="1000"
          className="w-full h-full object-cover opacity-30 -z-10"
          priority
        />

        <div className="absolute top-[70%] left-[30%] transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-5 h-5 bg-white rounded-full animate-ping" />
          <div className="w-5 h-5 bg-white text-black text-xs flex justify-center items-center rounded-full absolute inset-0">11</div>
        </div>
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-5 h-5 bg-white rounded-full animate-ping" />
          <div className="w-5 h-5 bg-white text-black text-xs flex justify-center items-center rounded-full absolute inset-0">11</div>
        </div>
        <div className="absolute top-[80%] right-[15%] transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-5 h-5 bg-white rounded-full animate-ping" />
          <div className="w-5 h-5 bg-white text-black text-xs flex justify-center items-center rounded-full absolute inset-0">11</div>
        </div>
      </div>

      <div className="absolute right-0 bottom-10 z-50 flex flex-col gap-2 lg:mb-24">
        <button
          className="h-10 w-10 bg-[#484848] text-secondary-foreground hover:bg-secondary/80 flex justify-center items-center rounded-md"
          onClick={() => setZoom(zoom + 0.1)}
        >
          <PlusIcon className="h-6 w-6" />
        </button>
        <button
          className="h-10 w-10 bg-[#484848] text-secondary-foreground hover:bg-secondary/80 flex justify-center items-center rounded-md"
          onClick={() => setZoom(zoom - 0.1)}
        >
          <MinusIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}