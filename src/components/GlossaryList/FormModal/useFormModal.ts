// src/components/GlossaryList/FormModal/useFormModal.ts
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from 'store';
import { setCategoryInfo } from '../../../store/tabSlice';
import { request } from '../../../services/api';

export function useFormModal(defaultEnName:string,currentMetadata:string){
    const dispatch = useDispatch<AppDispatch>();
    const categoryInfo = useSelector(
        (state: RootState) => state.selectedTab.categoryInfo
    );
    const level1Tabs = Object.keys(categoryInfo);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        trigger,
    } = useForm({
        defaultValues: {
            cnName: '',
            enName: '',
            curFirstCategory: '',
            curSecondCategory: '',
        },
        mode:'onChange',
    });

    register('cnName', {
        required: '请输入中文名',
        minLength: {
            value: 2,
            message: '中文名至少2个字符'
        }
    });
    
    register('enName', {
        required: '请输入英文名',
        pattern: {
            value: /^[a-zA-Z\s]+$/,
            message: '英文名只能包含字母和空格'
        }
    });
    
    register('curFirstCategory', {
        required: '请选择一级分类'
    });
    
    register('curSecondCategory', {
        required: '请选择二级分类'
    });

    const cnName = watch('cnName');
    const curFirstCategory = watch('curFirstCategory');
    const secondCategory = categoryInfo[curFirstCategory] || [];

    useEffect(() => {
        setValue('curSecondCategory', '');
    }, [curFirstCategory, setValue]);

    useEffect(() => {
        console.log("level1Tabs:",level1Tabs)
        if (level1Tabs.length === 0) {
        console.log("$$$")
        request({ method: 'GET', url: '/glossary/categories' }).then((res) => {
            dispatch(setCategoryInfo(res));
        });
        }
    }, []);

    const onSubmit = handleSubmit((data) => {
        request({
        method: 'POST',
        url: '/glossary/add',
        data: {
            ...data,
            cnName: data.cnName || '/',
            currentMetadata,
        },
        }).then((res) => {
        alert(res.insert ? '插入成功，审核中！' : res.message);
        });
    });

    const onTranslate = async () => {
        await request({
        method: 'GET',
        url: '/translate',
        params: { text: cnName },
        });
    };

    return {
        watch,
        setValue,
        errors,
        level1Tabs,
        secondCategory,
        onSubmit,
        onTranslate,
        trigger,
    };

}