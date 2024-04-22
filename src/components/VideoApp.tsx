'use client';

import videojs from 'video.js';
import { useRef } from 'react';
// This imports the functional component from the previous sample.
import VideoJS from '@/components/VideoPlayer';

const VideoApp = () => {
  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
      type: 'video/mp4'
    }]
  };

  const handlePlayerReady = (player:any) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  return (
    <>
      <div>Rest of app here</div>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      <div>Rest of app here</div>
    </>
  );
}

export default VideoApp;
