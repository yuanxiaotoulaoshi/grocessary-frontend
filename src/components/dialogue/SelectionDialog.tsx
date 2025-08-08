import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

interface ConfirmDislogueProps {
    selectedText:string,
    isOpen:boolean,
    onClose:()=> void,
    onConfirm:()=> void,
    setSelectedText:(text:string)=>void,
}

const ConfirmDialog:React.FC<ConfirmDislogueProps> =({selectedText,isOpen,onClose,onConfirm,setSelectedText})=>{
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">

            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

                <DialogTitle className="text-lg font-bold">确认收藏该chunk?</DialogTitle>

                    <input 
                        placeholder=""
                        value={selectedText}
                        onChange={(e) => setSelectedText(e.target.value)}
                    />

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
                            onClick={onClose}
                        >
                        取消
                        </button>

                        <button
                            className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
                            onClick={onConfirm}
                        >
                        确认
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog> 
    )
}
export default ConfirmDialog;