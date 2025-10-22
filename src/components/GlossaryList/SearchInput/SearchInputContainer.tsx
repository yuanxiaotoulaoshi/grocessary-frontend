import SearchInputUI from "./SearchInputUI";
interface SearchInputContainerProps{
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}
export default function FormModalContainer({
    searchTerm,
    setSearchTerm,
}:SearchInputContainerProps){
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=> setSearchTerm(e.target.value)
    return (
        <SearchInputUI
            value={searchTerm}
            placeholder="🔍 搜索术语（中英文均可）"
            onChange={onChange}
        />
    )
}