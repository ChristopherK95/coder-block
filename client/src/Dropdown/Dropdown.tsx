import { useEffect, useState } from 'react';
import Locations from '../filter-data/locations';
import Keywords from '../filter-data/keywords';
import { ReactComponent as ArrowSvg } from '../svg/arrow.svg';
import {
  DropdownContainer,
  StyledKeyword,
  StyledLocation,
  ExpandedSection,
  ArrowContainer,
  Arrow,
  NameContainer,
  Circle,
  ItemContainer,
} from './styles';
import React from 'react';

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
  visible: boolean;
  dropdownVersion: string;
  keywordValue: string[];
  setKeywordValue: (keyword: string, e: React.MouseEvent) => void;
  locationValue: string[];
  setLocationValue: (location: string, e: React.MouseEvent) => void;
}) => {
  const { keywordValue, setKeywordValue, locationValue, setLocationValue } =
    props;
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [locations, setLocations] = useState<LocationBool[]>([]);

  // const expandLocation = (location: LocationBool, e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   if (locations) {
  //     let arr: LocationBool[] = [...locations];
  //     arr = locations.map((l) =>
  //       l.name === location.name
  //         ? { ...l, expanded: !location.expanded }
  //         : { ...l, expanded: false }
  //     );
  //     setLocations(arr);
  //   }
  // };

  useEffect(() => {
    setKeywords(
      Keywords().map((k) => ({
        label: k,
        toggled: keywordValue.includes(k) ? true : false,
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
          toggled: locationValue.includes(i.name) ? true : false,
        })),
      }))
    );
  }, []);

  useEffect(() => {
    if (keywords.length === 0) return;

    setKeywords(
      keywords.map((k) => ({
        label: k.label,
        toggled: keywordValue.includes(k.label) ? true : false,
      }))
    );
  }, [keywordValue]);

  useEffect(() => {
    if (locations.length === 0) return;

    setLocations(
      locations.map((l) => ({
        name: l.name,
        expanded: l.expanded,
        items: l.items.map((i) => ({
          name: i.name,
          toggled: locationValue.includes(i.name) ? true : false,
        })),
      }))
    );
  }, [locationValue]);

  if (!props.visible) {
    return <></>;
  }

  if (props.dropdownVersion === 'Keywords') {
    return (
      <MemoizedKeywords
        dropdownVersion={props.dropdownVersion}
        keywords={keywords}
        setKeywordValue={setKeywordValue}
      />
      // <DropdownContainer
      //   toggled={props.dropdownVersion}
      //   initial={{ height: 0 }}
      //   animate={{ height: '500px' }}
      //   transition={{
      //     type: 'spring',
      //     stiffness: 200,
      //     damping: 18,
      //   }}
      // >
      //   {keywords?.map((k, index) => (
      //     <StyledKeyword
      //       key={index}
      //       toggled={k.toggled}
      //       onClick={(e) => setKeywordValue(k.label, e)}
      //     >
      //       {k.toggled && <Circle />}
      //       {k.label}
      //     </StyledKeyword>
      //   ))}
      // </DropdownContainer>
    );
  }

  return (
    <MemoizedLocations
      dropdownVersion={props.dropdownVersion}
      locations={locations}
      setLocationValue={setLocationValue}
      setLocations={setLocations}
    />
    // <DropdownContainer
    //   toggled={props.dropdownVersion}
    //   initial={{ height: 0 }}
    //   animate={{ height: '500px' }}
    //   transition={{
    //     type: 'spring',
    //     stiffness: 200,
    //     damping: 18,
    //   }}
    // >
    //   {locations?.map((l, index) => (
    //     <div key={index}>
    //       <StyledLocation
    //         expanded={l.expanded}
    //         onClick={(e) => expandLocation(l, e)}
    //       >
    //         {l.items.find((i) => i.toggled) && <Circle />}
    //         <NameContainer>{l.name}</NameContainer>
    //         <ArrowContainer>
    //           <Arrow
    //             expanded={l.expanded}
    //             animate={{ rotate: l.expanded ? 270 : 90 }}
    //             transition={{
    //               type: 'spring',
    //               stiffness: 200,
    //               duration: 0.2,
    //               damping: 16,
    //             }}
    //             initial={false}
    //           >
    //             <ArrowSvg />
    //           </Arrow>
    //         </ArrowContainer>
    //       </StyledLocation>
    //       <ExpandedSection
    //         toggledLocation={l.expanded}
    //         initial={{ height: 0 }}
    //         animate={{ height: l.expanded ? 'auto' : 0 }}
    //         transition={{
    //           type: l.expanded ? 'spring' : '',
    //           stiffness: 400,
    //           damping: 24,
    //         }}
    //       >
    //         <div style={{ position: 'relative' }}>
    //           {l.items.map((i, lindex) => (
    //             <ItemContainer
    //               key={lindex}
    //               toggledLocation={i.toggled}
    //               onClick={(e) => setLocationValue(i.name, e)}
    //               animate={{
    //                 opacity: l.expanded ? 1 : 0,
    //               }}
    //             >
    //               <ExpandedItem>{i.name}</ExpandedItem>
    //             </ItemContainer>
    //           ))}
    //         </div>
    //       </ExpandedSection>
    //     </div>
    //   ))}
    // </DropdownContainer>
  );
};

