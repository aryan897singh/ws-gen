import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import TopicItem from './TopicItem';

const DEL_TOPIC_BTN = "Delete Topic";
const DEL_TOPIC_WRNING = "Are you sure you want to delete?";

describe('TopicItem Component', () => {
    it('requests confirmation when the delete button is pressed', () => {
        //Define mock function
        const mockOnDelete = jest.fn();
        
        //Define spy for alerts
        const alertSpy = jest.spyOn(Alert, 'alert');

        //render screen
        const { getByText } = render(
            <TopicItem topic="Calculus III" onDelete={mockOnDelete} />
        );

        //find button and fire
        const delButton = getByText(DEL_TOPIC_BTN);
        fireEvent.press(delButton);
        //Body of alert - Title, Message, Array of Buttons (Cancel/Confirm)
        expect(alertSpy).toHaveBeenCalledWith(
            expect.any(String),
            DEL_TOPIC_WRNING,
            expect.any(Array)
        );  
            
        expect(mockOnDelete).not.toHaveBeenCalled(); //Delete func not called unless alert accepted

    });
});