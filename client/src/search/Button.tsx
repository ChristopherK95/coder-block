import styled from "styled-components";
import { FilterButton } from "./Styles";

export const Button = (props: {
  label: "Keywords" | "Locations";
  onToggle: (ver: "Keywords" | "Locations") => void;
  dropdownToggle: boolean;
}) => {
  const handleClick = (e: React.MouseEvent) => {
    props.onToggle(props.label);
  };

  return (
    <FilterButton toggled={props.dropdownToggle} onClick={handleClick}>
      {props.label}
    </FilterButton>
  );
};
