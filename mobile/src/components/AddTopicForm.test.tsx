import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddTopicForm from './AddTopicForm';

describe('AddTopicForm Component', () => {
    //Spec 4a. Adding the topic
    it('successfully adds a valid topic', () =>{
        const mockOnAddTopic = jest.fn(); 
        const {getByPlaceholderText, getByText} = render(
            <AddTopicForm onAddTopic={mockOnAddTopic}/>
        );

        const input = getByPlaceholderText('Enter a topic: ');
        const addButton= getByText('add');

        fireEvent.changeText(input, 'Calculus III');
        fireEvent.press(addButton);

        expect(mockOnAddTopic).toHaveBeenCalledWith('Calculus III');
        expect(mockOnAddTopic).toHaveBeenCalledTimes(1);
        
    });

    //Spec 2a. 50 Limit Char
    it('succesfully prevents topic name > 50 characters', () => {
        const mockOnAddTopic = jest.fn(); //mock func
        const {getByPlaceholderText, getByText} = render (
            <AddTopicForm onAddTopic={mockOnAddTopic}/>
        );

        //Fake rendering of screen, now scan and fire:
        const input = getByPlaceholderText('Enter a topic: ');
        const addButton = getByText('add');

        fireEvent.changeText(input, '"The quick brown fox jumps over the lazy dog\'s head.'); //51 characters

        expect(addButton.props.disabled).toBe(true); //Checking if the button is disabled 
    });


    
});