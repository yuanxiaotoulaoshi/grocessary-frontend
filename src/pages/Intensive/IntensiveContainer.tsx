import IntensiveUI from './IntensiveUI';
import useIntensive from './useIntensive';

export default function IntensiveContainer(){
    const {
        modeSettings,
        playMode,
        videoRef,
        videoUrl,
        listRef,
        subtitles,
        subtitleRefs,
        activeIndex,
        selectedText,
        currentMetadata,
        showForm,
        handleUploadSuccess,
        setPlayMode,
        handleCollectSentences,
        handleSubtitleClick,
        formatTime,
        setShowForm,
    } = useIntensive();
    return(
        <IntensiveUI
            modeSettings={modeSettings}
            playMode={playMode}
            videoRef={videoRef}
            videoUrl={videoUrl}
            listRef={listRef}
            subtitles={subtitles}
            subtitleRefs={subtitleRefs}
            activeIndex={activeIndex}
            selectedText={selectedText}
            currentMetadata={currentMetadata}
            showForm={showForm}
            handleUploadSuccess={handleUploadSuccess}
            setPlayMode={setPlayMode}
            handleCollectSentences={handleCollectSentences}
            handleSubtitleClick={handleSubtitleClick}
            formatTime={formatTime}
            setShowForm={setShowForm}
        />
    )
}