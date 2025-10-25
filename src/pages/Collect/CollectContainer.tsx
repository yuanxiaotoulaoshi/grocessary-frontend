import CollectUI from './CollectUI';
import useCollect from './useCollect';

export default function CollectContainer(){
    const {
        listRef,
        favorites,
        currentAudio,
        isLoading,
        isLastPage,
        showCancel,
        loadMoreRef,
        selectedId,
        currentMetadata,
        selectedText,
        showForm,
        playAudio,
        formatDate,
        handleDelete,
        setShowCancel,
        cancelCollect,
        setShowForm,
    } = useCollect();

    return (
        <CollectUI
            listRef={listRef}
            favorites={favorites}
            currentAudio={currentAudio}
            isLoading={isLoading}
            isLastPage={isLastPage}
            showCancel={showCancel}
            loadMoreRef={loadMoreRef}
            selectedId={selectedId}
            currentMetadata={currentMetadata}
            selectedText={selectedText}
            showForm={showForm}
            playAudio={playAudio}
            formatDate={formatDate}
            handleDelete={handleDelete}
            setShowCancel={setShowCancel}
            cancelCollect={cancelCollect}
            setShowForm={setShowForm}
        />
    )
}