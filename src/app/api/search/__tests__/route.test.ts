import { GET } from '../route';
import { db } from '@/lib/prisma';

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
    db: {
        $queryRawUnsafe: jest.fn(),
        $queryRaw: jest.fn(),
    },
}));

describe('/api/search', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Products Pagination', () => {
        it('should return paginated products with correct structure', async () => {
            const mockProducts = [
                { id: '1', nome: 'Produto 1', imagemUrl: '/1.jpg', preco: 100, porcentagemDesconto: 10, totalVendido: 5, categoriaNome: 'Cat1', lojaId: 's1', lojaNome: 'Store 1', lojaImagem: '/s1.jpg' },
                { id: '2', nome: 'Produto 2', imagemUrl: '/2.jpg', preco: 200, porcentagemDesconto: 0, totalVendido: 10, categoriaNome: 'Cat2', lojaId: 's2', lojaNome: 'Store 2', lojaImagem: null },
            ];

            const mockCount = [{ count: BigInt(50) }];

            (db.$queryRawUnsafe as jest.Mock).mockResolvedValueOnce(mockProducts);
            (db.$queryRaw as jest.Mock).mockResolvedValueOnce(mockCount);

            const request = new Request('http://localhost/api/search?q=tenis&type=products&page=1&pageSize=20');
            const response = await GET(request);
            const data = await response.json();

            expect(data).toEqual({
                stores: [],
                products: [
                    {
                        id: '1',
                        nome: 'Produto 1',
                        imagemUrl: '/1.jpg',
                        preco: 100,
                        porcentagemDesconto: 10,
                        totalVendido: 5,
                        categoria: { nome: 'Cat1' },
                        loja: { id: 's1', nome: 'Store 1', profileImageUrl: '/s1.jpg' },
                    },
                    {
                        id: '2',
                        nome: 'Produto 2',
                        imagemUrl: '/2.jpg',
                        preco: 200,
                        porcentagemDesconto: 0,
                        totalVendido: 10,
                        categoria: { nome: 'Cat2' },
                        loja: { id: 's2', nome: 'Store 2', profileImageUrl: null },
                    },
                ],
                categories: [],
                pagination: {
                    page: 1,
                    pageSize: 20,
                    total: 50,
                    hasMore: true,
                },
            });
        });

        it('should calculate hasMore correctly when on last page', async () => {
            const mockProducts = [
                { id: '1', nome: 'P1', imagemUrl: '/1.jpg', preco: 100, porcentagemDesconto: 0, categoriaNome: 'C1' },
            ];

            const mockCount = [{ count: BigInt(21) }]; // Total 21, page 2 with pageSize 20

            (db.$queryRawUnsafe as jest.Mock).mockResolvedValueOnce(mockProducts);
            (db.$queryRaw as jest.Mock).mockResolvedValueOnce(mockCount);

            const request = new Request('http://localhost/api/search?q=test&type=products&page=2&pageSize=20');
            const response = await GET(request);
            const data = await response.json();

            expect(data.pagination.hasMore).toBe(false);
            expect(data.pagination.total).toBe(21);
        });

        it('should use static ORDER BY (security check)', async () => {
            const mockProducts = [];
            const mockCount = [{ count: BigInt(0) }];

            (db.$queryRawUnsafe as jest.Mock).mockResolvedValueOnce(mockProducts);
            (db.$queryRaw as jest.Mock).mockResolvedValueOnce(mockCount);

            const request = new Request('http://localhost/api/search?q=test&type=products&page=1&pageSize=20');
            await GET(request);

            // Verify that the SQL query uses static ORDER BY
            const sqlQuery = (db.$queryRawUnsafe as jest.Mock).mock.calls[0][0];
            expect(sqlQuery).toContain('ORDER BY p.id DESC');
            expect(sqlQuery).not.toMatch(/ORDER BY.*\$/); // No dynamic ORDER BY
        });

        it('should handle LIMIT and OFFSET correctly', async () => {
            const mockProducts = [];
            const mockCount = [{ count: BigInt(0) }];

            (db.$queryRawUnsafe as jest.Mock).mockResolvedValueOnce(mockProducts);
            (db.$queryRaw as jest.Mock).mockResolvedValueOnce(mockCount);

            const request = new Request('http://localhost/api/search?q=test&type=products&page=3&pageSize=10');
            await GET(request);

            const callArgs = (db.$queryRawUnsafe as jest.Mock).mock.calls[0];
            expect(callArgs[2]).toBe(10); // pageSize (LIMIT)
            expect(callArgs[3]).toBe(20); // skip (OFFSET) = (page - 1) * pageSize = (3 - 1) * 10
        });
    });

    describe('Validation', () => {
        it('should return empty results for invalid query', async () => {
            const request = new Request('http://localhost/api/search?q=');
            const response = await GET(request);
            const data = await response.json();

            expect(data).toEqual({
                stores: [],
                products: [],
                categories: [],
                pagination: { page: 1, pageSize: 20, hasMore: false, total: 0 },
            });
        });

        it('should enforce maximum pageSize of 50', async () => {
            const mockProducts = [];
            const mockCount = [{ count: BigInt(0) }];

            (db.$queryRawUnsafe as jest.Mock).mockResolvedValueOnce(mockProducts);
            (db.$queryRaw as jest.Mock).mockResolvedValueOnce(mockCount);

            const request = new Request('http://localhost/api/search?q=test&type=products&page=1&pageSize=100');
            await GET(request);

            const callArgs = (db.$queryRawUnsafe as jest.Mock).mock.calls[0];
            expect(callArgs[2]).toBeLessThanOrEqual(50); // Should cap at 50
        });
    });

    describe('Stores and Categories', () => {
        it('should return paginated stores', async () => {
            const mockStores = [
                { id: '1', nome: 'Loja 1', profileImageUrl: '/1.jpg', slug: 'loja-1', followers: 100 },
            ];
            const mockCount = [{ count: BigInt(10) }];

            (db.$queryRaw as jest.Mock)
                .mockResolvedValueOnce(mockStores)
                .mockResolvedValueOnce(mockCount);

            const request = new Request('http://localhost/api/search?q=loja&type=stores&page=1&pageSize=20');
            const response = await GET(request);
            const data = await response.json();

            expect(data.stores).toHaveLength(1);
            expect(data.products).toHaveLength(0);
            expect(data.pagination.total).toBe(10);
        });

        it('should return paginated categories', async () => {
            const mockCategories = [
                { id: '1', nome: 'Categoria 1' },
            ];
            const mockCount = [{ count: BigInt(5) }];

            (db.$queryRaw as jest.Mock)
                .mockResolvedValueOnce(mockCategories)
                .mockResolvedValueOnce(mockCount);

            const request = new Request('http://localhost/api/search?q=cat&type=categories&page=1&pageSize=20');
            const response = await GET(request);
            const data = await response.json();

            expect(data.categories).toHaveLength(1);
            expect(data.pagination.total).toBe(5);
        });
    });

    describe('Error Handling', () => {
        it('should return 500 on database error', async () => {
            (db.$queryRawUnsafe as jest.Mock).mockRejectedValueOnce(new Error('DB Error'));

            const request = new Request('http://localhost/api/search?q=test&type=products&page=1&pageSize=20');
            const response = await GET(request);
            const data = await response.json();

            expect(response.status).toBe(500);
            expect(data.error).toBe('Internal Server Error');
        });
    });
});
