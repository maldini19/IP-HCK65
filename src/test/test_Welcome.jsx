import { render, screen, fireEvent } from '@testing-library/react';
import { signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import Welcome from '../components/Welcome';
import { auth } from 'firebase/auth';
import { jest } from '@jest/globals';
import { test } from '@testing-library/react';
import { expect } from '@testing-library/jest-dom/extend-expect';

jest.mock('firebase/auth', () => ({
    signInWithPopup: jest.fn(),
}));
jest.mock('./Logo', () => 'Logo');



test('renders Welcome component', () => {
    render(<Welcome />);
    
    // Assert that the Welcome component is rendered
    const headerElement = screen.getByRole('heading', { name: 'DisKrod💬' });
    expect(headerElement).toBeInTheDocument();
    
    const signInButton = screen.getByRole('button', { name: 'Sign in with Google' });
    expect(signInButton).toBeInTheDocument();
});


test('calls signInWithPopup when Google Sign-In button is clicked', () => {
    render(<Welcome />);
    
    const signInButton = screen.getByRole('button', { name: 'Sign in with Google' });
    fireEvent.click(signInButton);
    
    // Assert that signInWithPopup is called with the correct arguments
    expect(signInWithPopup).toHaveBeenCalledWith(auth, new GoogleAuthProvider());
});