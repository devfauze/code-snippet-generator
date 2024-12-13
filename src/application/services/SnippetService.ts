import { v4 as uuidv4 } from 'uuid';
import {SnippetRepository} from "@domain/repositories/SnippetRepostitory";
import {Snippet} from "@domain/domain/Snippet";

export class SnippetService {
    constructor(private readonly snippetRepository: SnippetRepository) {}

    async createSnippet(data: { title: string; content: string }): Promise<Snippet> {
        if (!data.title || !data.content) {
            throw new Error('Title and content are required.');
        }
        const snippet = new Snippet(uuidv4(), data.title, data.content, new Date());
        await this.snippetRepository.saveSnippet(snippet);
        return snippet;
    }

    async getSnippetById(id: string): Promise<Snippet | null> {
        if (!id) {
            throw new Error('ID is required.');
        }
        const snippet = await this.snippetRepository.findById(id);
        if (!snippet) {
            throw new Error('Snippet not found.');
        }
        return snippet;
    }

    async getAllSnippets(): Promise<Snippet[]> {
        return await this.snippetRepository.getAllSnippets();
    }

    async updateSnippet(id: string, data: { title?: string; content?: string }): Promise<void> {
        const snippet = (await this.getSnippetById(id))!;

        if (data.title) snippet.title = data.title;
        if (data.content) snippet.content = data.content;

        await this.snippetRepository.saveSnippet(snippet);
    }

    async deleteSnippet(id: string): Promise<void> {
        const snippet = await this.getSnippetById(id);

        if (!snippet) {
            throw new Error('Snippet not found.');
        }

        await this.snippetRepository.delete(id);
    }
}
