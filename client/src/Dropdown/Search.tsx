import { useState } from 'react';
import { SearchBar } from './styles';

const Search = (props: { onChange: (val: string) => void }) => {
  const [val, setVal] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
    props.onChange(e.target.value);
  };

  return <SearchBar id="keywordfilter" value={val} onChange={handleChange} />;
};

export default Search;
