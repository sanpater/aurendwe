# Deployment Guide (Vercel + Neon Postgres)

This project has been upgraded from a static local-storage prototype to a full-stack application with a real backend database. Follow these steps to deploy the project live on Vercel for your college presentation.

## Step 1: Create a Free Neon Database
1. Go to [Neon.tech](https://neon.tech/) and sign up for a free account.
2. Create a new project (e.g., "Krishi Sanjha").
3. Once created, you will see a **Connection String** in your dashboard. It looks something like:
   `postgresql://username:password@ep-withered-leaf-1234.us-east-2.aws.neon.tech/neondb?sslmode=require`
4. Copy this exact string; you will need it for Vercel.

## Step 2: Deploy to Vercel
1. Go to [Vercel.com](https://vercel.com/) and log in (using your GitHub account is recommended).
2. Click **Add New... > Project**.
3. Import your GitHub repository that contains this code.
4. On the **Configure Project** screen:
   - Leave the Framework Preset as "Other".
   - Open the **Environment Variables** section.
   - Add a new variable:
     - **Key:** `DATABASE_URL`
     - **Value:** Paste your Neon connection string here.
5. Click **Deploy**. Vercel will build and deploy your project automatically.

## Step 3: Initialize Your Database (Crucial!)
Because you just created a fresh database, it is completely empty. The app will fail if the tables don't exist yet.

1. Once your Vercel deployment finishes, copy your live domain (e.g., `https://your-project.vercel.app`).
2. Open a new tab in your browser and go to your setup link:
   `https://your-project.vercel.app/api/setup`
   *(You should see `{"message":"Database setup successfully"}`)*
3. Now, load the demo data by going to:
   `https://your-project.vercel.app/api/seed`
   *(You should see `{"message":"Database seeded successfully"}`)*

## Step 4: Test Your Live App!
Now go back to the homepage (`https://your-project.vercel.app/index.html`). The app will pull data straight from Neon Postgres. You can test making bookings, adding users, etc.

*Note: As requested, the Razorpay and WhatsApp integrations are omitted from the backend implementation.*