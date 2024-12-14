import { Repository } from 'typeorm';
import { Snippet } from '@domain/domain/Snippet';
import AppDataSource from '@infrastructure/database/ormconfig';
import { SnippetRepository } from '@domain/repositories/SnippetRepostitory';

export class SnippetRepositoryImpl implements SnippetRepository {
    private repository: Repository<Snippet>;

    constructor() {
        this.repository = AppDataSource.getRepository(Snippet);
    }

    async getAllSnippets(): Promise<Snippet[]> {
        return this.repository.find();
    }

    async saveSnippet(snippet: Snippet): Promise<void> {
        await this.repository.save(snippet);
    }

    async findById(id: string): Promise<Snippet | null> {
        return this.repository.findOneBy({ id });
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
