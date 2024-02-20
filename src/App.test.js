import {render, screen, waitFor, within} from '@testing-library/react';
import App from './App';
import Search from "./components/Search";
import {createMockServer} from "./createMockServer";
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";

describe('Weather application tests', () => {
  let server;
  beforeEach(() => {
    server = createMockServer()
  })
  afterEach(() => {
    server.shutdown()
  })

  it('renders weather application title', function () {
    render(<App />);
    const linkElement = screen.getByText(/Weather Application/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('shows city search results', async () => {
    render(<Search />);

    const input = screen.getByTestId('search-input')
    userEvent.type(input, 'Melbourne')

    const button = screen.getByTestId('search-button')
    userEvent.click(button)

    await waitFor(() => expect(screen.getAllByText(/Melbourne/i).length).toEqual(5))
    expect(screen.getByText)
  });

  it('shows city search result details', async () => {
    render(<Search />);

    const input = screen.getByTestId('search-input')
    userEvent.type(input, 'Melbourne')

    const button = screen.getByTestId('search-button')
    userEvent.click(button)

    await waitFor(() => expect(screen.getAllByText(/Melbourne/i).length).toEqual(5))
    expect(screen.getByText(/Melbourne, -37.8142176, 144.9631608/i)).toBeInTheDocument()
  });

  it('add search result to my weather list', async () => {
    render(<Search />);

    const input = screen.getByTestId('search-input')
    userEvent.type(input, 'Melbourne')

    const button = screen.getByTestId('search-button')
    userEvent.click(button)

    await waitFor(() => expect (screen.getAllByText(/Melbourne/i).length).toEqual(5))

    const selected = screen.getAllByText(/Melbourne/i) [3]
    act(() => {
    userEvent.click(selected)
    })

    expect(within(screen.getByTestId('my-weather-list')).getByText(/Melbourne/i)).toBeInTheDocument()
  });
});
