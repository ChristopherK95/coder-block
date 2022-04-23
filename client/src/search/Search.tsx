import { useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import { Button } from './Button';
import {
  SearchContainer,
  Filter,
  SearchBar,
  Container,
  Divider,
} from './Styles';

const Search = (props: {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  search: (e: React.SyntheticEvent) => Promise<void>;
  keywordValue: string[];
  setKeywordValue: (keyword: string, e: React.MouseEvent) => void;
  locationValue: string[];
  setLocationValue: (location: string, e: React.MouseEvent) => void;
}) => {
  const {
    inputValue,
    setInputValue,
    search,
    keywordValue,
    setKeywordValue,
    locationValue,
    setLocationValue,
  } = props;
  const [dropdownToggle, setDropdownToggle] = useState<boolean>(false);
  const [dropdownVersion, setDropdownVersion] = useState<
    'Keywords' | 'Locations' | ''
  >('');

  const toggleDropdown = (version: 'Keywords' | 'Locations') => {
    if (version === dropdownVersion) {
      setDropdownToggle(!dropdownToggle);
      setDropdownVersion('');
    } else {
      if (dropdownToggle) {
        setDropdownVersion(version);
      } else {
        setDropdownToggle(!dropdownToggle);
        setDropdownVersion(version);
      }
    }
  };

  return (
    <Container>
      <SearchContainer>
        <form onSubmit={search}>
          <SearchBar
            placeholder="Search for a keyword, frontend etc..."
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
        </form>
      </SearchContainer>
      <Filter visible={dropdownToggle}>
        <Button
          label={'Keywords'}
          onToggle={toggleDropdown}
          dropdownToggled={dropdownToggle}
          toggled={dropdownVersion === 'Keywords' ? true : false}
          dropdownVersion={dropdownVersion}
        />
        <Divider dropdownToggled={dropdownToggle} />
        <Button
          label={'Locations'}
          onToggle={toggleDropdown}
          dropdownToggled={dropdownToggle}
          toggled={dropdownVersion === 'Locations' ? true : false}
          dropdownVersion={dropdownVersion}
        />
        {dropdownToggle && (
          <Dropdown
            dropdownVersion={dropdownVersion}
            keywordValue={keywordValue}
            setKeywordValue={setKeywordValue}
            locationValue={locationValue}
            setLocationValue={setLocationValue}
          />
        )}
      </Filter>
    </Container>
  );
};

export default Search;
