import {useTranslation} from 'react-i18next';
import SearchInputUI from "./SearchInputUI";
interface SearchInputContainerProps{
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}
export default function FormModalContainer({
    searchTerm,
    setSearchTerm,
}:SearchInputContainerProps){
	const {t} = useTranslation('addButton');
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=> setSearchTerm(e.target.value)
    return (
        <SearchInputUI
            value={searchTerm}
            placeholder={'🔍 '+t('search.searchPlaceHolder')}
            onChange={onChange}
        />
    )
}