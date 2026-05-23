//Generating test cases for Screen 1: Adding, Spec 4:
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddTopicForm from './AddTopicForm';

describe('AddTopicForm Component', () => {
    //Test 4. Adding the topic
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


    
});