const KeywordsDropdown = (props: {
  dropdownVersion: string;
  keywords: Keyword[];
  setKeywordValue: (keyword: string, e: React.MouseEvent) => void;
}) => {
  return (
    <DropdownContainer
      toggled={props.dropdownVersion}
      initial={{ height: 0 }}
      animate={{ height: '500px' }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 18,
      }}
    >
      {props.keywords?.map((k, index) => (
        <StyledKeyword
          key={index}
          toggled={k.toggled}
          onClick={(e) => props.setKeywordValue(k.label, e)}
        >
          {k.toggled && <Circle />}
          {k.label}
        </StyledKeyword>
      ))}
    </DropdownContainer>
  );
};

const Section = (props: {
  l: LocationBool;
  setLocationValue: (location: string, e: React.MouseEvent) => void;
}) => {
  const { l, setLocationValue } = props;

  return (
    <ExpandedSection
      toggledLocation={l.expanded}
      initial={{ height: 0 }}
      animate={{ height: l.expanded ? 'auto' : 0 }}
      transition={{
        type: l.expanded ? 'spring' : '',
        stiffness: 400,
        damping: 24,
      }}
    >
      {l.expanded && (
        <div style={{ position: 'relative' }}>
          {l.items.map((i, lindex) => (
            <ItemContainer
              key={lindex}
              toggledLocation={i.toggled}
              onClick={(e) => setLocationValue(i.name, e)}
              animate={{
                opacity: l.expanded ? 1 : 0,
              }}
            >
              <div style={{ padding: '5px 0px' }}>{i.name}</div>
            </ItemContainer>
          ))}
        </div>
      )}
    </ExpandedSection>
  );
};

const LocationsDropdown = (props: {
  dropdownVersion: string;
  locations: LocationBool[];
  setLocations: React.Dispatch<React.SetStateAction<LocationBool[]>>;
  setLocationValue: (location: string, e: React.MouseEvent) => void;
}) => {
  const setLocationValue = props.setLocationValue;

  const expandLocation = (location: LocationBool, e: React.MouseEvent) => {
    e.stopPropagation();
    if (props.locations) {
      let arr: LocationBool[] = [...props.locations];
      arr = props.locations.map((l) =>
        l.name === location.name
          ? { ...l, expanded: !location.expanded }
          : { ...l, expanded: false }
      );
      props.setLocations(arr);
    }
  };

  return (
    <DropdownContainer
      toggled={props.dropdownVersion}
      initial={{ height: 0 }}
      animate={{ height: '500px' }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 18,
      }}
    >
      {props.locations?.map((l, index) => (
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
                animate={{ rotate: l.expanded ? 270 : 90 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  duration: 0.2,
                  damping: 16,
                }}
                initial={{ rotate: 90 }}
              >
                <ArrowSvg />
              </Arrow>
            </ArrowContainer>
          </StyledLocation>
          <Section l={l} setLocationValue={setLocationValue} />
          {/* <ExpandedSection
            toggledLocation={l.expanded}
            initial={{ height: 0 }}
            animate={{ height: l.expanded ? 'auto' : 0 }}
            transition={{
              type: l.expanded ? 'spring' : '',
              stiffness: 400,
              damping: 24,
            }}
          >
            <div style={{ position: 'relative' }}>
              {l.items.map((i, lindex) => (
                <ItemContainer
                  key={lindex}
                  toggledLocation={i.toggled}
                  onClick={(e) => props.setLocationValue(i.name, e)}
                  animate={{
                    opacity: l.expanded ? 1 : 0,
                  }}
                >
                  <div style={{ padding: '5px 0px' }}>{i.name}</div>
                </ItemContainer>
              ))}
            </div>
          </ExpandedSection> */}
        </div>
      ))}
    </DropdownContainer>
  );
};

const MemoizedKeywords = React.memo(KeywordsDropdown);
const MemoizedLocations = React.memo(LocationsDropdown);

export default Dropdown;
