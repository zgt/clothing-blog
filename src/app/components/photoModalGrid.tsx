'use client'
import { useEffect, useState } from "react";
import { InstaChild } from "./photoGrid";
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'
import InnerImageZoom from 'react-inner-image-zoom'


export default function PhotoModalGrid(instaChildren: object) {
    const [children, setChildren] = useState(instaChildren.instaChildren);

    


    useEffect(()=>{
    })

    return (
        <ul role="list" className="grid auto-rows-auto gap-x-3 gap-y-6 sm:grid-cols-4 sm:gap-x-4 lg:grid-flow-dense xl:gap-x-6">
          {children.map((file) => (
            <li key={file.mediaUrl} className="relative">
              <div className="group overflow-hidden row-span-2 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                {file.isImage ? (
                    <InnerImageZoom
                    alt=""
                    src={file.mediaUrl}
                    className="aspect-[4/5] object-cover group-hover:opacity-75"
                    zoomType="hover"
                    hideHint={true}
                  />
                ) : (
                    <MediaPlayer src={file.mediaUrl} aspectRatio="4/5" autoplay={true} muted={true} loop={true}>
                        <MediaProvider />
                    </MediaPlayer>
                    
                )}
              </div>
            </li>
          ))}
        </ul>
      )
}