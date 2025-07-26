interface SearchInputProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}
const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="mb-6">
            <input
                type="text"
                placeholder="🔍 搜索术语（中英文均可）"
                className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
}
export default SearchInput;
