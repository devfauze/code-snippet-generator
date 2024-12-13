import {SnippetRepository} from "@domain/repositories/SnippetRepostitory";
import {Snippet} from "@domain/domain/Snippet";


export class SnippetRepositoryImpl implements SnippetRepository {
    private snippets: Snippet[] = [];

    async getAllSnippets(): Promise<Snippet[]> {
        return this.snippets;
    }

    async saveSnippet(snippet: Snippet): Promise<void> {
        const index = this.snippets.findIndex((s) => s.id === snippet.id);
        if (index > -1) {
            this.snippets[index] = snippet;
        } else {
            this.snippets.push(snippet);
        }
    }

    async findById(id: string): Promise<Snippet | null> {
        const snippet = this.snippets.find((s) => s.id === id);
        return snippet || null;
    }

    async delete(id: string): Promise<void> {
        this.snippets = this.snippets.filter((s) => s.id !== id);
    }
}
