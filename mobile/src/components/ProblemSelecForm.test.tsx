import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ProblemSelecForm from "./ProblemSelecForm";

const GEN_BTN_TXT = "Generate Question Set";
const TOTAL_PROB_SLIDER_ID = "total-problems-slider";
const CHOCOLATE_PROB_SLIDER_ID = "chocolate-problems-slider";
const PROMPT_INPUT_ID = "prompt-input";
const MAX_PROBLEM_COUNT = 35; //Just for testing 

describe("ProblemSelecForm Component", () => {
  let mockOnGenerate: jest.Mock;

  beforeEach(() => {
    mockOnGenerate = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("accepts a minimum of 1 total question", () => {
    //render screen
    const { getByTestId, getByText } = render(
      <ProblemSelecForm onGenerate={mockOnGenerate} MAX_PROBLEM_COUNT={MAX_PROBLEM_COUNT} />,
    );
    //scan and test
    const slider = getByTestId(TOTAL_PROB_SLIDER_ID);
    fireEvent(slider, "onValueChange", 0);

    const genButton = getByText(GEN_BTN_TXT);
    expect(genButton.props.disabled).toBe(true);
  });

  it("accepts a maximum of injected total questions", () => {
    const { getByTestId, getByText } = render(
      <ProblemSelecForm onGenerate={mockOnGenerate} MAX_PROBLEM_COUNT={MAX_PROBLEM_COUNT} />,
    );

    const slider = getByTestId(TOTAL_PROB_SLIDER_ID);
    fireEvent(slider, "onValueChange", (MAX_PROBLEM_COUNT + 1));

    const genButton = getByText(GEN_BTN_TXT);
    expect(genButton.props.disabled).toBe(true);
  });

  it("succesfully accepts 0 chocolate problems", () => {
    const { getByTestId, getByText } = render(
      <ProblemSelecForm onGenerate={mockOnGenerate} MAX_PROBLEM_COUNT={MAX_PROBLEM_COUNT} />,
    );

    //enabling the button
    fireEvent(getByTestId(TOTAL_PROB_SLIDER_ID), "onValueChange", 10);

    const slider = getByTestId(CHOCOLATE_PROB_SLIDER_ID);
    fireEvent(slider, "onValueChange", 0);

    const genButton = getByText(GEN_BTN_TXT);
    expect(genButton.props.disabled).toBe(false);
  });

  it("succesfully prevents adding more chocolate problems than total problem count", () => {
    const { getByTestId, getByText } = render(
      <ProblemSelecForm onGenerate={mockOnGenerate} MAX_PROBLEM_COUNT={MAX_PROBLEM_COUNT} />,
    );

    fireEvent(getByTestId(TOTAL_PROB_SLIDER_ID), "onValueChange", 10);
    fireEvent(getByTestId(CHOCOLATE_PROB_SLIDER_ID), "onValueChange", 11);

    const genButton = getByText(GEN_BTN_TXT);
    expect(genButton.props.disabled).toBe(true);
  });

  it("succesfully allows a blank instructions prompt", () => {
    //Both empty and only whitespaces
    const { getByTestId, getByText } = render(
      <ProblemSelecForm onGenerate={mockOnGenerate} MAX_PROBLEM_COUNT={MAX_PROBLEM_COUNT} />,
    );

    //enabling the button
    fireEvent(getByTestId(TOTAL_PROB_SLIDER_ID), "onValueChange", 10);

    fireEvent.changeText(getByTestId(PROMPT_INPUT_ID), "");

    const genButton = getByText(GEN_BTN_TXT);
    expect(genButton.props.disabled).toBe(false);

    fireEvent.changeText(getByTestId(PROMPT_INPUT_ID), "  ");
    expect(genButton.props.disabled).toBe(false);
  });

  it("succesfully accepts only positive integer problem count inputs", () => {
    const { getByTestId, getByText } = render(
      <ProblemSelecForm onGenerate={mockOnGenerate} MAX_PROBLEM_COUNT={MAX_PROBLEM_COUNT} />,
    );

    //Setting valid count for enabling
    fireEvent(getByTestId(TOTAL_PROB_SLIDER_ID), "onValueChange", 15);

    const genButton = getByText(GEN_BTN_TXT);
    expect(genButton.props.disabled).toBe(false);

    fireEvent(getByTestId(TOTAL_PROB_SLIDER_ID), "onValueChange", 1.5);
    expect(genButton.props.disabled).toBe(true);

    //Setting valid count for enabling
    fireEvent(getByTestId(TOTAL_PROB_SLIDER_ID), "onValueChange", 15);
    fireEvent(getByTestId(CHOCOLATE_PROB_SLIDER_ID), "onValueChange", 0.5);
    expect(genButton.props.disabled).toBe(true);

    //NEGATIVE NUMBERS:

    //Setting valid count for enabling
    fireEvent(getByTestId(TOTAL_PROB_SLIDER_ID), "onValueChange", 15);
    expect(genButton.props.disabled).toBe(false);

    fireEvent(getByTestId(TOTAL_PROB_SLIDER_ID), "onValueChange", -10);
    expect(genButton.props.disabled).toBe(true);

    //Setting valid count for enabling
    fireEvent(getByTestId(TOTAL_PROB_SLIDER_ID), "onValueChange", 15);
    fireEvent(getByTestId(CHOCOLATE_PROB_SLIDER_ID), "onValueChange", -7);
    expect(genButton.props.disabled).toBe(true);
  });
});
