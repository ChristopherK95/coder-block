import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Img = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 5px;
`;

const Keyword = (props: { keyword: string }) => {
  const { t } = useTranslation('translation');

  const url = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${t(
    props.keyword.toLowerCase()
  )}/${t(props.keyword.toLowerCase())}-original.svg`;

  return <Img src={url} />;
};

export default Keyword;
