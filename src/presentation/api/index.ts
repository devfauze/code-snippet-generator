import AppDataSource from "@database/ormconfig";
import {SnippetController} from "@controllers/SnippetController";
import express, { Request, Response } from 'express';
import {SnippetRepositoryImpl} from "@infrastructure/repositories/SnippetRepositoryImpl";
import {SnippetService} from "@services/SnippetService";

const app = express();
const port = 3000;

const snippetRepository = new SnippetRepositoryImpl();
const snippetService = new SnippetService(snippetRepository);
const snippetController = new SnippetController(snippetService);

app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log('Connected to database!');
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('Database connection failed:', error);
    });

app.get('/snippets', (req: Request, res: Response) => snippetController.getAllSnippets(req, res));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});