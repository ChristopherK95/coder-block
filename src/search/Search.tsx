import { useEffect, useRef, useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import { Button } from './Button';
import {
  SearchContainer,
  Filter,
  SearchBar,
  Container,
  Splitter,
} from './Styles';

const Search = (props: {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  search: (e: React.SyntheticEvent) => Promise<void>;
}) => {
  const { inputValue, setInputValue, search } = props;
  const [keywordsDropdown, setKeyWordsDropdown] = useState<boolean>(false);
  const [locationsDropdown, setLocationsDropdown] = useState<boolean>(false);
  const [dropdownToggle, setDropdownToggle] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
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

  useEffect(() => {
    if (locationsDropdown || keywordsDropdown) {
      setVisible(true);
    } else setVisible(false);
  }, [locationsDropdown, keywordsDropdown]);

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
      <Filter visible={visible}>
        <Button
          label={'Keywords'}
          onToggle={toggleDropdown}
          dropdownToggle={dropdownToggle}
        />
        <Splitter />
        <Button
          label={'Locations'}
          onToggle={toggleDropdown}
          dropdownToggle={dropdownToggle}
        />
        {dropdownToggle && <Dropdown dropdownVersion={dropdownVersion} />}
      </Filter>
    </Container>
  );
};

export default Search;
