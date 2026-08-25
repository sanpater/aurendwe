# Railway Deployment Guide

This project is configured to deploy instantly on [Railway](https://railway.app) using a local JSON database.

It requires **no external database** (like Postgres or MongoDB) and **no environment variables**. The app automatically pre-loads demo farmers and equipment data on the first run.

## Step 1: Deploy to Railway

1. Go to [Railway.app](https://railway.app/) and log in with your GitHub account.
2. Click **New Project** -> **Deploy from GitHub repo**.
3. Select this repository.
4. Railway will automatically detect the `package.json` file, run `npm install`, and start the app using `node server.js`.

## Step 2: Access Your App

1. Once the deployment finishes (it should take less than a minute), go to your Railway project settings.
2. Under the **Settings** tab, go to **Domains** and click **Generate Domain**.
3. Railway will give you a public URL (e.g., `https://your-app-production.up.railway.app`).
4. Click the link to open your live application!

## Notes on Data Storage
Because Railway uses ephemeral (temporary) file systems by default, any new data you add (new users, new bookings) will reset to the original demo data if the server goes to sleep or redeploys.

To make your data permanent:
1. In your Railway project, click on your service.
2. Go to **Settings** -> **Volumes**.
3. Click **Create Volume** and set the mount path to `/app`.
This will ensure your `database.json` file is saved permanently!