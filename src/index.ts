import AppDataSource from '@infrastructure/database/ormconfig';
import './presentation/api/index';

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected successfully!');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });
