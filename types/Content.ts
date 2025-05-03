export type Content = {
    id: string;
    title: string;
    type: string;
    body: string;
    authorName?: string;
    imageUrl: string // si decides resolverlo en el backend
  };
  