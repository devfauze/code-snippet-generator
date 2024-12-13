import express, { Request, Response } from 'express';
import { SnippetController } from '@services/SnippetController';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/snippets', async (req: Request, res: Response) => {
    const snippets = await SnippetController.getSnippets();
    res.json(snippets);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
