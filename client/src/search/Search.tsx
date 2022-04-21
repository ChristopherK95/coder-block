import { useEffect, useRef, useState } from 'react';
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
  setKeywordValue: React.Dispatch<React.SetStateAction<string[]>>;
  setLocationValue: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const {
    inputValue,
    setInputValue,
    search,
    setKeywordValue,
    setLocationValue,
  } = props;
  const [dropdownToggle, setDropdownToggle] = useState<boolean>(false);
  const [dropdownVersion, setDropdownVersion] = useState<string>('');

  const toggleDropdown = (version: 'Keywords' | 'Locations') => {
    if (version === dropdownVersion) {
      setDropdownToggle(!dropdownToggle);
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
          dropdownToggle={dropdownToggle}
        />
        <Divider />
        <Button
          label={'Locations'}
          onToggle={toggleDropdown}
          dropdownToggle={dropdownToggle}
        />
        {dropdownToggle && (
          <Dropdown
            dropdownVersion={dropdownVersion}
            setKeywordValue={setKeywordValue}
            setLocationValue={setLocationValue}
          />
        )}
      </Filter>
    </Container>
  );
};

export default Search;
