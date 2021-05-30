import { CurrencySeparator } from './Currencies';
export type API_OutboundDate = {
  PartialDate: string;
  Price: number;
  QuoteIds: [];
  QuoteDateTime: Date;
};

export type API_InboundDates = API_OutboundDate;
export type API_Date = {
  OutboundDates: API_OutboundDate[];
  InboundDates: API_InboundDates[];
};

export type API_OutboundLeg = {
  OriginId: number;
  CarrierIds: number[];
  DestinationId: number;
  DepartureDate: Date;
};

export type API_InboundLeg = API_OutboundLeg;

export type API_Quote = {
  QuoteId: number;
  MinPrice: number;
  Direct: boolean;
  OutboundLeg: API_OutboundLeg;
  InboundLeg: API_InboundLeg;
  QuoteDateTime: Date;
};

export type API_Place = {
  PlaceId: number;
  IataCode: string;
  Name: string;
  Type: string;
  SkyscannerCode: string;
  CityName: string;
  CityId: string;
  CountryName: string;
};

export type API_Carrier = {
  CarrierId: number;
  Name: string;
};

export type API_Currency = {
  Code: string;
  Symbol: string;
  ThousandsSeparator: CurrencySeparator;
  DecimalSeparator: CurrencySeparator;
  SymbolOnLeft: boolean;
  SpaceBetweenAmountAndSymbol: boolean;
  RoundingCoefficient: number;
  DecimalDigits: number;
};

export type API_BrowseDates = {
  Dates: API_Date;
  Quotes: API_Quote[];
  Places: API_Place[];
  Carriers: API_Carrier[];
  Currencies: API_Currency[];
};

export type BrowseDateRequestObject = {
  locale: string;
  country: string;
  currency: string;
  originplace: string;
  outboundpartialdate: string;
  destinationplace: string;
  inboundpartialdate?: string;
};
