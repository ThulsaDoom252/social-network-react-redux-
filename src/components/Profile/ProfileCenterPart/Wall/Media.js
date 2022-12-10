import React from 'react';
import miracle from "./test.mp3"
import { ReactAudioControl } from 'react-audio-control'
import 'react-audio-control/dist/index.css'

const Media = () => {
    const songTitle = 'Theme by TimMoor'

    const togglePlay = () => {
        // setIsPlaying(!isPlaying)
    }

    const updateVolume = (vol) => {
        // setVolume(vol)
    }
    return (
        <div>
            <ReactAudioControl
                updateVolume={updateVolume}
                togglePlay={togglePlay}
                styling={{back: {border: 'solid 2px green'}}}
                title={songTitle}
            />
        </div>
    )
}

export default Media;