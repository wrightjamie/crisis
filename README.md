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

## Docker Deployment (Synology NAS via Git)

This project includes a `Dockerfile` and `docker-compose.yml` optimized for easy deployment on a Synology NAS or any Docker-enabled environment.

### Prerequisites on Synology NAS
- Ensure **Container Manager** (or Docker) is installed via Package Center.
- Ensure **Git** is installed via Package Center (if you plan to use Git over SSH directly).
- Ensure SSH service is enabled on your NAS (Control Panel > Terminal & SNMP).

### Deployment Steps

1. **SSH into your NAS:**
   Open a terminal on your computer and connect to your NAS:
   ```bash
   ssh your_username@your_nas_ip
   ```

2. **Navigate to your Docker folder:**
   Typically, this is located on `volume1`:
   ```bash
   cd /volume1/docker
   ```

3. **Clone the repository:**
   Replace `<your-git-repo-url>` with your actual Git repository URL.
   ```bash
   git clone <your-git-repo-url> crisis
   cd crisis
   ```

4. **Build and start the container:**
   Run Docker Compose to build the image and start the service in the background. Note that on Synology, you usually need to use `sudo` for docker commands:
   ```bash
   sudo docker-compose up -d --build
   ```

### Updating the Application

When you push new changes to your Git repository, you can update your NAS deployment by running the following commands over SSH in the `/volume1/docker/crisis` directory:

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
