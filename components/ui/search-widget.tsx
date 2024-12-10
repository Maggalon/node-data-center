import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchWidgetProps {
    value: string;
    onChange: (val: string) => void
}

export default function SearchWidget({ value, onChange }: SearchWidgetProps) {

    const [toggleSearch, setToggleSearch] = useState<boolean>(false)

    return (
        <div onClick={() => setToggleSearch(true)} className="border rounded-2xl text-gray-500 md:w-96 py-2 px-4 cursor-pointer hover:text-gray-400 hover:border-gray-400">
            {!toggleSearch &&
                <div className="md:grid md:grid-cols-3 md:justify-items-stretch">
                    <div className="hidden md:block"></div>
                    <span className="text-center hidden md:block">Search mode</span>
                    <Search className="justify-self-end" />
                </div>
            }
            
            {toggleSearch &&
                <div className="flex items-center gap-3">
                    <Search />
                    <input type="text" 
                           value={value} 
                           onChange={e => onChange(e.target.value)} 
                           onBlur={() => setToggleSearch(false)} 
                           className="bg-transparent focus:outline-none focus:w-24" 
                           autoFocus />
                </div>
            }
        </div>
    )
}