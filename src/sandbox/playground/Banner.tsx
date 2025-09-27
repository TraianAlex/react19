import React from "react";
import styled from "styled-components";

interface Props {
  title: string;
  subtitle: string;
}

const Banner: React.FC<Props> = ({ title, subtitle }): React.ReactElement => (
  <Wrapper>
    <h1 data-hover=" 🚀 🎩">{title}</h1>
    <h2>
      {subtitle}
      <span data-hover="React TypeScript Template" />
    </h2>
  </Wrapper>
);

export default Banner;

const Wrapper = styled.div`
  background: #333;
  color: #fff;
  font-family: sans-serif;
  text-align: center;

  code {
    text-align: left;
    font-size: 1.5rem;
  }
`;
