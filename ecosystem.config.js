module.exports = {
  apps: [
    {
      name: 'kado',
      script: 'server.js',
      cwd: '/var/www/kado/current/server',
      instances: 'max',
      watch: true,
      watch_delay: 1000,
      ignore_watch: ['node_modules'],
      env: {
        NODE_ENV: 'production',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'kado-worker',
      cwd: '/var/www/kado/current/server',
      script: 'queue.js',
      env: {
        NODE_ENV: 'production',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
