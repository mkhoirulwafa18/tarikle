import { NextResponse } from "next/server";
import { promises as fs } from 'fs';

export async function GET(
) {
    try {
        const file = await fs.readFile(process.cwd() + '/app/data/vids.json', 'utf8');
        let vids = JSON.parse(file)
        const getAll = await getAllVideos()
        const allVids = [...vids, ...getAll];

        await fs.writeFile(process.cwd() + '/app/data/vids.json', JSON.stringify(allVids));


        return NextResponse.json(allVids);
    } catch (error) {
        console.log('[PLAY_GET]', error)
        return new NextResponse("Internal error", { status: 500 });
    }
}

async function getAllVideos() {
    let allVids: any[] = []
    let pageToken: string | null = null

    do {
        const API_KEY = process.env.YT_API_KEY;
        const youtubePlaylistId = process.env.YT_PLAYLIST_ID;

        const URL = pageToken === null ?
            `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${youtubePlaylistId}&key=${API_KEY}` :
            `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${youtubePlaylistId}&key=${API_KEY}&pageToken=${pageToken}`
        const data: any = await fetch(URL);
        const result = await data.json();

        result.items.map((item: any, index: any) => {
            allVids = [...allVids, { videoId: item.snippet.resourceId.videoId, publishedAt: item.snippet.publishedAt, title: item.snippet.title }]
        })
        pageToken = result.nextPageToken;
    } while (pageToken != null);
    return allVids;
}