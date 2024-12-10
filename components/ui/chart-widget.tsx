'use client'

import { useEffect, useState } from "react"
import { Modal } from "./modal"
import DataCenterModal from "./data-center-modal"
import { MapItem, ChartGroup } from "@/lib/types"

const colors: string[] = [
    '#6B5DD3',
    '#FF8B3E',
    '#3E9FFF',
    '#3EFF8B',
    '#8B3EFF',
    '#FF3E8B',
]

interface ChartProps {
  rawData: MapItem[]
}

export default function DataCenterWidget({ rawData }: ChartProps) {
  const [mounted, setMounted] = useState(false)
  const [data, setData] = useState<ChartGroup>({})
  const [slicedData, setSlicedData] = useState<ChartGroup>({})
  const [totalValue, setTotalValue] = useState<number>(0)
  const [openModal, setOpenModal] = useState<boolean>(false);
  const radius = 80
  const circumference = 2 * Math.PI * radius
  let currentAngle = 0

  useEffect(() => {
    const groupedData = Object.groupBy(rawData, ({as}) => as)
    const sortedData: ChartGroup = Object.fromEntries(
        Object.entries(groupedData).sort((a, b) => b[1]!.length - a[1]!.length)
    );
    const slicedObject: ChartGroup = Object.fromEntries(
        Object.entries(sortedData).slice(0, 6)
    );
    console.log(data);
    setData(sortedData)
    setSlicedData(slicedObject)
    setTotalValue(rawData.length)

  }, [rawData]);

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleOpen = () => {
        setOpenModal(true);
    };

  return (
    <div className="w-full max-w-md p-6 rounded-xl bg-[#111111] text-gray-300">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-medium text-white">Node Data center</h2>
        <div className="flex items-center">
          <div className="flex -space-x-3">
            {slicedData && Object.entries(slicedData).map(([key, value], index) => (
                <div
                key={index}
                className="w-5 h-5 rounded-full"
                style={{ backgroundColor: colors[index] }}
                />
            ))}
          </div>
          <span className="ml-2 text-2xl text-white">{slicedData && Object.entries(slicedData).length}</span>
        </div>
      </div>
      
      <div className="flex items-center w-full justify-between">
      <div className="w-48 h-48 mb-8">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          {slicedData && Object.entries(slicedData).map(([key, value], index) => {
            const segmentPercentage = value!.length / totalValue
            const segmentAngle = segmentPercentage * 360
            const dashArray = `${(segmentPercentage * circumference)} ${circumference}`
            const rotate = `rotate(${currentAngle}, 100, 100)`
            currentAngle += segmentAngle

            return (
              <circle
                key={index}
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={colors[index]}
                strokeWidth="10"
                strokeDasharray={dashArray}
                transform={rotate}
                className="transition-all duration-1000 ease-out"
                style={{
                  strokeDashoffset: mounted ? '0' : circumference,
                }}
              />
            )
          })}
        </svg>
      </div>

      <div className="space-y-3 mb-6">
        {slicedData && Object.entries(slicedData).map(([key, value], index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: colors[index] }}
            />
            <span className="text-sm">{value![0].isp}</span>
          </div>
        ))}
      </div>
      </div>
      
      <div className="w-full flex justify-center">
        <button  
            onClick={handleOpen}
            className="w-1/2 rounded-full bg-[#484848] text-secondary-foreground hover:bg-secondary/80 p-2"
        >
            View all centers
        </button>
      </div>

      <Modal isOpen={openModal} onClose={handleClose}>
        <DataCenterModal totalVal={totalValue} data={data} onClose={handleClose} />
      </Modal>
    </div>
  )
}

