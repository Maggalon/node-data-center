'use client'

import { X, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, Circle, CircleUser } from 'lucide-react'
import { ChartGroup } from '@/lib/types'
import { ReactElement } from 'react'
import { cn } from '@/lib/utils'

interface DataCenterModalProps {
  totalVal: number
  data: ChartGroup
  onClose: () => void
}

interface ButtonProps {
  onClick?: () => void;
  children: ReactElement | number | string;
  className?: string;
}

const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button onClick={onClick} className={cn('h-10 w-10 text-gray-400 hover:text-white hover:bg-accent hover:text-accent-foreground flex items-center justify-center rounded-md', className)}>
      {children}
    </button>
  )
}

export default function DataCenterModal({ totalVal, data, onClose }: DataCenterModalProps) {

  return (
    <div className="w-full bg-[#1C1C1C] border-0 text-white rounded-2xl p-4">
      <div className="flex flex-row items-center justify-between space-y-0">
        <div className="text-sm md:text-base lg:text-xl font-normal flex items-center space-x-3">
          <span className=''>Node Data center</span>
          <span className="inline-flex -space-x-3">
            <Circle className="w-5 h-5 fill-blue-500 text-transparent" />
            <Circle className="w-5 h-5 fill-red-500 text-transparent" />
            <Circle className="w-5 h-5 fill-purple-500 text-transparent" />
          </span>
          <span>{totalVal}</span>
        </div>
        <Button onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-xs md:text-base lg:text-lg">
          {data && Object.entries(data).map(([key, value], index) => {
            return (
                <div
                key={index}
                className="flex items-center gap-5 p-3"
                >
                <div className="flex items-center">
                    <span className="text-gray-400 mr-4">{index+1}</span>
                    <CircleUser className="w-4 h-4 text-gray-400 mr-2" />
                    <span>{value![0].isp.slice(0, 15) + (value![0].isp.length > 15 ? "..." : "")}</span>
                </div>
                <span className="bg-[#3A3A3A] px-2 py-1 rounded-full text-sm">
                    {value!.length / totalVal * 100}%
                </span>
                </div>
          )})}
        </div>
        <div className="flex items-center justify-end gap-1">
          <Button>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {[1, 2, 3, 4, 5].map((page) => (
            <Button
              key={page}
              className={page === 1 ? "bg-[#2A2A2A] hover:bg-[#3A3A3A] text-secondary-foreground" : "hover:bg-accent hover:text-accent-foreground text-gray-400"}
            >
              {page}
            </Button>
          ))}
          <span className="text-gray-400">...</span>
          <Button>
            100
          </Button>
          <Button>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

