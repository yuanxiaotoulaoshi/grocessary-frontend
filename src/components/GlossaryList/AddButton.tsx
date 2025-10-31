import {useTranslation} from 'react-i18next';

interface AddButtonProps {
  setShowForm: (show: boolean) => void;
}
const AddButton:React.FC<AddButtonProps> = ({setShowForm})=>{
	const {t} = useTranslation('addButton');

  return (
    <button onClick={()=>{setShowForm(true)}} className="ml-2">➕ {t('add.addBtn')}</button>
  )
}
export default AddButton;