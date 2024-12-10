"use client";

import { CopyIcon, CirclePower, Cuboid, CircleUser, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Image from "next/image";
import { countryCodes, CountryName } from "@/lib/countryCodes";
import { MapItem, RpcItem } from "@/lib/types";

interface EndpointTableProps {
  searchInput: string;
  rpcsData: RpcItem[];
  mapData: MapItem[]
}

export function EndpointTable({ searchInput, rpcsData, mapData }: EndpointTableProps) {

  const [initialNetworkData] = useState(rpcsData)
  const [networkData, setNetworkData] = useState(rpcsData)
  const [sortType, setSortType] = useState<string>("ascending")
  const [showNotification, setShowNotification] = useState<boolean>(false)


  const handleSearchInputChange = () => {
    if (initialNetworkData) setNetworkData(initialNetworkData.filter(rpc => rpc.noder.moniker.toLowerCase().includes(searchInput.toLowerCase())))
  }

  useEffect(() => {
    handleSearchInputChange()
  }, [searchInput])

  const sortDataByBlockHistory = () => {
    if (sortType === "ascending") {
      setNetworkData([...networkData].sort((a, b) => Number(a.uptime) - Number(b.uptime)))
      setSortType("descending")
    } else {
      setNetworkData([...networkData].sort((a, b) => Number(b.uptime) - Number(a.uptime)))
      setSortType("ascending")
    }
  }

  const sortDataByIndexation = () => {
    if (sortType === "ascending") {
      setNetworkData([...networkData].sort((a, b) => a.tx_index.localeCompare(b.tx_index)))
      setSortType("descending")
    } else {
      setNetworkData([...networkData].sort((a, b) => b.tx_index.localeCompare(a.tx_index)))
      setSortType("ascending")
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  return (
    <div className="mt-5">
      <div className="w-full">
        <div className="hidden md:grid grid-cols-5 border-b p-4">
          <div className="text-gray-500 col-span-2 ml-5">Status, Location</div>
          <div className="text-gray-500 ml-5">Node</div>
          <div className="text-gray-500">
            <div onClick={sortDataByBlockHistory} className="flex items-center cursor-pointer hover:text-gray-400">
              <span>Block history</span>
              <ChevronDown />
            </div>
          </div>
          <div className="text-gray-500">
            <div onClick={sortDataByIndexation} className="flex items-center cursor-pointer hover:text-gray-400">
              <span>Indexation</span>
              <ChevronDown />
            </div>
          </div>
        </div>
        
        {networkData && networkData.map((rpc, index) => {
            const ipWithPort = rpc.rpcIp || rpc.evmIp || rpc.grpcIp || rpc.apiIp
            const ip = ipWithPort!.split(":")[0]
            const country: CountryName = mapData.find(item => item.ip == ip)!.country
            
            return (
              <div key={index} className="grid grid-cols-3 md:grid-cols-5 gap-2 p-5 even:bg-[#131313] border-b last:border-none">
                <div className="col-span-3 md:col-span-2">
                  <div className="flex items-center gap-4">
                    <span className="font-mono">{rpc.rpcIp && "RPC" || rpc.evmIp && "EVM RPC" || rpc.grpcIp && "GRPC" || rpc.apiIp && "REST"}</span>
                    <Image
                      alt="United States"
                      width={21}
                      height={14}
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCodes[country]}.svg`} />
                    <span className="font-mono">{ipWithPort}</span>
                    <CopyIcon onClick={() => copyToClipboard(ipWithPort!)} className="h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-400" />
                  </div>
                </div>
                <div className="flex items-center">
                  <CircleUser className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-[#89C4FF] text-xs md:text-base">{rpc.noder.moniker}</span>
                </div>
                <div className="flex items-center ml-2">
                  <Cuboid className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-[#89C4FF] text-xs md:text-base">{rpc.uptime}</span>
                </div>
                <div className="flex items-center ml-4">
                  <CirclePower className={cn("h-4 w-4 md:h-6 md:w-6 mr-2", rpc.tx_index === "on" ? "text-[#73C2D6]" : "text-gray-500")} />
                  <span>{rpc.tx_index}</span>
                </div>
              </div>
            )
          })}
      </div>
      
      {showNotification &&
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 bg-gray-900 text-gray-500 text-xl shadow-2xl rounded-full transition ease-in-out delay-150">
            Copied
        </div>
      }
    </div>
  );
}