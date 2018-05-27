import React from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styled from "styled-components";
import EmailLogin from "../../Routes/EmailLogin";
import Login from "../../Routes/Login";

const StyledTransition = styled(TransitionGroup)`
  height: 100%;
`;

const Wrapper = styled.div`
  height: 100%;
  .fade-enter {
    opacity: 0.01;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 0.3s ease-in;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit.fade-exit-active {
    opacity: 0.01;
    transition: opacity 0.3 ease-in;
  }
`;

interface IAppPresenterProps {
  isLoggedIn: boolean;
}

const AppPresenter: React.SFC<IAppPresenterProps> = ({ isLoggedIn }) => (
  <BrowserRouter>
    {isLoggedIn ? <LoggedInRoutes /> : <WrappedLoggedOutRoutes />}
  </BrowserRouter>
);

const LoggedOutRoutes: React.SFC<any> = ({ location }) => (
  <Wrapper>
    <StyledTransition>
      <CSSTransition key={location.key} timeout={200} classNames="fade">
        <Switch key={location.key}>
          <Route exact={true} path="/" component={Login} />
          <Route path="/email-login" component={EmailLogin} />
        </Switch>
      </CSSTransition>
    </StyledTransition>
  </Wrapper>
);

const WrappedLoggedOutRoutes = withRouter(LoggedOutRoutes);

const LoggedInRoutes: React.SFC = () => <React.Fragment>Hello</React.Fragment>;

export default AppPresenter;
