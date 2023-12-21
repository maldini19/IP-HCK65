import { render, screen, fireEvent, describe, beforeEach, afterEach, test, expect } from '@testing-library/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.js';
import { jest } from '@jest/globals';
import Message from '../components/Message.jsx';

jest.mock('react-firebase-hooks/auth', () => ({
    useAuthState: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
    doc: jest.fn(),
    deleteDoc: jest.fn(),
    updateDoc: jest.fn(),
}));

describe('Message component', () => {
    const message = {
        id: 1,
        uid: 'user1',
        avatar: 'avatar.jpg',
        name: 'John Doe',
        text: 'Hello, world!',
        image: 'image.jpg',
    };

    const user = {
        uid: 'user1',
    };

    beforeEach(() => {
        useAuthState.mockReturnValue([user]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders message correctly', () => {
        render(<Message message={message} />);
        
        const messageElement = screen.getByText('Hello, world!');
        expect(messageElement).toBeInTheDocument();
    });

    test('displays user avatar', () => {
        render(<Message message={message} />);
        
        const avatarElement = screen.getByAltText('user avatar');
        expect(avatarElement).toHaveAttribute('src', 'avatar.jpg');
    });

    test('displays user name', () => {
        render(<Message message={message} />);
        
        const nameElement = screen.getByText('John Doe');
        expect(nameElement).toBeInTheDocument();
    });

    test('displays user message', () => {
        render(<Message message={message} />);
        
        const textElement = screen.getByText('Hello, world!');
        expect(textElement).toBeInTheDocument();
    });

    test('displays message image', () => {
        render(<Message message={message} />);
        
        const imageElement = screen.getByAltText('sent content');
        expect(imageElement).toHaveAttribute('src', 'image.jpg');
    });

    test('deletes message when delete button is clicked', async () => {
        doc.mockReturnValueOnce({
            id: message.id,
            uid: message.uid,
        });

        render(<Message message={message} />);
        
        const deleteButton = screen.getByRole('button', { name: 'Delete' });
        fireEvent.click(deleteButton);

        expect(deleteDoc).toHaveBeenCalledWith(doc(db, 'messages', message.id));
    });

    test('edits message when edit button is clicked', async () => {
        doc.mockReturnValueOnce({
            id: message.id,
            uid: message.uid,
        });

        render(<Message message={message} />);
        
        const editButton = screen.getByRole('button', { name: 'Edit' });
        fireEvent.click(editButton);

        const inputElement = screen.getByRole('textbox');
        fireEvent.change(inputElement, { target: { value: 'New message' } });

        const saveButton = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveButton);

        expect(updateDoc).toHaveBeenCalledWith(doc(db, 'messages', message.id), {
            text: 'New message',
        });
    });
});