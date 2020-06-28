export interface User {
  email: string;
  password: string;
}

export interface Message {
  message: string;
}

export interface Category {
  name: string;
  imageSrc?: string;
  user?: string;
  _id: string;
}

export interface Position {
  name: string;
  cost: number;
  user?: string;
  category: string;
  _id?: string;
  quantity?: number;
}

export interface Order {
  date?: Date;
  order?: Order;
  _id?: string;
  list: OrderPosition[];
}

export interface OrderPosition {
  _id?: string;
  name: string;
  cost: number;
  quantity: number;
}

export interface Filter {
  start?: Date;
  end?: Date;
  order?: number;
}

export interface OverviewPage {
  orders: OverviewPageItem;
  gain: OverviewPageItem;
}

export interface  OverviewPageItem {
  percent: number;
  compare: number;
  yessterday: number;
  isHigher: boolean;
}


