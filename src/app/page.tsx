"use client";

import { useEffect } from "react";
import { openDB } from "idb";

export default function Home() {
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
      Hello APp
      <button className="bg-white text-black p-2 rounded-lg hover:scale-105" onClick={retrieveVideo}>Play video</button>
    </main>
  );
}
