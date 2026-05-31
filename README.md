# Crisis

A Node.js real-time game engine server built with Express and Socket.IO.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   node server.js
   ```
   The server will run on `http://localhost:3000`.

## Docker Deployment (Synology NAS)

This project automatically builds and publishes a pre-configured Docker image to the GitHub Container Registry. This means you do **not** need to download the source code files to run it!

### Prerequisites on Synology NAS
- Ensure **Container Manager** (DSM 7.2+) or **Docker** is installed via Package Center.

### Method 1: The "Zero-Download" GUI Method (Recommended)

You can run the server directly from the Synology interface without touching a single file:

1. Open **Container Manager** on your Synology NAS.
2. Go to the **Registry** tab.
3. In the search bar at the top right, search for: `ghcr.io/wrightjamie/crisis`
4. Select the image and click **Download** (choose the `latest` tag).
5. Once downloaded, go to the **Image** tab, select the image, and click **Run**.
6. **Network Settings**: Map local port `3000` to container port `3000`.
7. Click **Next** until done. The server will start automatically!

*(Note: The registry search requires that this GitHub repository is public or your NAS is authenticated to GHCR).*

### Method 2: Docker Compose (If you prefer compose files)

If you still want to use a `docker-compose.yml` file, you only need this snippet—no source code required:

```yaml
version: '3.8'
services:
  crisis:
    image: ghcr.io/wrightjamie/crisis:latest
    container_name: crisis_app
    ports:
      - "3000:3000"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```
Save that as `docker-compose.yml` on your NAS, and create a Project in Container Manager pointing to it.

### Updating the Application

If you used **Method 1**, go to the **Registry**, search for the image again, and download `latest`. Then go to the **Container** tab, right-click the container, and select **Action > Reset** to apply the new image.

If you used **Method 2**, go to the **Project** tab, select the project, and click **Action > Build**.

### Accessing the App
Once deployed, the server will be available on your local network at:
`http://<your_nas_ip>:3000`

## Scripts

- `npm run test`: Runs the test suites (`engine-actions.test.js` and `validate-scenarios.test.js`).
- `npm run audit`: Runs the token audit script.
