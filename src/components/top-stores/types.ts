export interface StoreProps {
  id: string;
  nome: string;
  profileImageUrl: string;
  bannerImageUrl: string;
  productsCount: number;
  descricao: string;
  _count: {
    followers: number;
    Produtos: number;
  };
}
