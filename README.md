# A Little Note of Gratitude

A pastel-green, interactive Thanksgiving appreciation gift built with HTML, CSS, and vanilla JavaScript. No build step, backend, Node.js, npm, or Live Server is needed.

## Project files

```text
.
├── index.html
├── style.css
├── script.js
├── run.bat
├── README.md
└── assets/
    ├── images/
    │   └── README.md
    └── music/
        └── README.md
```

## Run locally

1. Open this folder in VS Code.
2. Open **Terminal → New Terminal**.
3. Run `python -m http.server 8000` (or run `run.bat` from Command Prompt).
4. Visit [http://localhost:8000](http://localhost:8000/).
5. Press **Ctrl+C** in the terminal to stop the server.

Python 3 must be installed and available as `python`. The page does not automatically open an external application.

## Customize the gift

Edit the `CONFIG` object near the top of `script.js`:

- `recipientName` personalizes the envelope greeting and letter.
- `senderSignature` personalizes the letter and closing signature.
- `appreciationLetter` controls the letter text. Keep blank lines between paragraphs and use `{recipientName}` / `{senderSignature}` where desired.
- `gratitudeCards` controls the three flip cards.
- `finalGreeting` controls the closing thought, message, and signature.

The site uses inline botanical/emoji illustrations, so no image files are required. To enable the optional BTS "Magic Shop" player, add the MP3 you supply as `assets/music/magic-shop.mp3`. It never autoplays; visitors start and pause it with the player. The site clearly indicates when that local file has not been added.

## Publish with GitHub Pages

Create an empty GitHub repository, then from this project folder run:

```bash
git init
git add index.html style.css script.js README.md run.bat assets
git commit -m "Create Thanksgiving appreciation site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the remote URL with your repository's URL. On GitHub, open **Settings → Pages**, choose **Deploy from a branch**, select **main** and **/(root)**, then save. GitHub will show the published URL on that page. All site assets use relative paths, and no Python server is needed for the hosted site.
