import keywords from "./keywords.json";

interface RootObject {
  keywords: string[];
}

const Keywords = () => {
  const keywordsArr: string[] = keywords.keywords;

  console.log(keywordsArr)

  return keywordsArr;
};

export default Keywords;