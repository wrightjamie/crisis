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

---

## Setting or Resetting the Admin Password & Refreshing Server Data

The Admin panel (`/admin`) and Scenario Editor are protected by a hashed admin password stored in the SQLite database (`data/crisis.db`) and backed up locally in `data/.admin-auth.json` (gitignored so `git pull` never overwrites your password).

> **Persistence Tip:** Make sure `./data:/usr/src/app/data` is mounted as a volume in your container configuration so your password and scenario edits survive container updates and restarts.

### Method A: Web Reset & Recovery Console (`/reset` or `/reset.php`) — No Terminal Required

Navigate to **`http://<your_host>:3000/reset`** (or **`/reset.php`**) in your browser to:
1. **Refresh All Scenarios & Images from Disk:** Syncs all built-in `scenario.js` files, `outcomeMessages`, guides, and base images into SQLite without deleting custom scenarios.
2. **Reset Admin Password:** Updates your admin password and logs you in immediately.
3. **Full Database Rebuild & Reset:** Safely deletes `crisis.db`, `crisis.db-wal`, and `crisis.db-shm`, creates a clean SQLite database, and re-seeds all built-in scenarios and images in one click.

**How `/reset` is protected:**
* If you are already logged in (or on a fresh database with no password set yet), you can run any action directly.
* Otherwise, enter your **current admin password**, a configured `RESET_SECRET` / `ADMIN_PASSWORD` environment variable, or the **8-character One-Time Recovery Code** (`XXXX-XXXX`).
* Need a recovery code? Click **Log New Code** on `/reset` and check your container/server **Logs** tab (or `data/recovery-code.txt`) for the printed `🔐 CRISIS SERVER RECOVERY CODE`.

### Method B: One-Step CLI Reset & Sync (`npm run reset-server`)

From `/usr/src/app` in the Dockhand Terminal (or local project root):
```sh
node scripts/reset-server.js --rebuild --password 'YourNewPassword'
```
*(Omit `--rebuild` to refresh scenarios and update the password without wiping custom scenarios.)*

### Method C: Using Dockhand Terminal (`set-admin-password.js`)

1. Open **Dockhand** and navigate to **Containers**.
2. Select your running Crisis container (e.g. `crisis_app`).
3. Open the **Terminal** (Console / Exec) tab and connect with `/bin/sh`. You will land in `/usr/src/app` (if not, run `cd /usr/src/app`).
4. Run the password script directly (use single quotes if your password contains special characters):
   ```sh
   node scripts/set-admin-password.js --password 'YourNewPassword'
   ```
   *Or run interactively:*
   ```sh
   npm run set-admin
   ```
   Type your new password when prompted (`Enter new admin password:`) and press **Enter**.
5. Confirm you see:
   ```text
   ✅ Admin password updated successfully in SQLite database.
   ```
6. The new password takes effect **immediately** (no container restart required). Sign in at `http://<your_host>:3000/admin` with username `admin`.

#### Troubleshooting: `database disk image is malformed`

If setting the password fails with `database disk image is malformed`, the SQLite file or its WAL/SHM journal files on the mounted volume have fallen out of sync (often after an image update or unclean container stop). To recover cleanly:

1. From `/usr/src/app` in the Dockhand Terminal, remove the corrupted database and journal files:
   ```sh
   rm -f data/crisis.db data/crisis.db-wal data/crisis.db-shm
   ```
2. **Restart the container** in Dockhand. On startup, `server.js` automatically recreates a fresh `data/crisis.db` and re-seeds all built-in scenarios and guides.
3. Re-open the Dockhand Terminal (`/usr/src/app`) and re-run:
   ```sh
   node scripts/set-admin-password.js --password 'YourNewPassword'
   ```

### Using Docker CLI

```bash
docker exec -it crisis_app npm run set-admin
```

Or non-interactively:

```bash
docker exec crisis_app node scripts/set-admin-password.js --password "YourNewPassword"
```

### Local Development

From the project root:

```bash
npm run set-admin
```

