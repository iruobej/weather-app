import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders Weather App title", () => {
  render(<App />);
  expect(screen.getByText(/weather app/i)).toBeInTheDocument();
});

test("updates the input value when typing", () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/please enter a city/i);
  fireEvent.change(input, { target: { value: "London" } });
  expect(input.value).toBe("London");
});

test('clicking button fetches and displays weather', async () => {
  const mockData = {
    location: { name: 'London', country: 'UK' },
    current: { 
      temp_c: 20, 
      feelslike_c: 18, 
      humidity: 60,
      condition: { text: 'Sunny', icon: 'icon_url' }
    }
  };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData)
    })
  );

  render(<App />);
  const input = screen.getByPlaceholderText(/please enter a city/i);
  fireEvent.change(input, { target: { value: 'London' } });
  fireEvent.click(screen.getByText(/get weather/i));

  // Waiting for async content to appear
  const cityName = await screen.findByText(/London, UK/i);
  expect(cityName).toBeInTheDocument();
  expect(screen.getByText(/Sunny/i)).toBeInTheDocument();
  expect(screen.getByText(/Temperature: 20°C/i)).toBeInTheDocument();

  // Cleaning up mock
  global.fetch.mockRestore();
});

test('does not call fetch when input is empty', () => {
  global.fetch = jest.fn();

  render(<App />);
  fireEvent.click(screen.getByText(/get weather/i));

  expect(global.fetch).not.toHaveBeenCalled();
  global.fetch.mockRestore();
});

test('weather info not visible initially', () => {
  const { container } = render(<App />);
  const weatherDiv = container.querySelector('.weatherInfo');
  expect(weatherDiv).toBeNull();
});