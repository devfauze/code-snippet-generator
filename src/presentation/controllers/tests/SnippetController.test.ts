import { SnippetController } from "@controllers/SnippetController";
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

        mockRequest = { body: {}, params: {} };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
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

    it("deve retornar erro 500 ao criar snippet se o serviço falhar", async () => {
        mockRequest.body = { title: "Teste", content: "Conteúdo do snippet" };

        snippetService.createSnippet.mockRejectedValue(new Error("Erro interno"));

        await snippetController.createSnippet(
            mockRequest as Request,
            mockResponse as Response
        );

        expect(snippetService.createSnippet).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: "Erro interno",
        });
    });

    it("deve retornar snippet pelo ID com sucesso", async () => {
        const mockSnippet = {
            id: "123",
            title: "Teste",
            content: "Conteúdo do snippet",
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        mockRequest.params = { id: "123" };
        snippetService.getSnippetById.mockResolvedValue(mockSnippet);

        await snippetController.getSnippetById(
            mockRequest as Request,
            mockResponse as Response
        );

        expect(snippetService.getSnippetById).toHaveBeenCalledWith("123");
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockSnippet);
    });

    it("deve retornar erro 404 ao buscar snippet inexistente", async () => {
        mockRequest.params = { id: "123" };
        snippetService.getSnippetById.mockRejectedValue(new Error("Snippet not found"));

        await snippetController.getSnippetById(
            mockRequest as Request,
            mockResponse as Response
        );

        expect(snippetService.getSnippetById).toHaveBeenCalledWith("123");
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: "Snippet not found",
        });
    });

    it("deve retornar todos os snippets com sucesso", async () => {
        const snippets = [
            { id: "123", title: "Teste", content: "Conteúdo do snippet", createdAt: new Date() },
        ];
        snippetService.getAllSnippets.mockResolvedValue(snippets);

        await snippetController.getAllSnippets(
            mockRequest as Request,
            mockResponse as Response
        );

        expect(snippetService.getAllSnippets).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(snippets);
    });

    it("deve retornar erro 500 ao buscar todos os snippets se o serviço falhar", async () => {
        snippetService.getAllSnippets.mockRejectedValue(new Error("Erro ao buscar snippets"));

        await snippetController.getAllSnippets(
            mockRequest as Request,
            mockResponse as Response
        );

        expect(snippetService.getAllSnippets).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: "Erro ao buscar snippets",
        });
    });

    it("deve atualizar um snippet com sucesso", async () => {
        mockRequest.params = { id: "123" };
        mockRequest.body = { title: "Novo Título", content: "Novo conteúdo" };

        snippetService.updateSnippet.mockResolvedValue();

        await snippetController.updateSnippet(
            mockRequest as Request,
            mockResponse as Response
        );

        expect(snippetService.updateSnippet).toHaveBeenCalledWith("123", {
            title: "Novo Título",
            content: "Novo conteúdo",
        });
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "Snippet updated successfully",
        });
    });

    it("deve retornar erro 404 ao tentar atualizar snippet inexistente", async () => {
        mockRequest.params = { id: "123" };
        mockRequest.body = { title: "Novo Título", content: "Novo conteúdo" };

        snippetService.updateSnippet.mockRejectedValue(new Error("Snippet not found"));

        await snippetController.updateSnippet(
            mockRequest as Request,
            mockResponse as Response
        );

        expect(snippetService.updateSnippet).toHaveBeenCalledWith("123", {
            title: "Novo Título",
            content: "Novo conteúdo",
        });
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: "Snippet not found",
        });
    });

    it("deve deletar um snippet com sucesso", async () => {
        mockRequest.params = { id: "123" };

        snippetService.deleteSnippet.mockResolvedValue();

        await snippetController.deleteSnippet(
            mockRequest as Request,
            mockResponse as Response
        );

        expect(snippetService.deleteSnippet).toHaveBeenCalledWith("123");
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "Snippet deleted successfully",
        });
    });

    it("deve retornar erro 404 ao tentar deletar snippet inexistente", async () => {
        mockRequest.params = { id: "123" };

        snippetService.deleteSnippet.mockRejectedValue(new Error("Snippet not found"));

        await snippetController.deleteSnippet(
            mockRequest as Request,
            mockResponse as Response
        );

        expect(snippetService.deleteSnippet).toHaveBeenCalledWith("123");
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: "Snippet not found",
        });
    });
});
