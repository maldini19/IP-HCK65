import ChatBox from '../components/ChatBox';
import { render, screen, test } from '@testing-library/react';
import { expect } from '@testing-library/dom';
import { jest } from '@jest/globals';


test('renders ChatBox component', () => {
    render(<ChatBox />);
    
    const chatBoxElement = screen.getByRole('main', { name: 'chat-box' });
    expect(chatBoxElement).toBeInTheDocument();
});

test('displays messages', () => {
  const messages = [
    { id: 1, text: 'Hello', createdAt: new Date() },
    { id: 2, text: 'Hi there', createdAt: new Date() },
  ];
  

render(<ChatBox />);
    
jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(messages),
});
    
const messageElements = screen.getAllByRole('message');
expect(messageElements).toHaveLength(messages.length);
expect(messageElements[0]).toHaveTextContent('Hello');
expect(messageElements[1]).toHaveTextContent('Hi there');
});

test('scrolls to bottom when new message is added', () => {
  render(<ChatBox />);
  
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce([]),
  });

  const scrollElement = screen.getByRole('scroll');
  expect(scrollElement.scrollTop).toBe(scrollElement.scrollHeight);
});