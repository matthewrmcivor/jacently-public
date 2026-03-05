// Types for open data sources

export interface FarmersMarketData {
  MarketName: string;
  Website?: string;
  Facebook?: string;
  Twitter?: string;
  Youtube?: string;
  OtherMedia?: string;
  street?: string;
  city?: string;
  County?: string;
  State?: string;
  zip?: string;
  x?: number; // longitude
  y?: number; // latitude
  Location?: string;
  Schedule?: string;
  Products?: string;
  Credit?: string;
  WIC?: string;
  WICcash?: string;
  SFMNP?: string;
  SNAP?: string;
  Organic?: string;
  Bakedgoods?: string;
  Cheese?: string;
  Crafts?: string;
  Flowers?: string;
  Eggs?: string;
  Seafood?: string;
  Herbs?: string;
  Vegetables?: string;
  Honey?: string;
  Jams?: string;
  Maple?: string;
  Meat?: string;
  Nursery?: string;
  Nuts?: string;
  Plants?: string;
  Poultry?: string;
  Prepared?: string;
  Soap?: string;
  Trees?: string;
  Wine?: string;
  Coffee?: string;
  Beans?: string;
  Fruits?: string;
  Grains?: string;
  Juices?: string;
  Mushrooms?: string;
  PetFood?: string;
  Tofu?: string;
  WildHarvested?: string;
  updateTime?: string;
}

export interface CityEventData {
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  category?: string;
  isFree?: boolean;
  contact?: {
    name?: string;
    email?: string;
    phone?: string;
    website?: string;
  };
  [key: string]: any; // Allow for flexible city-specific fields
}

export interface OpenDataConfig {
  city?: string;
  state?: string;
  apiKey?: string;
  endpoint?: string;
}


