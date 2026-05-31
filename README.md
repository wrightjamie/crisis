# Crisis

A Node.js real-time game engine server built with Express and Socket.IO for the UK Crisis Wargame.

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

## Documentation

The project includes several key pieces of documentation for understanding the data structures and development standards:

- **[Data Schema Guide](schema.md)**: The core documentation explaining how to construct Scenarios, Events, Decisions, and AI Configurations.
- **[Agent Prompts](AGENT.md)**: Guidelines for AI agent behaviour within the project.
- **[Game Details](Details.md)**: Detailed explanations of the game mechanics, design principles, and overall system architecture.
- **[Image Style Guide](IMAGE_STYLE_GUIDE.md)**: Standards for imagery and assets.

## Testing & Validation

The engine includes built-in test scripts to ensure the integrity of your scenarios and game logic before deployment.

- `npm run test`: Runs all tests.
- `npm run test:scenarios`: Runs `validate-scenarios.test.js` to ensure your scenario JSON structures adhere to the schema and contain no broken references or impossible conditions.
- `npm run test:engine`: Runs `engine-actions.test.js` to validate core logic like role fallbacks, scoring math, and state management.

*Always run tests before committing new scenarios to catch simple typos in event IDs or asset states.*

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
