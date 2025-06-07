export interface Book {
    id: string;
    title: string;
    price: number;
    coverFile?: File | null;
    pdfFile?: File | null;
    publisherId: string;
    categories: string[];
}

export interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
}