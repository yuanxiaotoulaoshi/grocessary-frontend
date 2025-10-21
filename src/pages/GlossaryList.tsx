import TabBarContainer from 'components/GlossaryList/TabBar/TabBarContainer';
import SearchInput from '../components/GlossaryList/SearchInput';
import List from '../components/GlossaryList/List';
import AddButton from '../components/GlossaryList/AddButton';
import FormModalContainer from 'components/GlossaryList/FormModal/FormModalContainer';
import { useState } from 'react';

export default function GlossaryList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    return (
        <div>
            <TabBarContainer/>
            <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <AddButton setShowForm={setShowForm}/>
            <FormModalContainer 
                defaultEnName=''
                currentMetadata=''
                theme='light'
                className=''
                showForm={showForm}
                setShowForm={setShowForm}
            />
            <List searchTerm={searchTerm}/>
        </div>
    );
}
