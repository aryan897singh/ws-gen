import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import TopicItem from './TopicItem';

describe('TopicItem Component', () => {
    it('requests confirmation when the delete button is pressed', () => {
        const mockOnDelete = jest.fn();
        
        // 1. Set up the spy to watch the native Alert system
        const alertSpy = jest.spyOn(Alert, 'alert');

        const { getByText } = render(
            <TopicItem topic="Calculus III" onDelete={mockOnDelete} />
        );

    });
});