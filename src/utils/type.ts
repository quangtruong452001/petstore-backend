export type productQuery = {
  name?: any;
  categories?: any;
};

export type productSort = {
  price?: any;
  createdAt?: any;

  orderBy?: any;
};

export type category = {
  _id: string;
  category_name: string;
  totalProducts?: number;
};
