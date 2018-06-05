import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Header from "../../Components/Header";

const Container = styled.div`
  width: 100%;
  padding: 0 15px;
  padding-top: 150px;
`;

const Wrapper = styled.div`
  overflow-y: scroll;
  height: 100%;
`;

const PaymentPresenter: React.SFC = () => (
  <Wrapper className={"shouldScroll"}>
    <Helmet>
      <title>Payment | Nuber</title>
    </Helmet>
    <Header backTo="/" title={"Payment"} />
    <Container />
  </Wrapper>
);

export default PaymentPresenter;
