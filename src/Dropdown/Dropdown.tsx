import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Locations, { Location } from '../filter-data/locations';
import Keywords from '../filter-data/keywords';
import {
  DropdownContainer,
  StyledKeyword,
  StyledLocation,
  ExpandedSection,
} from './styles';

interface LocationBool {
  name: string;
  expanded: boolean;
  items: ItemBool[];
}

interface ItemBool {
  name: string;
  toggled: boolean;
}

interface Keyword {
  label: string;
  toggled: boolean;
}

const Dropdown = (props: { dropdownVersion: string }) => {
  const [keywords, setKeywords] = useState<Keyword[]>();
  const [locations, setLocations] = useState<LocationBool[]>([]);

  useEffect(() => {
    setKeywords(
      Keywords().map((k) => ({
        label: k,
        toggled: false,
      }))
    );
  }, []);

  useEffect(() => {
    setLocations(
      Locations().map((l) => ({
        name: l.name,
        expanded: false,
        items: l.items.map((i) => ({
          name: i.name,
          toggled: false,
        })),
      }))
    );
  }, []);

  const toggleKeyword = (keyword: Keyword, e: React.MouseEvent) => {
    e.stopPropagation();
    if (keywords) {
      const arr: Keyword[] = [...keywords];
      arr[arr.findIndex((item) => item.label === keyword.label)].toggled =
        !keyword.toggled;
      setKeywords(arr);
    }
  };

  const epxandLocation = (location: LocationBool, e: React.MouseEvent) => {
    e.stopPropagation();
    if (locations) {
      let arr: LocationBool[] = [...locations];
      arr = locations.map((l) =>
        l.name === location.name
          ? { ...l, expanded: !location.expanded }
          : { ...l, expanded: false }
      );

      setLocations(arr);
    }
  };

  if (props.dropdownVersion === 'Keywords') {
    return (
      <DropdownContainer>
        {keywords?.map((k, index) => (
          <StyledKeyword
            key={index}
            toggled={k.toggled}
            onClick={(e) => toggleKeyword(k, e)}
          >
            {k.label}
          </StyledKeyword>
        ))}
      </DropdownContainer>
    );
  }
  return (
    <DropdownContainer>
      {locations?.map((l, index) => (
        <>
          <StyledLocation
            key={index}
            expanded={l.expanded}
            onClick={(e) => epxandLocation(l, e)}
          >
            {l.name}
          </StyledLocation>
          {l.expanded &&
            l.items.map((i, lindex) => (
              <ExpandedSection key={lindex}>{i.name}</ExpandedSection>
            ))}
        </>
      ))}
    </DropdownContainer>
  );
};

export default Dropdown;
