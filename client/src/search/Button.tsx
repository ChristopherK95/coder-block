import { FilterButton } from './Styles';

export const Button = (props: {
  label: 'Keywords' | 'Locations';
  onToggle: (ver: 'Keywords' | 'Locations') => void;
  dropdownToggled: boolean;
  toggled: boolean;
  dropdownVersion: 'Keywords' | 'Locations' | '';
}) => {
  const handleClick = () => {
    props.onToggle(props.label);
  };

  return (
    <FilterButton
      toggled={props.toggled}
      dropdownToggled={props.dropdownToggled}
      onClick={handleClick}
      version={props.dropdownVersion}
    >
      {props.label}
    </FilterButton>
  );
};
