import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Locations, { Location } from "../filter-data/locations";
import Keywords from "../filter-data/keywords";
import { motion } from "framer-motion";
import { ReactComponent as ArrowSvg } from "../svg/arrow.svg";
import {
  DropdownContainer,
  StyledKeyword,
  StyledLocation,
  ExpandedSection,
  ArrowContainer,
  Arrow,
  NameContainer,
  Circle,
} from "./styles";

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

const Dropdown = (props: {
  dropdownVersion: string;
  setKeywordValue: React.Dispatch<React.SetStateAction<string[]>>;
  setLocationValue: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const { setKeywordValue, setLocationValue } = props;
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
      let arr: Keyword[] = [...keywords];
      arr[arr.findIndex((item) => item.label === keyword.label)].toggled =
        !keyword.toggled;
      setKeywords(arr);
    }
  };

  const expandLocation = (location: LocationBool, e: React.MouseEvent) => {
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

  const toggleLocation = (locationItem: ItemBool, e: React.MouseEvent) => {
    e.stopPropagation();
    const arr: LocationBool[] = [...locations];
    const expandedIndex = arr.findIndex((item) => item.expanded === true);
    arr[expandedIndex].items[
      arr[expandedIndex].items.findIndex(
        (item) => item.name === locationItem.name
      )
    ].toggled = !locationItem.toggled;
    setLocations(arr);
  };

  useEffect(() => {
    if (!locations) return;
    const arr: string[] = [];
    for (let i = 0; i < locations.length; i++) {
      for (let j = 0; j < locations[i].items.length; j++) {
        if (locations[i].items[j].toggled) {
          arr.push(locations[i].items[j].name);
        }
      }
    }
    setLocationValue(arr);
  }, [locations]);

  useEffect(() => {
    if (!keywords) return;
    const arr: string[] = [];
    for (let i = 0; i < keywords.length; i++) {
      if (keywords[i].toggled) {
        arr.push(keywords[i].label);
      }
    }
    setKeywordValue(arr);
  }, [keywords]);

  if (props.dropdownVersion === "Keywords") {
    return (
      <DropdownContainer>
        {keywords?.map((k, index) => (
          <StyledKeyword
            key={index}
            toggled={k.toggled}
            onClick={(e) => toggleKeyword(k, e)}
          >
            {k.toggled && <Circle />}
            {k.label}
          </StyledKeyword>
        ))}
      </DropdownContainer>
    );
  }

  return (
    <DropdownContainer>
      {locations?.map((l, index) => (
        <div key={index}>
          <StyledLocation
            expanded={l.expanded}
            onClick={(e) => expandLocation(l, e)}
          >
            {l.items.find((i) => i.toggled) && <Circle />}
            <NameContainer>{l.name}</NameContainer>
            <ArrowContainer>
              <Arrow
                expanded={l.expanded}
                animate={{ rotate: l.expanded ? 90 : 0 }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  duration: 0.2,
                  damping: 12,
                }}
                initial={false}
              >
                <ArrowSvg />
              </Arrow>
            </ArrowContainer>
          </StyledLocation>
          {l.expanded &&
            l.items.map((i, lindex) => (
              <ExpandedSection
                key={lindex}
                toggledLocation={i.toggled}
                onClick={(e) => toggleLocation(i, e)}
              >
                {i.name}
              </ExpandedSection>
            ))}
        </div>
      ))}
    </DropdownContainer>
  );
};

export default Dropdown;
