import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { memo } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { ClearButton } from '../atoms';

export const BackButton: React.FC<{ link?: boolean | string }> = memo(({ link }) => {
  const { goBack } = useHistory();

  const Icon = (
    <>
      <img src="/images/icons/back.svg" alt="back icon" />
      <span className="a11y-hidden">뒤로가기</span>
    </>
  );

  if (typeof link === 'string' && link !== '') {
    return <StyledLink to={link}>{Icon}</StyledLink>;
  } else {
    return <StyledButton onClick={goBack}>{Icon}</StyledButton>;
  }
});

const styledCss = css`
  position: relative;
  display: block;
  margin-left: -20px;
  width: 50px;
  height: 50px;

  > img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
const StyledLink = styled(Link)`
  ${styledCss}
`;
const StyledButton = styled(ClearButton)`
  ${styledCss}
`;