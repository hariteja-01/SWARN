import React from 'react';
import styled from 'styled-components';

const Pattern = ({ darkMode }) => {
  return (
    <StyledWrapper darkMode={darkMode}>
      <div className="container" />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  .container {
    width: 100vw;
    height: 100vh;
    transition: background 0.8s cubic-bezier(.4,0,.2,1);
    background: ${({ darkMode }) =>
      darkMode
        ? 'linear-gradient(120deg, #181c2f 0%, #232946 100%)'
        : `radial-gradient(
            125% 125% at -2% 101%,
            rgba(245, 87, 2, 1) 10.5%,
            rgba(245, 120, 2, 1) 16%,
            rgba(245, 140, 2, 1) 17.5%,
            rgba(245, 170, 100, 1) 25%,
            rgba(238, 174, 202, 1) 40%,
            rgba(202, 179, 214, 1) 65%,
            rgba(148, 201, 233, 1) 100%
          )`
    };
  }
`;

export default Pattern;