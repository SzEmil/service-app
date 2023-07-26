export type dishType = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  price: number;
  kcal: number;
  owner: string;
  restaurant: string;
};

export type orderType = {
  __v?: number;
  _id?: string;
  dishes: dishType[];
  fullKcal?: number;
  fullPrice?: number;
  name: string;
  owner?: string;
  restaurant?: string;
  table?: string;
};

export type tableType = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  icon: string;
  owner: string;
  restaurant: string;
  orders: orderType[];
};

export type restaurantType = {
  _id: string | undefined;
  createdAt: string | null | undefined;
  updatedAt: string | null | undefined;
  icon: string | undefined;
  menu: dishType[] | null | undefined | [];
  name: string  | undefined;
  owner: string | null | undefined;
  tables: tableType[] | null | undefined | [];
};
