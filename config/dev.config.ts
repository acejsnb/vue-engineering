export default (env) =>  {
    return {
        server : {
            host: '0.0.0.0',
            port: Number(env.MWT_PORT || 8000),
            proxy: {
                [env.MWT_BASE_API]: {
                    target: env.MWT_API_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(new RegExp(`^${env.MWT_BASE_API}`), ''),
                },
                '/socket.io': {
                    target: env.MWT_SOCKET_URL,
                    ws: true,
                },
            }
        }
    }
}