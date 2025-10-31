import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import {useTranslation} from 'react-i18next';

interface ConfirmDislogueProps {
    isOpen:boolean,
    onClose:()=> void,
    onConfirm:()=> void
}

const ConfirmDialog:React.FC<ConfirmDislogueProps> =({isOpen,onClose,onConfirm})=>{
	const {t} = useTranslation('dialogue');
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">

            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

                <DialogTitle className="text-lg font-bold">{t('cancelDialogue.confirmCancel')}</DialogTitle>

                    <Description className="text-sm text-gray-500 mt-2">
                        {t('cancelDialogue.warning')}
                    </Description>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
                            onClick={onClose}
                        >
                        {t('cancelDialogue.cancelBtn')}
                        </button>

                        <button
                            className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
                            onClick={onConfirm}
                        >
                            {t('cancelDialogue.canfirmBtn')}
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog> 
    )
}
export default ConfirmDialog;