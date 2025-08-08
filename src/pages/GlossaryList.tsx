import TabBar from '../components/GlossaryList/TabBar';
import SearchInput from '../components/GlossaryList/SearchInput';
import List from '../components/GlossaryList/List';
import AddButton from '../components/GlossaryList/AddButton';
import FormModel from '../components/GlossaryList/FormModel';
import { useState } from 'react';

export default function GlossaryList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    return (
        <div>
            <TabBar/>
            <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <AddButton setShowForm={setShowForm}/>
            <FormModel 
                showForm={showForm} 
                setShowForm={setShowForm}
                defaultEnName=''
                currentMetadata=''
            />
            <List searchTerm={searchTerm}/>
        </div>
    );
}
