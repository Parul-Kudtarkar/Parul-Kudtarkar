# Blog audio files

Place MP3 (or other supported) audio files here for blog posts. Each post can have an optional `audioUrl` in `lib/blog.ts` pointing to a file in this folder.

**Example:** For a post with slug `my-post-slug`, add the file `my-post-slug.mp3` here and set in `lib/blog.ts`:

```ts
audioUrl: "/audio/my-post-slug.mp3",
```

**Supported formats:** MP3 (recommended), WAV, OGG. Use MP3 for best compatibility and smaller file size.

**Creating audio:** You can record a voiceover or use text-to-speech tools to generate audio from the post content.
