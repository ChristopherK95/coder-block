import locations from './locations.json';

export interface Location {
  name: string;
  items: Item[];
}

export interface Item {
  name: string;
}

const Locations = (): Location[] => {
  const locationArr: Location[] = locations.locations;

  return locationArr;
};

export default Locations;
