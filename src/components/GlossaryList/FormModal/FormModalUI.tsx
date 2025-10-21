// src/components/GlossaryList/FormModal/FormModalUI.tsx
import { RefreshCcw } from 'lucide-react';

interface FormModelProps {
    showForm: boolean;
    formFields:{
        cnName: string;
        enName: string;
        curFirstCategory: string;
        curSecondCategory: string;
    }
    level1Tabs:string[];
    secondCategory: string[];
    errors: Record<string, any>;
    onChange: (field: string, value: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
    onTranslate: () => void;
    theme?: 'light' | 'dark';
    accentColor?: string;
    className?: string;
}

export default function FormModalUI({
    showForm,
    formFields,
    level1Tabs,
    secondCategory,
    errors,
    onChange,
    onSubmit,
    onCancel,
    onTranslate,
    theme = 'light',
    accentColor = '#22c55e',
    className = '',
}:FormModelProps){
    if(!showForm) return null;
    const themeClass =
    theme === 'dark'
      ? 'bg-gray-800 text-gray-100 border-gray-600'
      : 'bg-white text-gray-800 border-gray-200';
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className={`rounded shadow-lg max-w-2xl w-full mx-4 p-6 relative overflow-y-auto max-h-[90vh] ${themeClass} ${className}`}>
            <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={`text-sm ${errors.cnName ? 'text-red-500' : 'text-gray-600'}`}>中文名</label>
                        <input 
                            type="text" 
                            value={formFields.cnName}
                            onChange={(e) => onChange('cnName', e.target.value)}
                            className="w-full p-2 border rounded" 
                        />
                    </div>
                    <div>
                        <div className='flex items-center'>
                            <label className={`text-sm ${errors.enName ? 'text-red-500' : 'text-gray-600'}`}>英文名</label>
                            <RefreshCcw onClick={onTranslate} className="w-3 h-3 ml-3"/>
                            <div className="ml-1 text-xs text-gray-600">自动翻译</div>
                        </div>
                        <input 
                            type="text" 
                            value={formFields.enName}
                            onChange={(e) => onChange('enName', e.target.value)}
                            className="w-full p-2 border rounded" 
                        />
                    </div>
                    <div className="col-span-2">
                        <label className={`text-sm ${errors.curFirstCategory ? 'text-red-500' : 'text-gray-600'}`}>一级分类</label>
                        <select 
                            className="w-full p-2 border rounded" 
                            value={formFields.curFirstCategory}
                            onChange={(e) => onChange('curFirstCategory', e.target.value)}
                        >
                        <option value="">请选择</option>
                        {level1Tabs.map((item)=>(<option key={item} value={item}>{item}</option>))}
                        </select>
                    </div>
                    <div className="col-span-2">
                        <label className={`text-sm ${errors.curSecondCategory ? 'text-red-500' : 'text-gray-600'}`}>二级分类</label>
                        <select 
                            className={`w-full p-2 border rounded ${
                                !formFields.curFirstCategory
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : ''
                                }`}
                            disabled={!formFields.curFirstCategory}
                            value={formFields.curSecondCategory}
                            onChange={(e) => onChange('curSecondCategory', e.target.value)}
                        >
                        <option className="" value="">请选择</option>
                        {secondCategory.map((item)=>(<option key={item} value={item}>{item}</option>))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-end space-x-4 mt-5">
                    <button type="button" onClick={onCancel} className="text-gray-600 hover:underline">取消</button>
                    <button type="submit"  className="text-white px-4 py-2 rounded" style={{ backgroundColor: accentColor }}>提交</button>
                </div>
            </form>   
        </div>
        </div>
    ); 
}
