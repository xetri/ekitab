export interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
    price: number;
    sellerId: string;
    sellerName: string;
    categories: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Review {
  id: string;
  user: string;
  name: string;
  rating: number;
  comment: string;
  bookId: string;
  createdAt: Date;
  updatedAt: Date;
}