import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProblemSelecForm from './ProblemSelecForm';

const GEN_BTN_TXT = 'Generate Question Set';
const TOTAL_PROB_SLIDER_ID = 'total-problems-slider'; 
const CHOCLATE_PROB_INPUT = 'Chocolate Problems';

describe('ProblemSelecForm Component', () => {
    let mockOnGenerate: jest.Mock;

    beforeEach(() => {
        mockOnGenerate = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('accepts a minimum of 1 total question', () => {
        //render screen
        const {getByTestId, getByText} = render(
            <ProblemSelecForm onGenerate={mockOnGenerate}/>
        )
        //scan and test 
        const slider = getByTestId(TOTAL_PROB_SLIDER_ID);
        fireEvent(slider, 'onValueChange', 0);

        const genButton = getByText(GEN_BTN_TXT);
        expect(genButton.props.disabled).toBe(true);
    })

    it('accepts a maximum of 20 total questions', () => {
        const {getByTestId, getByText} = render(
            <ProblemSelecForm onGenerate={mockOnGenerate}/>
        )

        const slider = getByTestId(TOTAL_PROB_SLIDER_ID);
        fireEvent(slider, 'onValueChange', 21);

        const genButton = getByText(GEN_BTN_TXT);
        expect(genButton.props.disabled).toBe(true);
    })

    
});