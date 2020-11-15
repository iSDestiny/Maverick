let io;

module.exports = {
    init: (httpServer) => {
        console.log('socket init ' + process.env.CLIENT_ORIGIN);
        io = require('socket.io')(httpServer, {
            cors: true,
            origins: [process.env.CLIENT_ORIGIN]
        });
        return io;
    },
    getIO: () => {
        if (!io) {
            throw new Error('Socket.io is not initialized!');
        }
        return io;
    }
};
