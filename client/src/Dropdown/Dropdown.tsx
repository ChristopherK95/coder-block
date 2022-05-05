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
  ExpandedItem,
  ItemContainer,
  ScrollContainer,
  Unselect,
  BottomContainer,
  SelectAll,
  SelectAllContainer,
} from './styles';
import Search from './Search';

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
  keywordValue: string[];
  setKeywordValue: (keyword: string, e?: React.MouseEvent) => void;
  locationValue: string[];
  setLocationValue: (location: string | string[], e?: React.MouseEvent) => void;
  allSelected: string[];
  setAllSelected: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const {
    keywordValue,
    setKeywordValue,
    locationValue,
    setLocationValue,
    allSelected,
    setAllSelected,
  } = props;
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [locations, setLocations] = useState<LocationBool[]>([]);
  const [filteredKeywords, setFilteredKeywords] = useState<string>('');

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

  const handleFilter = (val: string) => {
    setFilteredKeywords(val);
  };

  const startsWith = (val: string, k: Keyword) => {
    return k.label.toLowerCase().startsWith(val);
  };

  const clearKeyword = () => {
    const arr = keywords.map((k) => ({
      label: k.label,
      toggled: false,
    }));
    setKeywordValue('');
    setKeywords(arr);
  };

  const clearLocation = () => {
    const arr = locations.map((l) => ({
      name: l.name,
      expanded: l.expanded,
      items: l.items.map((i) => ({
        name: i.name,
        toggled: false,
      })),
    }));
    setLocationValue('');
    setLocations(arr);
  };

  const selectAll = (name: string) => {
    if (allSelected.find((k) => k === name)) {
      setAllSelected(allSelected.filter((i) => i !== name));
      setLocations(
        locations.map((l) => ({
          name: l.name,
          expanded: l.expanded,
          items: l.items.map((i) => ({
            name: i.name,
            toggled: l.name === name ? false : i.toggled,
          })),
        }))
      );
      const arrVal: string[] = ['remove'];
      locations
        .find((l) => l.name === name)
        ?.items.forEach((i) => arrVal.push(i.name));
      setLocationValue(arrVal);
    } else {
      setAllSelected([...allSelected, name]);
      const arr = locations.map((l) => ({
        name: l.name,
        expanded: l.expanded,
        items: l.items.map((i) => ({
          name: i.name,
          toggled: l.name === name ? true : false,
        })),
      }));
      setLocations(arr);
      const arrVal: string[] = [];
      arr
        .find((i) => i.name === name)
        ?.items.forEach((element) => arrVal.push(element.name));
      setLocationValue(arrVal);
    }
  };

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

  if (props.dropdownVersion === 'Keywords') {
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
        <Search onChange={handleFilter} />
        <ScrollContainer>
          {keywords
            ?.filter((k) => startsWith(filteredKeywords, k))
            .map((fk, index) => (
              <StyledKeyword
                key={index}
                toggled={fk.toggled}
                onClick={(e) => setKeywordValue(fk.label, e)}
                id={index.toString()}
              >
                {fk.toggled && <Circle />}
                {fk.label}
              </StyledKeyword>
            ))}
        </ScrollContainer>
        <BottomContainer>
          <Unselect onClick={clearKeyword}>Clear</Unselect>
        </BottomContainer>
      </DropdownContainer>
    );
  }

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
      <ScrollContainer>
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
                  animate={{ rotate: l.expanded ? 270 : 90 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    duration: 0.2,
                    damping: 16,
                  }}
                  initial={false}
                >
                  <ArrowSvg />
                </Arrow>
              </ArrowContainer>
            </StyledLocation>
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
              <div style={{ position: 'relative' }}>
                <SelectAllContainer>
                  <SelectAll onClick={() => selectAll(l.name)}>
                    {allSelected.find((li) => li === l.name)
                      ? 'Unselect All'
                      : 'Select All'}
                  </SelectAll>
                </SelectAllContainer>
                {l.items.map((i, lindex) => (
                  <ItemContainer
                    key={lindex}
                    toggledLocation={i.toggled}
                    onClick={(e) => setLocationValue(i.name, e)}
                    animate={{
                      opacity: l.expanded ? 1 : 0,
                    }}
                  >
                    {i.toggled && <Circle />}
                    <ExpandedItem>{i.name}</ExpandedItem>
                  </ItemContainer>
                ))}
              </div>
            </ExpandedSection>
          </div>
        ))}
      </ScrollContainer>
      <BottomContainer>
        <Unselect onClick={clearLocation}>Clear</Unselect>
      </BottomContainer>
    </DropdownContainer>
  );
};

export default Dropdown;
