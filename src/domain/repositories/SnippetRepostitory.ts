import {Snippet} from "@domain/domain/Snippet";


export interface SnippetRepository {
    getAllSnippets(): Promise<Snippet[]>;
    saveSnippet(snippet: Snippet): Promise<void>;
    findById(id: string): Promise<Snippet | null>;
    delete(id: string): Promise<void>;
}
