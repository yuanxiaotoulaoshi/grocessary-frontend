interface SearchInputProps {
    value: string;
    placeholder:string;
    onChange:(e:any)=>void;
}
export default function SearchInput({ 
    placeholder,
    value,
    onChange,
}:SearchInputProps ){
    return (
        <div className="mb-6">
            <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
}

