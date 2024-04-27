"use client";

import { useEffect, useState, useRef } from "react";
import { openDB } from "idb";

export default function VideoDownload() {
  // const [ src, setSrc] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(()=> {
    const downloadVideo = async () => {
        try{
          const response = await fetch('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4');
          const blob = await response.blob();
          const db = await openDB('my-database', 1, {
            upgrade(db){
              db.createObjectStore('videos');
            }
          });

          const tx = db.transaction('videos', 'readwrite');
          const store = tx.objectStore('videos');
          await store.put(blob, 'video.mp4');
          await tx.done;
          console.log('Video downloaded and stored locally')
        }
        catch(err){
          console.log(err);
        }
    }

    downloadVideo();
  }, []);

  const retrieveVideo = async () => {
    try{
      const db = await openDB('my-database', 1);
      const tx = db.transaction('videos', 'readonly');
      const store = tx.objectStore('videos');
      const videoBlob = await store.get('video.mp4');

      if(videoBlob){
        const blobUrl = URL.createObjectURL(videoBlob);
        // setSrc(blobUrl);
        const videoEl:any = videoRef.current;
        if(videoEl){
          videoEl.src = blobUrl;
          videoEl.play();
        }
        console.log(blobUrl);
      }
      await tx.done;

    }
    catch(err){
      console.log(err);
    }
    

  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <VideoApp/> */}
      <video width="420" height="250" ref={videoRef} controls>
        {/* <source src={src} type="video/mp4" ></source> */}
      </video>
      Hello APp
      <button className="bg-white text-black p-2 rounded-lg hover:scale-105" onClick={retrieveVideo}>Play video</button>
    </main>
  );
}
