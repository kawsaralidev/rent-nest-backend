export type TCreateProperty = {
  title: string;
  description: string;
  location: string;
  price: number;
  categoryId: string;
  amenities: string[];
};

export type TUpdateProperty = {
  title?: string;
  description?: string;
  location?: string;
  price?: number;
  amenities?: string[];
};
