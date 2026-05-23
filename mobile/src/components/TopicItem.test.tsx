import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import TopicItem from './TopicItem';

const DEL_TOPIC_BTN = "Delete Topic";
const DEL_TOPIC_WRNING = "Are you sure you want to delete?";

const existingTopics = ['Gradient', 'SGD', 'Infinite Series', 'Angular Momentum'];

describe('TopicItem Component', () => {

    let mockOnDelete: jest.Mock;
    let alertSpy: jest.SpyInstance;

    beforeEach(() => { //before every unit test 
        mockOnDelete = jest.fn();
        alertSpy = jest.spyOn(Alert, 'alert');
    })

    afterEach(() =>{ //after every unit test
        jest.clearAllMocks();
    })


    it('requests confirmation when the delete button is pressed', () => {
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

    it('does NOT call onDelete when cancel is pressed in the alert', () => {
        //render screen
        const {getByText} = render(
            <TopicItem topic='Calculus III' onDelete={mockOnDelete}/>
        )
        const delButton = getByText(DEL_TOPIC_BTN);
        fireEvent.press(delButton);

        //Now within the alert we call the cancel button
        const buttonArray = alertSpy.mock.calls[0][2];

        buttonArray[1].onPress();

        expect(mockOnDelete).not.toHaveBeenCalled();       
    } )

    
});