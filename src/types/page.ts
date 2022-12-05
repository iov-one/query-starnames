export interface Page {
  next_key: string;
  total: string;
}

export type PaginationPage = Page | null;
