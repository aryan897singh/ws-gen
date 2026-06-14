import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AddTopicForm from "./AddTopicForm";

const ENTER_TOPIC_INP_TXT = "Enter a topic: ";
const ADD_BTN_TXT = "add";
const DUP_ERR_MSG = "Topic Already Exists!";
const MAX_ERR_MSG = "Max Topic Limit has been Reached!";
const MAX_TOPIC_LIMIT = 10;

const existingTopics = [
  "Gradient",
  "SGD",
  "Infinite Series",
  "Angular Momentum",
];
const maxTopics = Array(MAX_TOPIC_LIMIT).fill("dummy topic");

describe("AddTopicForm Component", () => {
  //Spec 4a. Adding the topic
  it("successfully adds a valid topic", () => {
    const mockOnAddTopic = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <AddTopicForm
        onAddTopic={mockOnAddTopic}
        addTopicProps={existingTopics}
      />,
    );

    const input = getByPlaceholderText(ENTER_TOPIC_INP_TXT);
    const addButton = getByText(ADD_BTN_TXT);

    fireEvent.changeText(input, "Calculus III");
    fireEvent.press(addButton);

    expect(mockOnAddTopic).toHaveBeenCalledWith("Calculus III");
    expect(mockOnAddTopic).toHaveBeenCalledTimes(1);
  });

  //Spec 2a. 50 Limit Char
  it("succesfully prevents topic name > 50 characters", () => {
    const mockOnAddTopic = jest.fn(); //mock func
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <AddTopicForm
        onAddTopic={mockOnAddTopic}
        addTopicProps={existingTopics}
      />,
    );

    //Fake rendering of screen, now scan and fire:
    const input = getByPlaceholderText(ENTER_TOPIC_INP_TXT);
    const addButton = getByTestId("add-button");

    fireEvent.changeText(
      input,
      "The quick brown fox jumps over the lazy dog's head.",
    ); //51 characters

    expect(addButton.props.accessibilityState.disabled).toBe(true); //Checking if the button is disabled
  });

  //Spec 1a. Blank Topic/Simply Whitespaces
  it("succesfully prevents addition of blank topic", () => {
    //mock func
    const mockOnAddTopic = jest.fn();

    //now render the screen to test
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <AddTopicForm
        onAddTopic={mockOnAddTopic}
        addTopicProps={existingTopics}
      />,
    );

    //Now scan for inputs and try to input
    const input = getByPlaceholderText(ENTER_TOPIC_INP_TXT);
    const addButton = getByTestId("add-button");

    fireEvent.changeText(input, "");
    expect(addButton.props.accessibilityState.disabled).toBe(true);

    fireEvent.changeText(input, "  ");
    expect(addButton.props.accessibilityState.disabled).toBe(true);
  });

  //Spec 3a. - Refuse to add already existing topics
  it("successfully refuses to add an existing topic regardless of case", () => {
    //mock function:
    const mockOnAddTopic = jest.fn();

    //render the screen:
    const { getByPlaceholderText, getByText } = render(
      <AddTopicForm
        onAddTopic={mockOnAddTopic}
        addTopicProps={existingTopics}
      />,
    );

    //Now scan the screen, simulate the input
    const input = getByPlaceholderText(ENTER_TOPIC_INP_TXT);
    const addButton = getByText(ADD_BTN_TXT);

    fireEvent.changeText(input, "sgD");
    expect(addButton.props.disabled).toBe(true);
    expect(getByText(DUP_ERR_MSG)).toBeTruthy();

    fireEvent.changeText(input, "aNgUlar MomenTUM");
    expect(addButton.props.disabled).toBe(true);
    expect(getByText(DUP_ERR_MSG)).toBeTruthy();
  });

  //Spec 5a - Disable Addition of topics once max limit is hit
  it("successfuly prevents addition of topics once max limit is reached", () => {
    //define mock function:
    const mockOnAddTopic = jest.fn();

    //render the screen
    const { getByPlaceholderText, getByText } = render(
      <AddTopicForm onAddTopic={mockOnAddTopic} addTopicProps={maxTopics} />,
    );

    //scan and simulate:
    const input = getByPlaceholderText(ENTER_TOPIC_INP_TXT);
    const addButton = getByText(ADD_BTN_TXT);

    fireEvent.changeText(input, "dummy topic max + 1");
    expect(addButton.props.disabled).toBe(true);
    expect(getByText(MAX_ERR_MSG)).toBeTruthy(); //Anything other than null
  });
});
