import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddTopicForm from './AddTopicForm';

const existingTopics = ['Gradient', 'SGD', 'Infinite Series', 'Angular Momentum'];

describe('AddTopicForm Component', () => {
    //Spec 4a. Adding the topic
    it('successfully adds a valid topic', () =>{
        const mockOnAddTopic = jest.fn(); 
        const {getByPlaceholderText, getByText} = render(
            <AddTopicForm onAddTopic={mockOnAddTopic} addTopicProps={existingTopics} />
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
            <AddTopicForm onAddTopic={mockOnAddTopic} addTopicProps={existingTopics}/>
        );

        //Fake rendering of screen, now scan and fire:
        const input = getByPlaceholderText('Enter a topic: ');
        const addButton = getByText('add');

        fireEvent.changeText(input, 'The quick brown fox jumps over the lazy dog\'s head.'); //51 characters

        expect(addButton.props.disabled).toBe(true); //Checking if the button is disabled 
    });

    //Spec 1a. Blank Topic/Simply Whitespaces
    it('succesfully prevents addition of blank topic', () => {
        //mock func
        const mockOnAddTopic = jest.fn();

        //now render the screen to test
        const {getByPlaceholderText, getByText} = render (
            <AddTopicForm onAddTopic={mockOnAddTopic} addTopicProps={existingTopics}/>
        );

        //Now scan for inputs and try to input
        const input = getByPlaceholderText('Enter a topic: ');
        const addButton = getByText('add');

        fireEvent.changeText(input, '');
        expect(addButton.props.disabled).toBe(true);

        fireEvent.changeText(input, '  ');
        expect(addButton.props.disabled).toBe(true);
    })

    //Spec 3a. - Refuse to add already existing topics 
    it('successfuly refuses to add an existing topic regardless of case', () =>{
        //mock function:
        const mockOnAddTopic = jest.fn();

        //render the screen:
        const {getByPlaceholderText, getByText} = render(
            <AddTopicForm onAddTopic={mockOnAddTopic} addTopicProps={existingTopics}/>
        )

        //Now scan the screen, simulate the input 
        const input = getByPlaceholderText('Enter a topic: ');
        const addButton = getByText('add');

        fireEvent.changeText(input, 'sgD');
        expect(addButton.props.disabled).toBe(true);
        expect(getByText('Topic Already Exists!')).toBeTruthy();

        fireEvent.changeText(input, 'aNgUlar MomenTUM');
        expect(addButton.props.disabled).toBe(true);
        expect(getByText('Topic Already Exists!')).toBeTruthy();
    });


});