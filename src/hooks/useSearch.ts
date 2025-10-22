import { useMemo } from "react";
interface UseSearchOptions<T> {
    data:T[];
    searchTerm:string;
    searchFields:(keyof T)[];
}

export function useSearch<T>({data, searchTerm, searchFields}:UseSearchOptions<T>){
    const filterData = useMemo(()=>{
        const term = searchTerm.trim().toLowerCase();
        if(!term) return data;
        return data.filter((item)=>
            searchFields.some((field)=>{
                const value = item[field];
                return typeof value =='string' && value.toLowerCase().includes(term);
            })
        )
    },[searchTerm,data])
    return filterData
}