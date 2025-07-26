interface AddButtonProps {
  setShowForm: (show: boolean) => void;
}
const AddButton:React.FC<AddButtonProps> = ({setShowForm})=>{
  return (
    <button onClick={()=>{setShowForm(true)}} className="ml-2">➕ 添加词条</button>
  )
}
export default AddButton;