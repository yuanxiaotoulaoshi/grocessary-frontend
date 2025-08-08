import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {RootState, AppDispatch} from 'store'
import {setCategoryInfo} from '../../store/tabSlice';
import { useForm } from "react-hook-form";
import {request} from '../../services/api';
import { RefreshCcw } from 'lucide-react';

interface FormModelProps {
    defaultEnName:string,
    currentMetadata:string,
    showForm: boolean,
    setShowForm: (show: boolean) => void;
}

const FormModel: React.FC<FormModelProps> = ({defaultEnName,currentMetadata,showForm,setShowForm})=>{
    const dispatch = useDispatch<AppDispatch>();
    const categoryInfo = useSelector((state: RootState) => state.selectedTab.categoryInfo)
    const level1Tabs = Object.keys(categoryInfo);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
      } = useForm({
        defaultValues: {
            cnName: '',
            enName: '',
            curFirstCategory: '',
            curSecondCategory: ''
          }
      });

    const curFirstCategory = watch('curFirstCategory');
    const cnName = watch('cnName');
    const secondCategory = categoryInfo[curFirstCategory]||[];

    const onCancel = ()=>{
        // clear form
        reset();
        setShowForm(false);
    }

    const onSubmit = (data:any)=>{
        request({
            method:'POST',
            url:'/glossary/add',
            data:{
                cnName:data.cnName||'/',
                enName:data.enName,
                categoryLevel1:data.curFirstCategory,
                categoryLevel2:data.curSecondCategory,
                currentMetadata,
            }
        }).then((res)=>{
            if(res.insert){
                alert('插入成功，审核中！！！');
            }else{
                alert(res.message);
            }
            setShowForm(false);
        })
    }

    const translate = async ()=>{
        const result = await request({
            method:'GET',
            url:'/translate',
            params:{
                text: cnName,
            }
        })
    }

    useEffect(()=>{
        if(level1Tabs.length===0){
            request({
                method:'GET',
                url:'/glossary/categories',
            }).then((res)=>{
                dispatch(setCategoryInfo(res));
            })
        }
    },[])

    useEffect(() => {
        if (showForm) {
          reset({
            cnName: defaultEnName?'/':'',
            enName: defaultEnName,
            curFirstCategory: '',
            curSecondCategory: ''
          });
        }
      }, [defaultEnName, showForm]);

    useEffect(()=>{
        if(showForm){
            document.body.style.overflow = 'hidden';
        }else{
            document.body.style = ''
        }
        return ()=>{
            document.body.style.overflow = ''
        }
    },[showForm]);

    if(!showForm) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white rounded shadow-lg max-w-2xl w-full mx-4 p-6 relative overflow-y-auto max-h-[90vh]">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={`text-sm ${errors.cnName ? 'text-red-500' : 'text-gray-600'}`}>中文名</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border rounded" 
                            {...register('cnName',{ required: true })}
                        />
                    </div>
                    <div>
                        <div className='flex items-center'>
                            <label className={`text-sm ${errors.enName ? 'text-red-500' : 'text-gray-600'}`}>英文名</label>
                            <RefreshCcw onClick={translate} className="w-3 h-3 ml-3"/>
                            <div className="ml-1 text-xs text-gray-600">自动翻译</div>
                        </div>
                        <input 
                            type="text" 
                            className="w-full p-2 border rounded" 
                            {...register('enName', { required: true })}
                        />
                    </div>
                    <div className="col-span-2">
                        <label className={`text-sm ${errors.curFirstCategory ? 'text-red-500' : 'text-gray-600'}`}>一级分类</label>
                        <select 
                            className="w-full p-2 border rounded" 
                            {...register('curFirstCategory', { required: true })}
                        >
                        <option value="">请选择</option>
                        {level1Tabs.map((item)=>(<option key={item} value={item}>{item}</option>))}
                        </select>
                    </div>
                    <div className="col-span-2">
                        <label className={`text-sm ${errors.curSecondCategory ? 'text-red-500' : 'text-gray-600'}`}>二级分类</label>
                        <select 
                            className={`w-full p-2 border rounded ${!curFirstCategory ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}`}
                            disabled={!curFirstCategory}
                            {...register('curSecondCategory', { required: true })}
                        >
                        <option className="" value="">请选择</option>
                        {secondCategory.map((item)=>(<option key={item} value={item}>{item}</option>))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-end space-x-4 mt-5">
                    <button type="button" onClick={onCancel} className="text-gray-600 hover:underline">取消</button>
                    <button type="submit"  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">提交</button>
                </div>
            </form>   
        </div>
        </div>
    ); 
}
export default FormModel;