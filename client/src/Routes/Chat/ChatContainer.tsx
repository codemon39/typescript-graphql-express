import { SubscribeToMoreOptions } from "apollo-client";
import React from "react";
import { graphql, MutationFn, Query } from "react-apollo";
import { toast } from "react-toastify";
import ChatPresenter from "./ChatPresenter";
import {
  GET_CHAT,
  NEW_MESSAGE_SUBSCRIPTION,
  SEND_MESSAGE
} from "./ChatQueries";

interface IProps {
  location: any;
  history: any;
  SendMessageMutation: MutationFn;
}

interface IState {
  message: "";
}

class ChatContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      message: ""
    };
  }
  render() {
    const {
      location: { state: { rideId = 0 } = {} }
    } = this.props;
    const { message } = this.state;
    return (
      <Query query={GET_CHAT} variables={{ rideId }}>
        {({ data, loading, subscribeToMore }) => {
          const subscribeOptions: SubscribeToMoreOptions = {
            document: NEW_MESSAGE_SUBSCRIPTION,
            updateQuery: this.updateQuery
          };
          subscribeToMore(subscribeOptions);
          return (
            <ChatPresenter
              loading={loading}
              data={data}
              handleInputChange={this.handleInputChange}
              message={message}
              handleSubmit={this.handleSubmit}
            />
          );
        }}
      </Query>
    );
  }

  private updateQuery = (previousData, { subscriptionData }) => {
    if (!subscriptionData.data) {
      return previousData;
    }
    const {
      data: { newMessage }
    } = subscriptionData;

    const {
      getChat: {
        chat: { messages }
      }
    } = previousData;

    const lastMessage = messages[messages.length - 1];

    if (newMessage.id === lastMessage.id) {
      return;
    }

    return Object.assign({}, previousData, {
      getChat: {
        ...previousData.getChat,
        chat: {
          ...previousData.getChat.chat,
          messages: [...previousData.getChat.chat.messages, newMessage]
        }
      }
    });
  };

  private handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value, name }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };

  private handleSubmit = () => {
    const { message } = this.state;
    const { SendMessageMutation } = this.props;
    if (message === "") {
      toast.error("Write a message");
      return;
    }
    SendMessageMutation({ variables: { message } });
    this.setState({
      message: ""
    });
  };
}

export default graphql<any, any>(SEND_MESSAGE, {
  name: "SendMessageMutation"
})(ChatContainer);
