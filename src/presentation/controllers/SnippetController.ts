import { Request, Response } from "express";
import { SnippetService } from "@services/SnippetService";

export class SnippetController {
    constructor(private readonly snippetService: SnippetService) {}

    async createSnippet(req: Request, res: Response): Promise<void> {
        try {
            const { title, content } = req.body;
            const snippet = await this.snippetService.createSnippet({ title, content });
            res.status(201).json({ message: "Snippet created successfully", snippet });
        } catch (error) {
            res.status(500).json({ error: (error instanceof Error ? error.message : "An error occurred") });
        }
    }

    async getSnippetById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const snippet = await this.snippetService.getSnippetById(id);
            res.status(200).json(snippet);
        } catch (error) {
            res.status(404).json({ error: (error instanceof Error ? error.message : "Snippet not found") });
        }
    }

    async getAllSnippets(req: Request, res: Response): Promise<void> {
        try {
            const snippets = await this.snippetService.getAllSnippets();
            res.status(200).json(snippets);
        } catch (error) {
            res.status(500).json({ error: (error instanceof Error ? error.message : "An error occurred") });
        }
    }

    async updateSnippet(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { title, content } = req.body;
            await this.snippetService.updateSnippet(id, { title, content });
            res.status(200).json({ message: "Snippet updated successfully" });
        } catch (error) {
            res.status(404).json({ error: (error instanceof Error ? error.message : "Snippet not found") });
        }
    }

    async deleteSnippet(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.snippetService.deleteSnippet(id);
            res.status(200).json({ message: "Snippet deleted successfully" });
        } catch (error) {
            res.status(404).json({ error: (error instanceof Error ? error.message : "Snippet not found") });
        }
    }
}
