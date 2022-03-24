import {Helmet} from 'react-helmet-async';

interface TitleProps {
  text: string;
}

function Title({text}: TitleProps) {
  return (
    <Helmet>
      <title>{text} | Food Delivery</title>
    </Helmet>
  );
}

export default Title;
