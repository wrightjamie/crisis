const GameEngine = require('./engine');

class GameManager {
    constructor() {
        this.games = new Map(); // gameId -> GameEngine
    }

    createGame(gameId, name) {
        if (this.games.has(gameId)) {
            return false;
        }
        const engine = new GameEngine(gameId, name);
        this.games.set(gameId, engine);
        return engine;
    }

    getGame(gameId) {
        return this.games.get(gameId);
    }

    getAllGamesInfo() {
        const info = [];
        for (const [gameId, engine] of this.games.entries()) {
            info.push({
                id: gameId,
                name: engine.name,
                status: engine.gameState.status,
                scenarioId: engine.gameState.scenarioId,
                lastActivity: engine.lastActivityTimestamp,
                hasFacilitator: engine.hasFacilitator()
            });
        }
        return info;
    }

    deleteGame(gameId) {
        const game = this.games.get(gameId);
        if (game) {
            game.stopSchedulerLoop();
            this.games.delete(gameId);
            return true;
        }
        return false;
    }
}

module.exports = new GameManager(); // Export a singleton
