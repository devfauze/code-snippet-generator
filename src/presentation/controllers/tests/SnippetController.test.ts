import {SnippetController} from "@controllers/SnippetController";
import { SnippetService } from "@services/SnippetService";
import { Request, Response } from "express";

describe("SnippetController", () => {
    let snippetService: jest.Mocked<SnippetService>;
    let snippetController: SnippetController;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        snippetService = {
            createSnippet: jest.fn(),
            getSnippetById: jest.fn(),
            getAllSnippets: jest.fn(),
            updateSnippet: jest.fn(),
            deleteSnippet: jest.fn(),
        } as unknown as jest.Mocked<SnippetService>;

        snippetController = new SnippetController(snippetService);

        mockRequest = { body: {} };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
    });

    it("deve criar um snippet com sucesso", async () => {
        mockRequest.body = { title: "Teste", content: "Conteúdo do snippet" };

        const mockSnippet = {
            id: "123",
            title: "Teste",
            content: "Conteúdo do snippet",
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        snippetService.createSnippet.mockResolvedValue(mockSnippet);

        await snippetController.createSnippet(
            mockRequest as Request,
            mockResponse as Response
        );

        expect(snippetService.createSnippet).toHaveBeenCalledWith({
            title: "Teste",
            content: "Conteúdo do snippet",
        });

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "Snippet created successfully",
            snippet: mockSnippet,
        });
    });

    it("deve retornar erro 500 se o serviço lançar uma exceção", async () => {
        mockRequest.body = { title: "Teste", content: "Conteúdo do snippet" };

        snippetService.createSnippet.mockRejectedValue(new Error("Erro interno"));

        await snippetController.createSnippet(
            mockRequest as Request,
            mockResponse as Response
        );

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: "Erro interno",
        });
    });
});
