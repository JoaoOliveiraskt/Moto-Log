import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useInfiniteProducts } from '@/hooks/use-infinite-products';
import { ReactNode } from 'react';

// Mock fetch
global.fetch = jest.fn();

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    const Wrapper = ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
    Wrapper.displayName = 'QueryClientWrapper';
    return Wrapper;
};

describe('useInfiniteProducts', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch first page correctly', async () => {
        const mockResponse = {
            products: [
                { id: '1', nome: 'Produto 1', imagemUrl: '/img1.jpg', preco: 100, porcentagemDesconto: 10, totalVendido: 5, categoria: { nome: 'Cat1' }, loja: { id: 's1', nome: 'Store 1', profileImageUrl: null } },
                { id: '2', nome: 'Produto 2', imagemUrl: '/img2.jpg', preco: 200, porcentagemDesconto: 0, totalVendido: 10, categoria: { nome: 'Cat2' }, loja: { id: 's2', nome: 'Store 2', profileImageUrl: null } },
            ],
            pagination: {
                page: 1,
                pageSize: 20,
                total: 50,
                hasMore: true,
            },
        };

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const { result } = renderHook(() => useInfiniteProducts('tenis', 'relevance'), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(global.fetch).toHaveBeenCalledWith(
            '/api/search?q=tenis&type=products&page=1&pageSize=20'
        );
        expect(result.current.data?.pages[0].products).toHaveLength(2);
        expect(result.current.hasNextPage).toBe(true);
    });

    it('should concatenate multiple pages', async () => {
        const page1Response = {
            products: [{ id: '1', nome: 'P1', imagemUrl: '/1.jpg', preco: 100, porcentagemDesconto: 0, categoria: { nome: 'C1' } }],
            pagination: { page: 1, pageSize: 1, total: 3, hasMore: true },
        };

        const page2Response = {
            products: [{ id: '2', nome: 'P2', imagemUrl: '/2.jpg', preco: 200, porcentagemDesconto: 0, categoria: { nome: 'C2' } }],
            pagination: { page: 2, pageSize: 1, total: 3, hasMore: true },
        };

        (global.fetch as jest.Mock)
            .mockResolvedValueOnce({ ok: true, json: async () => page1Response })
            .mockResolvedValueOnce({ ok: true, json: async () => page2Response });

        const { result } = renderHook(() => useInfiniteProducts('test'), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        // Fetch next page
        result.current.fetchNextPage();

        await waitFor(() => expect(result.current.data?.pages).toHaveLength(2));

        expect(result.current.data?.pages[0].products[0].id).toBe('1');
        expect(result.current.data?.pages[1].products[0].id).toBe('2');
    });

    it('should set hasNextPage to false when hasMore is false', async () => {
        const mockResponse = {
            products: [{ id: '1', nome: 'P1', imagemUrl: '/1.jpg', preco: 100, porcentagemDesconto: 0, categoria: { nome: 'C1' } }],
            pagination: { page: 1, pageSize: 20, total: 1, hasMore: false },
        };

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const { result } = renderHook(() => useInfiniteProducts('test'), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.hasNextPage).toBe(false);
    });

    it('should not fetch if query is empty', () => {
        const { result } = renderHook(() => useInfiniteProducts(''), {
            wrapper: createWrapper(),
        });

        expect(result.current.isFetching).toBe(false);
        expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should handle API errors', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 500,
        });

        const { result } = renderHook(() => useInfiniteProducts('test'), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isError).toBe(true));
    });

    it('should reset pagination when query changes', async () => {
        const mockResponse1 = {
            products: [{ id: '1', nome: 'P1', imagemUrl: '/1.jpg', preco: 100, porcentagemDesconto: 0, categoria: { nome: 'C1' } }],
            pagination: { page: 1, pageSize: 20, total: 1, hasMore: false },
        };

        const mockResponse2 = {
            products: [{ id: '2', nome: 'P2', imagemUrl: '/2.jpg', preco: 200, porcentagemDesconto: 0, categoria: { nome: 'C2' } }],
            pagination: { page: 1, pageSize: 20, total: 1, hasMore: false },
        };

        (global.fetch as jest.Mock)
            .mockResolvedValueOnce({ ok: true, json: async () => mockResponse1 })
            .mockResolvedValueOnce({ ok: true, json: async () => mockResponse2 });

        const { result, rerender } = renderHook(
            ({ query }) => useInfiniteProducts(query),
            {
                wrapper: createWrapper(),
                initialProps: { query: 'tenis' },
            }
        );

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data?.pages[0].products[0].id).toBe('1');

        // Change query
        rerender({ query: 'camisa' });

        await waitFor(() => expect(result.current.data?.pages[0].products[0].id).toBe('2'));
        expect(result.current.data?.pages).toHaveLength(1); // Reset to 1 page
    });
});
