import { Dispatch, SetStateAction, useRef } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";

interface IProps {
  title: string;
  value: string;
  type?: string;
  error?: string;
  onChange: Dispatch<SetStateAction<string>>;
}

export const TextField = ({
  title,
  value,
  type = "text",
  error,
  onChange = () => {},
}: IProps) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <InputWrapper>
      <InputBox
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        type={type}
        ref={ref}
      />
      <InputTitle onClick={() => ref.current && ref.current.focus()}>
        {title}
      </InputTitle>
      {error && <Warnning>{error}</Warnning>}
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  width: 514px;
  height: 50px;
  position: relative;
  margin: 15px 0;
  ::after {
    content: "";
    width: 6px;
    height: 6px;
    display: block;
    position: absolute;
    background-color: ${theme.palette.complementary};
    right: 6.5px;
    top: 6px;
    transform: skewX(-9.5deg);
  }
`;

const InputTitle = styled.span`
  position: absolute;
  top: 18px;
  left: 20px;
  font-size: ${theme.typography.title1};
  transition: 0.3s;
  background-color: white;
  padding: 0 5px;
  color:${theme.palette.grey}
`;

const InputBox = styled.input`
  all: unset;
  width: 100%;
  height: 100%;
  font-size: 17px;
  padding-left: 20px;
  border-radius: 5px;
  box-sizing: border-box;
  border: 0.5px solid ${theme.palette.grey};
  &:focus {
    border: 2px solid ${theme.palette.complementary};
  }
  &:focus ~ span,
  &:valid ~ span {
    top: -5px;
    font-size: 14px;
    color: ${theme.palette.complementary};
  }
`;

const Warnning = styled.div`
  color: red;
  padding: 5px 0 0 10px;
  font-size: 12px;
`;