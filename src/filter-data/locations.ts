import locations from "./locations.json";

interface RootObject {
  locations: Location[];
}

interface Location {
  name: string;
  items: Item[];
}

interface Item {
  name: string;
}

const Locations = () => {
  const locationArr: RootObject = locations;

  locationArr.locations.map((l) => console.log(l));
};

export default Locations;
