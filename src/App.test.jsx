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
