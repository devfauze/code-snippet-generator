import {SnippetRepository} from "@domain/repositories/SnippetRepostitory";
import {Snippet} from "@domain/domain/Snippet";


export class SnippetRepositoryImpl implements SnippetRepository {
    private snippets: Snippet[] = [];

    async getAllSnippets(): Promise<Snippet[]> {
        return this.snippets;
    }

    async saveSnippet(snippet: Snippet): Promise<void> {
        this.snippets.push(snippet);
    }
}
