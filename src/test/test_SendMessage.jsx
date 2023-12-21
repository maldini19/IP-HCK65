import { render, screen, fireEvent, test, expect } from '@testing-library/react';
import SendMessage from '../components/SendMessage';

test('renders SendMessage component', () => {
  render(<SendMessage />);
  
  const sendMessageElement = screen.getByRole('form', { name: 'send-message' });
  expect(sendMessageElement).toBeInTheDocument();
});

test('updates message state on input change', () => {
  render(<SendMessage />);
  
  const inputElement = screen.getByLabelText('Enter Message');
  fireEvent.change(inputElement, { target: { value: 'Hello' } });
  
  expect(inputElement.value).toBe('Hello');
});

test('toggles emoji picker on button click', () => {
  render(<SendMessage />);
  
  const emojiButtonElement = screen.getByRole('button', { name: 'Toggle Emoji Picker' });
  fireEvent.click(emojiButtonElement);
  
  const emojiPickerElement = screen.getByRole('emoji-picker');
  expect(emojiPickerElement).toBeInTheDocument();
});

test('updates image state on file change', () => {
  render(<SendMessage />);
  
  const fileInput = screen.getByLabelText('Upload Image');
  const file = new File(['image content'], 'image.png', { type: 'image/png' });
  fireEvent.change(fileInput, { target: { files: [file] } });
  
  expect(fileInput.files[0]).toBe(file);
});

test('submits message on form submit', () => {
  render(<SendMessage />);
  
  const formElement = screen.getByRole('form', { name: 'send-message' });
  fireEvent.submit(formElement);

});