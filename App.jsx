import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactSection from './ContactSection';
import { LanguageProvider } from '@/components/LanguageContext';
import { base44 } from '@/api/base44Client';
import { MoveRequest } from '@/lib/supabaseClient';

jest.mock('@/api/base44Client', () => ({
  base44: {
    functions: {
      invoke: jest.fn(),
    },
  },
}));

jest.mock('@/lib/supabaseClient', () => ({
  MoveRequest: {
    create: jest.fn(),
  },
}));

const renderWithLanguage = (component) => {
  return render(
    <LanguageProvider>
      {component}
    </LanguageProvider>
  );
};

describe('ContactSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders contact form with all fields', () => {
    renderWithLanguage(<ContactSection />);
    
    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email@example.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/514-885-0785/i)).toBeInTheDocument();
    expect(screen.getByText(/submit request/i)).toBeInTheDocument();
  });

  test('fills form fields with user input', async () => {
    const user = userEvent.setup();
    renderWithLanguage(<ContactSection />);
    
    const nameInput = screen.getByPlaceholderText(/your name/i);
    const emailInput = screen.getByPlaceholderText(/email@example.com/i);
    const phoneInput = screen.getByPlaceholderText(/514-885-0785/i);

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(phoneInput, '514-123-4567');

    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
    expect(phoneInput.value).toBe('514-123-4567');
  });

  test('submits form and shows success message', async () => {
    MoveRequest.create.mockResolvedValue({ ok: true });
    base44.functions.invoke.mockResolvedValue({ data: { ok: true } });

    const user = userEvent.setup();
    renderWithLanguage(<ContactSection />);
    
    await user.type(screen.getByPlaceholderText(/your name/i), 'John Doe');
    await user.type(screen.getByPlaceholderText(/email@example.com/i), 'john@example.com');
    
    const submitButton = screen.getByText(/submit request/i);
    await user.click(submitButton);

    await waitFor(() => {
      expect(MoveRequest.create).toHaveBeenCalled();
      expect(base44.functions.invoke).toHaveBeenCalledWith('handleContactForm', expect.any(Object));
    });

    await waitFor(() => {
      expect(screen.getByText(/quote requested/i)).toBeInTheDocument();
    });
  });

  test('requires name and email fields', () => {
    renderWithLanguage(<ContactSection />);
    
    const nameInput = screen.getByPlaceholderText(/your name/i);
    const emailInput = screen.getByPlaceholderText(/email@example.com/i);

    expect(nameInput.required).toBe(true);
    expect(emailInput.required).toBe(true);
  });

  test('displays loading state during form submission', async () => {
    MoveRequest.create.mockImplementation(() => new Promise(r => setTimeout(r, 100)));
    base44.functions.invoke.mockImplementation(() => new Promise(r => setTimeout(r, 100)));

    const user = userEvent.setup();
    renderWithLanguage(<ContactSection />);
    
    await user.type(screen.getByPlaceholderText(/your name/i), 'John Doe');
    await user.type(screen.getByPlaceholderText(/email@example.com/i), 'john@example.com');
    
    const submitButton = screen.getByText(/submit request/i);
    await user.click(submitButton);

    expect(submitButton).toBeDisabled();
  });
});