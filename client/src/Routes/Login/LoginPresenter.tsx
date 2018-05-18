import { tween } from "popmotion";
import PropTypes from "prop-types";
import React from "react";
import posed from "react-pose";
import { PoseElementProps } from "react-pose/lib/components/PoseElement.types";
import styled from "styled-components";
import bg from "../../images/bg.png";
import { loginMethodType } from "./LoginTypes";

const PresenterScreen = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const PosedHeader = posed.div({
  closed: {
    maxHeight: "0",
    opacity: 0,
    transition: (props: any) => tween({ ...props, duration: 500 })
  },
  open: {
    maxHeight: "1000px",
    opacity: 1,
    transition: (props: any) => tween({ ...props, duration: 500 })
  }
});

interface IStyledHeader {
  pose: PoseElementProps;
  onCLick: () => void;
}

const StyledHeader = styled<IStyledHeader, any>(PosedHeader)`
  background: linear-gradient(rgba(0, 153, 196, 0.5), rgba(0, 153, 196, 0.4)),
    url(${bg});
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 78%;
`;

const Logo = styled.span`
  width: 110px;
  height: 110px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 -10px 20px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  font-weight: 500;
  font-size: 25px;
`;

const PosedMobile = posed.div({
  closed: {
    height: "15%"
  },
  open: {
    height: "100%",
    marginTop: "50px"
  }
});

interface IStyledMobile {
  pose: PoseElementProps;
  onCLick: () => void;
  loginMethod: loginMethodType;
}

const StyledMobile = styled<IStyledMobile, any>(PosedMobile)`
  background-color: white;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  justify-content: ${props =>
    props.loginMethod === "mobile" ? "flex-start" : "center"};
`;

const Title = styled.div`
  font-size: 28px;
  display: block;
  margin-bottom: 30px;
`;

interface IPhoneText {
  grey: string;
}

const PhoneText = styled<IPhoneText, any>("span")`
  font-size: 20px;
  color: ${props => (props.grey ? " rgba(0, 0, 0, 0.5)" : "#2c3e50")};
  &:last-child {
    margin-left: 20px;
  }
`;

const Social = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 7%;
  border-top: 1px solid rgba(41, 128, 185, 0.5);
`;

const SocialText = styled.span`
  color: #2980b9;
  font-weight: 500;
  width: 100%;
  margin: 0 15px;
`;

interface IProps {
  handleMobileClick: () => void;
  handleSocialClick: () => void;
  handleBackButtonClick: () => void;
  phoneNumber: string;
  loginMethod: loginMethodType;
}

const LoginPresenter: React.SFC<IProps> = ({
  handleBackButtonClick,
  handleMobileClick,
  handleSocialClick,
  loginMethod
}) => (
  <PresenterScreen>
    <StyledHeader
      onClick={handleMobileClick}
      pose={loginMethod === "" ? "open" : "closed"}
    >
      <Logo>Nuber</Logo>
    </StyledHeader>
    <StyledMobile
      loginMethod={loginMethod}
      onClick={handleMobileClick}
      pose={loginMethod === "mobile" ? "open" : "closed"}
    >
      <Title>Get moving with Nuber</Title>
      <span>
        <PhoneText>🇰🇷 +82</PhoneText>
        <PhoneText grey={true}>Enter your mobile number</PhoneText>
      </span>
    </StyledMobile>
    <Social>
      <SocialText>Or connect with social</SocialText>
    </Social>
  </PresenterScreen>
);

LoginPresenter.propTypes = {
  handleBackButtonClick: PropTypes.func.isRequired,
  handleMobileClick: PropTypes.func.isRequired,
  handleSocialClick: PropTypes.func.isRequired,
  loginMethod: PropTypes.oneOf(["", "mobile", "social"]),
  phoneNumber: PropTypes.string.isRequired
};
export default LoginPresenter;