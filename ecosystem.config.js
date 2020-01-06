module.exports = {
    apps : [{
      name: 'psp',
      script: 'src/server.js',
      instances: 'max',
      max_memory_restart: '256M',
      error_file: 'logs/err.log',
      out_file: 'logs/out.log',
      log_file: 'logs/combined.log',
      time: true,
      env: {
        PORT_PSP: 7000,
        SECRET:'P0@2g5%@2r4m7e3',
        NODE_ENV: 'development',
        DB_USER: 'postgres',
        DB_HOST: 'localhost',
        DB_NAME: 'pagarmepsp',
        DB_PASSWORD: 'apolo1',
        DB_PORTport: 5432
      },
      env_homolog: {
        PORT_PSP: 7000,
        SECRET:'P0@2g5%@2r4m7e3',
        NODE_ENV: 'production',
        DB_USER: 'postgres',
        DB_HOST: 'localhost',
        DB_NAME: 'pagarmepsp',
        DB_PASSWORD: 'apolo1',
        DB_PORTport: 5432
      },
      env_production: {
        PORT_PSP: 7000,
        SECRET:'P0@2g5%@2r4m7e3',
        NODE_ENV: 'production',
        DB_USER: 'pagarmepsp',
        DB_HOST: 'localhost',
        DB_NAME: 'postgres',
        DB_PASSWORD: 'apolo1',
        DB_PORTport: 5432
      }
    }]
  };