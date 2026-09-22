# Deploy IRON SYSTEM to Netlify

The repository includes `netlify.toml`. Netlify builds this React/Vite app with Node 24 and `npm run build`, then publishes `dist/`. No backend, environment secrets, or Netlify-specific plugin is required.

## Deploy from a Git repository

1. Push this project, including `netlify.toml`, `package.json`, and `package-lock.json`, to your Git provider.
2. In Netlify, add/import a project from that repository and choose its production branch.
3. Use the directory containing `netlify.toml` as the project root. For this repository, leave the base directory unset.
4. Confirm **Build command: `npm run build`** and **Publish directory: `dist`**. The configuration file sets Node 24.
5. Deploy. Netlify supplies an HTTPS site address. Future pushes to the selected branch rebuild the site.

## Manual upload

With Node 24 installed:

```sh
npm ci
npm run build
```

Upload the generated **`dist` folder** through Netlify's manual deploy interface. Do not upload the raw source folder. Git-based deployments apply the repository's `netlify.toml`; manually uploading `dist` alone does not carry its custom cache headers.

## Verify the deployed site

- Open the HTTPS address and check `/#train`, `/#plan`, and `/#learn`.
- Save a plan change, reload, and confirm it remains.
- Open exercise details and play a tutorial. External video providers require internet and may restrict embedding; the source link is always available.
- Visit online once, allow the service worker to install, then reload offline to check the app shell.
- After an update, close old app tabs/windows and reopen the site so the waiting service worker can activate.

The app uses hash navigation, so it does not need a catch-all rewrite. Unknown asset paths should return 404 rather than HTML.

Workout data remains in the browser, not on Netlify. A localhost address, deploy-preview address, production domain, and custom domain each have separate storage. Export a JSON backup in Settings before changing domains, then import it on the destination. Publishing does not transfer local workout data.

No deployment has been performed by adding these files.

References: [Netlify Vite guide](https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/), [file-based configuration](https://docs.netlify.com/build/configure-builds/file-based-configuration/).
