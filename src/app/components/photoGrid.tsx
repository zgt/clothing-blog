'use client'
import { useEffect, useState } from "react";

const files = [
    {
      title: 'IMG_4985.HEIC',
      size: '3.9 MB',
      source:
        'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    },
    {
      title: 'image2',
      size: '111 KB',
      source: 
      'https://images.unsplash.com/photo-1614926857083-7be149266cda?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=512&q=80'
    }
    // More files...
  ]

const userId = '9521402574590284'
const accessToken = "IGAAYlMWm40zZABZAE1rNDJVb0w1LUpYNm1EaTdsYmwtR0NPYlJ3MjVuaDNOTWJMR19faVdGZAklCbWFBNzBwUnhCUHVVY1c5VkltbWRkMm9JV3I1UDhQcFpfTzdvd3dMSWFRM3hhZAjg4MUYxM3FETnNPNkNmZAnQtSjEwN0E4eDExMAZDZD"

const instaUrl = `https://graph.instagram.com/${userId}/media?access_token=${accessToken}`


export interface InstaItem {
    permalink: string;
    mediaUrl: string;
}




export default function PhotoGrid() {

    const [instaItems, setInstaItems] = useState<InstaItem[]>([]);
    useEffect(()=>{
        console.log(userId)

        const fetchMedia = async (id: string) => {
            const mediaUrl = `https://graph.instagram.com/${id}?access_token=${accessToken}&fields=media_url,permalink`

            const res = await fetch(mediaUrl);
            const json = (await res.json());
            const instaItem: InstaItem = {
                permalink: json.permalink,
                mediaUrl: json.media_url
            }
            return instaItem
        }

        const doFetch = async() =>{
            const res = await fetch(instaUrl)
            const json = (await res.json()).data;

            console.log(json)

            const fetchedItems: InstaItem[] = [];

            for(let i = 0; i<json.length && i<9; i++){
                const item = json[i];
                const itemId = item.id;
                const instaItem = await(fetchMedia(itemId))

                fetchedItems.push(instaItem)
            }
            console.log(fetchedItems)

            setInstaItems(fetchedItems)
        }

        doFetch()
    }, [userId, accessToken, instaUrl])
    return (
        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">{
              <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {instaItems.map((file) => (
              <li key={file.mediaUrl} className="relative">
              <div className="group overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                <img
                  alt=""
                  src={file.mediaUrl}
                  className="pointer-events-none aspect-[10/7] object-cover group-hover:opacity-75"
                />
                <button type="button" className="absolute inset-0 focus:outline-none">
                  <span className="sr-only">View details for {file.title}</span>
                </button>
              </div>
              <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{file.title}</p>
              <p className="pointer-events-none block text-sm font-medium text-gray-500">{file.size}</p>
              </li>
              ))}
              </ul>}
            </div>
          </div>
        </main>
    )
}