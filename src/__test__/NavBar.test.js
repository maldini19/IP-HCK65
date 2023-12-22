import { render, screen, fireEvent, describe, test, expect } from '@testing-library/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from 'firebase/auth';
import { jest } from '@jest/globals';
import NavBar from '../components/NavBar';

jest.mock('react-firebase-hooks/auth');
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('NavBar', () => {

    test('renders NavBar component', () => {
        useAuthState.mockReturnValue([null]);
        render(<NavBar />);
        
        const navBarElement = screen.getByRole('navigation', { name: 'nav-bar' });
        expect(navBarElement).toBeInTheDocument();
    });

    test('displays Sign Out button when user is authenticated', () => {
        useAuthState.mockReturnValue([{ displayName: 'John Doe' }]);
        render(<NavBar />);

        const signOutButton = screen.getByRole('button', { name: 'Sign Out' });
        expect(signOutButton).toBeInTheDocument();
    });

    test('does not display Sign Out button when user is not authenticated', () => {
        useAuthState.mockReturnValue([null]);
        render(<NavBar />);

        const signOutButton = screen.queryByRole('button', { name: 'Sign Out' });
        expect(signOutButton).toBeNull();
    });

    test('calls signOut function and navigates to home page when Sign Out button is clicked', () => {
        useAuthState.mockReturnValue([{ displayName: 'John Doe' }]);
        const navigateMock = jest.fn();
        useNavigate.mockReturnValue(navigateMock);
        render(<NavBar />);

        const signOutButton = screen.getByRole('button', { name: 'Sign Out' });
        fireEvent.click(signOutButton);

        expect(auth.signOut).toHaveBeenCalled();

        expect(navigateMock).toHaveBeenCalledWith('/');
    });
});