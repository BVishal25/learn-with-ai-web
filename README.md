# Learn (with) AI: Interactive AI Learning Platform

This repository contains an interactive, gamified platform for learning about Artificial Intelligence, from foundational concepts to advanced topics.

View your app in AI Studio: https://ai.studio/apps/drive/1eRTLqc7KGmCcaqoIyA1u8HD6YiD-IeIq?showAssistant=true&showCode=true&showPreview=true&showTreeView=true&resourceKey

## Features
- **Interactive Curriculum:** A comprehensive set of lessons on AI, Machine Learning, Deep Learning, and more.
- **AI-Powered Tools:** Features like AI-generated lesson content and simplified explanations, powered by the Gemini API.
- **Gamified Learning:** An "AI Venture" text-based RPG to apply your knowledge in fun, simulated scenarios.
- **Integrated Note-Taking:** Save your thoughts and key takeaways directly from any lesson.
- **User-Provided API Key:** Users can provide their own Gemini API key to power the application's AI features.

## How It Works

The application is a modern React single-page application built with Vite and TypeScript. It uses the Google Gemini API for its intelligent features.

### User-Provided Gemini API Key

To manage API costs and allow for scalability, this application requires users to provide their own Gemini API key.

1.  A user signs into the application.
2.  They navigate to the **Settings** page.
3.  In the "AI Provider & API Key" section, they can enter their Gemini API Key.
4.  The key is stored securely in the browser's local storage and is used for all subsequent calls to the Gemini API.

This model empowers users to fully utilize the app's features using their own API quota.

---

## Run Locally

**Prerequisites:** Node.js, npm

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Configure Environment Variables:**
    Create a `.env.local` file in the root of the project. This file is for local development and should not be committed to source control. Add your Google Client ID to it:

    ```
    # .env.local
    VITE_GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID_HERE"
    ```
    *To get a Google Client ID, visit the [Google Cloud Console](https://console.cloud.google.com/apis/credentials), create an OAuth 2.0 Client ID for a "Web application", and make sure to add `http://localhost:5173` (or your dev server's address) to the "Authorized JavaScript origins".*

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
4.  Open the app in your browser, go to **Settings**, and add your Gemini API Key.

---

## Deploying to the Web

You can easily deploy this application to any static hosting service like Vercel, Netlify, or GitHub Pages.

1.  **Build the application:**
    ```bash
    npm run build
    ```
    This command will create a `dist` directory with all the production-ready static files.

2.  **Deploy:**
    Upload the contents of the `dist` directory to your hosting provider. You will also need to configure your `VITE_GOOGLE_CLIENT_ID` as an environment variable in your hosting provider's settings. Make sure to add your production URL to the "Authorized JavaScript origins" in your Google Cloud Console credentials.

---

## Run with Docker

**Prerequisites:** Docker

1.  **Build the Docker image:**
    From the root directory of the project, run:
    ```bash
    docker build -t learn-with-ai .
    ```

2.  **Run the Docker container:**
    You must provide your Google Client ID as an environment variable when running the container.

    ```bash
    docker run -p 8080:80 \
      -e VITE_GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID_HERE" \
      --name learn-with-ai-app \
      -d learn-with-ai
    ```
    - `-p 8080:80`: Maps port 8080 on your local machine to port 80 inside the container.
    - `-e VITE_GOOGLE_CLIENT_ID`: Sets the environment variable for the Google Client ID.
    - `--name learn-with-ai-app`: Gives the container a memorable name.
    - `-d`: Runs the container in detached mode (in the background).

3.  **Access the app:**
    Open your browser and navigate to `http://localhost:8080`.

4.  Go to **Settings** in the running application and add your Gemini API Key.