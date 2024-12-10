"use client";

import { WorldMap } from "@/components/world-map";
import DataCenterWidget from "@/components/ui/chart-widget";
import { EndpointTable } from "@/components/endpoint-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchWidget from "@/components/ui/search-widget";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MapItem, NetworkData } from "@/lib/types";



export default function Home() {

  const [searchInput, setSearchInput] = useState<string>("")

  const [networkData, setNetworkData] = useState<NetworkData>()
  const [mapData, setMapData] = useState<MapItem[]>([])

  const fetchData = async (route: string, setData: Dispatch<SetStateAction<MapItem[]>> | Dispatch<SetStateAction<NetworkData | undefined>>) => {
    try {
      const response = await fetch(route);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      setData(data)
    } catch (err) {
      console.log(err);
      
    }
  };

  

  useEffect(() => {
    fetchData('/api/map-data', setMapData);
    fetchData('/api/network-data', setNetworkData);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white px-3 py-6 md:px-6">
      <div className="max-w-[1400px] mx-auto space-y-8">
        <h1 className="text-xl font-medium mb-6">Node Data center</h1>
        
        {mapData &&
          <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-5">
            <DataCenterWidget rawData={mapData} />
            <WorldMap />
          </div>
        }

        {networkData && mapData &&
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-light">RPC / REST / GRPs</h2>
              <SearchWidget value={searchInput} onChange={setSearchInput} />
            </div>
            
            
            <Tabs defaultValue="cosmos" className="w-full">
              <TabsList className="bg-[#131313]">
                <TabsTrigger value="cosmos">Cosmos</TabsTrigger>
                <TabsTrigger value="evm">EVM</TabsTrigger>
              </TabsList>
              <TabsContent value="cosmos">
                <EndpointTable searchInput={searchInput} rpcsData={networkData.rpcs.cosmos} mapData={mapData} />
              </TabsContent>
              <TabsContent value="evm">
                <EndpointTable searchInput={searchInput} rpcsData={networkData.rpcs.evm} mapData={mapData} />
              </TabsContent>
            </Tabs>
          </div>
        }
      </div>
    </main>
  );
}