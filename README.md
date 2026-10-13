# Radhika Varade — Interactive Portfolio

A responsive, story-led portfolio starter built with **HTML, CSS, vanilla JavaScript, Node.js and Express**. No React, no Behance.

## 1. Run it in VS Code

1. Extract this ZIP.
2. Open the extracted `radhika-portfolio` folder in VS Code.
3. Install Node.js LTS if you don't already have it: https://nodejs.org/
4. Open **Terminal → New Terminal**.
5. Run:

   ```bash
   npm install
   npm start
   ```

6. Open `http://localhost:3000`.

## Folder map

```text
radhika-portfolio/
├── public/
│   ├── index.html          # Page structure + portfolio copy
│   ├── styles.css          # Visual system + responsive layouts
│   ├── app.js              # Scroll interactions, image lightbox, gallery
│   └── assets/
│       ├── sheenoire-logo.png
│       ├── linzz-*.png
│       └── pirohaa/        # Extracted Pirohaa visuals
├── server/
│   └── server.js           # Express server + API routes
├── package.json
└── README.md
```

## Important before sharing publicly

- **Email:** replace `radhika.varade@gmail.com` in `public/index.html` if that isn't the address you want to publish.
- **Instagram:** the current Instagram link is a generic profile destination. Replace it with your real profile.
- **CV:** not linked yet because a final PDF hasn't been supplied.
- **Sheenoire logo:** the uploaded logo is used as provided. If the image contains a baked-in background, export a transparent PNG from the original design.
- **Pirohaa:** a curated subset of images from the uploaded ZIP is included. Review the gallery for order, duplicates, and any work that should not be public. Replace/add images inside `public/assets/pirohaa/`; the Express API discovers the image files automatically.
- **Metasys:** the page is intentionally honest that detailed artifacts are unavailable. Add approved work only if you can share it.
- **VYBE:** the page links to your live project. It does not claim that the AI recommendation model has been evaluated.
- **Contact API:** `POST /api/contact` validates and logs submissions for development; it does **not** send email yet. Before launch, connect a provider such as Resend, add rate limiting, and protect against spam.

## API routes

- `GET /api/health` — server health check.
- `GET /api/assets/pirohaa` — image filenames in the Pirohaa asset folder.
- `POST /api/contact` — basic contact payload validation (demo only).

## Design direction

Warm paper and ink set the narrative tone; cobalt and lime mark transitions into the workshop and engineering chapters. Playfair Display brings editorial contrast; DM Sans keeps body copy readable; DM Mono is reserved for labels and system details. The story is cinematic, but the project sections put evidence and clear contribution before clever copy.

## Next iteration checklist

- [ ] Verify your public email and Instagram.
- [ ] Add a final one-page resume PDF.
- [ ] Replace the Sheenoire mock browser visual with selected real prototype screenshots (export from Figma).
- [ ] Add selected Pirohaa campaign assets and captions that distinguish your work from team work.
- [ ] Add actual VYBE screenshots, architecture diagram, and implementation status.
- [ ] Test keyboard navigation, mobile layout, and all links.
- [ ] Connect contact endpoint to a real mail service before deployment.


## Deploy on Render (public preview)

This project includes `render.yaml` for Render. To deploy:
1. Push the contents of this folder to a GitHub repository you own.
2. In Render, choose **New → Blueprint** and connect that repository.
3. Render detects `render.yaml`; review and create the web service.
4. When deployment finishes, open the generated `onrender.com` URL and check `/api/health`.

The contact endpoint is still a demo: it validates and logs submissions but does not email them. Do not rely on it for real inquiries until an email provider and spam protection are configured.
