export interface SearchResult {
  id: string;
  title: string;
  description: string;
  // Add other relevant fields based on the Comounikate API response
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
}

export interface ErrorResponse {
  error: string;
}

export interface Ad {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
} 