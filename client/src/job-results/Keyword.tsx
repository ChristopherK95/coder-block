import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Tooltip from '../components/Tooltip/Tooltip';

const Img = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 5px;
  position: relative;
`;

const Keyword = (props: { keyword: string }) => {
  const { t } = useTranslation('translation');
  const [isHover, setHover] = useState(false);
  const url = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${t(
    props.keyword.toLowerCase()
  )}/${t(props.keyword.toLowerCase())}-original.svg`;

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      {' '}
      <Tooltip visible={isHover}>{props.keyword}</Tooltip>
      <Img
        src={url}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />{' '}
    </div>
  );
};

export default Keyword;
