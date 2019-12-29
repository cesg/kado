module.exports = shipit => {
  require('shipit-deploy')(shipit);
  require('shipit-npm')(shipit);

  shipit.initConfig({
    default: {
      branch: 'master',
      ignores: ['.git', 'node_modules'],
      keepReleases: 2,
      deployTo: '/var/www/kado',
      repositoryUrl: 'git@github.com:cesg/kado.git',
      npm: {
        remote: true,
        installFlags: ['--only=production'],
      },
    },
    production: {
      servers: [],
    },
  });

  shipit.task('reload', async () => {
    await shipit.remote(`cd ${shipit.currentPath} && pm2 reload ecosystem.config.js --env production --update-env`);
  });

  shipit.blTask('build', async () => {
    await shipit.local(`npm run prod`);
  });

  shipit.blTask('migrate', async () => {
    await shipit.remote(`cd ${shipit.currentPath} && npx knex migrate:latest --knexfile server/knexfile.js --env production`);
  });

  shipit.blTask('dotenv', async () => {
    const stage = shipit.environment;
    await shipit.copyToRemote(`./server/.env.${stage}`, `${shipit.currentPath}/server/.env`);
  });

  shipit.blTask('dist', async () => {
    await shipit.copyToRemote('dist', shipit.currentPath);
  });

  shipit.on('deployed', async () => {
    await shipit.start(['build', 'dotenv', 'dist', 'migrate', 'reload']);
    await shipit.remote(`chmod -R 755 ${shipit.releasePath}`);
  });
};
