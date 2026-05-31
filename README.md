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

This project includes a `Dockerfile` and `docker-compose.yml` optimized for easy deployment on a Synology NAS or any Docker-enabled environment.

### Prerequisites on Synology NAS
- Ensure **Container Manager** (DSM 7.2+) or **Docker** is installed via Package Center.
- Get the project files onto your NAS (e.g., clone the repo, or download the ZIP and extract it to a shared folder like `/volume1/docker/crisis`).

### Method 1: Container Manager GUI (Recommended for DSM 7.2+)

1. Open **Container Manager** on your Synology NAS.
2. Go to the **Project** tab and click **Create**.
3. **Project Name**: `crisis`
4. **Path**: Select the folder where you placed the project files (e.g., `/docker/crisis`).
5. **Source**: Choose `Use existing docker-compose.yml`.
6. Click **Next**, skip the web portal setup (unless you want to configure a reverse proxy), and click **Done**.
7. Container Manager will automatically build the image and start the container.

### Method 2: Command Line (SSH / Git)

If you prefer using the terminal or want to manage updates via Git directly on the NAS:

1. **SSH into your NAS:**
   ```bash
   ssh your_username@your_nas_ip
   ```

2. **Navigate to your Docker folder:**
   ```bash
   cd /volume1/docker
   ```

3. **Clone the repository:**
   ```bash
   git clone <your-git-repo-url> crisis
   cd crisis
   ```

4. **Build and start the container:**
   Note that on Synology, you usually need to use `sudo` for docker commands:
   ```bash
   sudo docker-compose up -d --build
   ```

### Updating the Application

If you used the **GUI Method**, simply overwrite the files in your NAS folder with the new versions, go to Container Manager > Projects, select the `crisis` project, and click **Action > Build**.

If you used the **Command Line Method**, run the following commands over SSH in your project directory:

```bash
git pull
sudo docker-compose up -d --build
```

### Accessing the App
Once deployed, the server will be available on your local network at:
`http://<your_nas_ip>:3000`

## Scripts

- `npm run test`: Runs the test suites (`engine-actions.test.js` and `validate-scenarios.test.js`).
- `npm run audit`: Runs the token audit script.
