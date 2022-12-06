export interface ISSResponse {
  message: string;
  timestamp: string;
  iss_position: {
    latitude: number;
    longitude: number;
  };
}

export interface Person {
  name: string;
  craft: string;
}

export interface PeopleResponse {
  message: string;
  number: number;
  people: Person[];
}
