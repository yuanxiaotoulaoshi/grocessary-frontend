import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import zhLogin from './zh/login.json'
import zhIntensive from './zh/intensive.json'
import zhHome from './zh/home.json'
import zhCollect from './zh/collect.json'
import zhDialogue from './zh/dialogue.json'
import zhFormModal from './zh/formModal.json'
import zhProfileMenu from './zh/profileMemu.json'
import zhAddButton from './zh/addButton.json'
import zhLoadMore from './zh/loadMore.json'

import enLogin from './en/login.json'
import enIntensive from './en/intensive.json'
import enHome from './en/home.json'
import enCollect from './en/collect.json'
import enDialogue from './en/dialogue.json'
import enFormModal from './en/formModal.json'
import enProfileMenu from './en/profileMemu.json'
import enAddButton from './en/addButton.json'
import enLoadMore from './en/loadMore.json'

i18n
    .use(initReactI18next)
    .init({
        resources:{
            zh:{
                login:zhLogin,
                intensive:zhIntensive,
                home:zhHome,
                collect:zhCollect,
                dialogue:zhDialogue,
                formModal:zhFormModal,
                profileMenu:zhProfileMenu,
                addButton:zhAddButton,
                loadMore:zhLoadMore,
            },
            en:{
                login:enLogin,
                intensive:enIntensive,
                home:enHome,
                collect:enCollect,
                dialogue:enDialogue,
                formModal:enFormModal,
                profileMenu:enProfileMenu,
                addButton:enAddButton,
                loadMore:enLoadMore,
            },
        },
        lng:'en',
        fallbackLng:'zh',
        interpolation:{
            escapeValue:false,
        }
    })

    export default i18n;