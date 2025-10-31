import { useState } from 'react';
import TabBarContainer from 'components/GlossaryList/TabBar/TabBarContainer';
import SearchInputContainer from 'components/GlossaryList/SearchInput/SearchInputContainer';
import AddButton from 'components/GlossaryList/AddButton';
import FormModalContainer from 'components/GlossaryList/FormModal/FormModalContainer';
import ListContainer from 'components/GlossaryList/List/ListContainer';

export default function GlossaryList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    return (
        <div>
            <TabBarContainer/>
            <SearchInputContainer 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
            />
            <AddButton setShowForm={setShowForm}/>
            {showForm && (<FormModalContainer 
                defaultEnName=''
                currentMetadata=''
                theme='light'
                className=''
                showForm={showForm}
                setShowForm={setShowForm}
            />)}
            <ListContainer searchTerm={searchTerm}/>
        </div>
    );
}
