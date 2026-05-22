# Content Guide

Thoughts and Notes are powered by Astro content collections

Add new public content by creating paired Markdown or MDX files in the language folders:

```txt
src/content/thoughts/en/my-topic.md
src/content/thoughts/zh/my-topic.md
src/content/notes/en/my-note.md
src/content/notes/zh/my-note.md
```

Use the same `translationKey` for the English and Chinese versions so language switching can connect related entries

Set `draft: true` when you want a file to stay out of production lists and generated routes

The homepage previews and archive pages update automatically after a new file is added

Visible copy follows the site style: avoid sentence-ending periods in English and Chinese UI/content text
