# chern_capital

A zero-build static personal website. It can be deployed for free on GitHub Pages, Cloudflare Pages, Netlify, or Vercel.

## Local preview

Open `index.html` directly in a browser, or run:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Free deployment: GitHub Pages

1. Create a public GitHub repository named `chern_capital`.
2. Upload `index.html`, `styles.css`, `script.js`, and `README.md`.
3. In the repository, open `Settings` -> `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Select the `main` branch and `/root`, then save.
6. Your site will be available at `https://<your-github-username>.github.io/chern_capital/`.

For a cleaner address, create a repository named `<your-github-username>.github.io` instead. Then the site URL is `https://<your-github-username>.github.io/`.

## Free deployment: Cloudflare Pages

1. Push this folder to GitHub.
2. In Cloudflare Pages, create a project from the GitHub repository.
3. Leave the build command empty.
4. Set the output directory to `/`.
5. Deploy.

Cloudflare will give you a free `*.pages.dev` URL.
