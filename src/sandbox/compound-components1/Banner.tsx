import styled from "styled-components";

interface Props {
  title: string;
  subtitle: string;
}

const Banner: React.FC<Props> = ({ title, subtitle }): React.ReactElement => (
  <Wrapper>
    <h2 data-hover=" 🚀 🎩">{title}</h2>
    <h3>
      {subtitle}
      <span data-hover="React TypeScript Template" />
    </h3>
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
