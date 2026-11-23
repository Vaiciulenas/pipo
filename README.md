# PIPO

Website for **PIPO**, my small 3D printing project: computer accessories, car accessories and home decorations. It shows a catalogue of printed parts with search, photo galleries and a contact page, in a retro pixel-art style.

The site is self-hosted on my own home server.

## Features

- **Print catalogue:** each print has its own page with a title, tags, a description and photos.
- **Instant search:** suggestions appear while you type in the navbar, and results are ranked by relevance. Title matches rank above tag matches, which rank above description matches, and matches at the start of a word score higher.
- **Keyboard-friendly search:** use the arrow keys to move through suggestions, Enter to open one and Esc to close the list. On mobile, search opens in its own dialog.
- **Photo lightbox:** an image gallery (full-screen on phones) with thumbnails, next/previous buttons, arrow-key navigation and swipe support on touch screens.
- **Responsive retro design:** a pixel font (Press Start 2P) with Material UI components, adapted for mobile and desktop.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript |
| UI | Material UI 7, Tailwind CSS 4 |
| Hosting | Ubuntu Server, Docker, Cloudflare Tunnel |
| Monitoring | Uptime Kuma |

## Project structure

```
app/
├── components/        Navbar and homepage sections (Hero, Examples, ...)
├── lib/
│   ├── prints.ts      Catalogue data and the PrintItem type
│   └── search.ts      Search and ranking logic
├── prints/[id]/       Print detail page with the photo lightbox
├── search/            Search results page
├── contact/           Contact page
└── layout.tsx         Root layout, fonts and metadata
public/prints/         Product photos
```

## Running locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

### Contact form

Messages from the contact form are forwarded as JSON (`name`, `email`, `subject`, `message`, `sentAt`) to a webhook, for example an n8n workflow that emails them. Set the URL in `.env.local` (or in the Docker container's environment):

```bash
CONTACT_WEBHOOK_URL=https://your-n8n-host/webhook/contact
```

## Deployment

The site runs on a home server (an ASUS Chromebox running Ubuntu Server):

1. The app is built into a **Docker** image and runs as a container on port 3000, set to restart automatically.
2. A **Cloudflare Tunnel** (`cloudflared`, also in Docker) makes the site reachable from the internet over HTTPS, without opening any ports on the home router.
3. **Uptime Kuma** monitors the site and reports if it goes down.

To deploy an update, the server pulls the latest code from this repository, rebuilds the image and replaces the running container.

## Roadmap

- Add more prints and photos to the catalogue
