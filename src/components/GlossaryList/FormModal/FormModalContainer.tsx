// src/components/GlossaryList/FormModal/FormModalContainer.tsx
import FormModalUI from './FormModalUI';
import {useFormModal} from './useFormModal';

interface FormModalContainerProps{
    defaultEnName:string;
    currentMetadata:string;
    theme?:'light'|'dark';
    accentColor?:string;
    className?:string;
    showForm:boolean;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function FormModalContainer({
    defaultEnName,
    currentMetadata,
    theme,
    accentColor,
    className,
    showForm,
    setShowForm,
}:FormModalContainerProps){
    const{
        watch,
        setValue,
        errors,
        level1Tabs,
        secondCategory,
        onSubmit,
        onTranslate,
        trigger,
    } = useFormModal(defaultEnName, currentMetadata);

    const formFields = {
        cnName:watch('cnName'),
        enName: watch('enName'),
        curFirstCategory: watch('curFirstCategory'),
        curSecondCategory: watch('curSecondCategory'),
    };

    const onChange = (field: string, value: string) => {
        // 手动更新 useForm 状态
        setValue(field as any, value);
        trigger(field as any)
    };

   
    const onCancel = ()=>{
        setShowForm(false);
    }

    const handleSubmit = async () => {
        const isValid = await trigger();
        if(!isValid)return;
        await onSubmit(); // 调用hook内部的逻辑
        setShowForm(false); // ✅ 提交成功后关闭弹窗
    };

    const formattedErrors: Record<string, string> = {
        cnName: errors.cnName?.message as string || '',
        enName: errors.enName?.message as string || '',
        curFirstCategory: errors.curFirstCategory?.message as string || '',
        curSecondCategory: errors.curSecondCategory?.message as string || '',
    };


    return(
        <FormModalUI
            showForm={showForm}
            formFields={formFields}
            errors={formattedErrors}
            level1Tabs={level1Tabs}
            secondCategory={secondCategory}
            onChange={onChange}
            onSubmit={handleSubmit}
            onCancel={onCancel}
            onTranslate={onTranslate}
            theme={theme}
            accentColor={accentColor}
            className={className}
        />
    )
}