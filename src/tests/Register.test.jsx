import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi } from "vitest";
import Register from "../components/Register";
import api from "../api/axios";


vi.mock("../api/axios", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("Register", () => {
  test("renders register form", () => {

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Create Account")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Username")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Email")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Password")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();

  });

  test("submits registration data", async () => {

    api.post.mockResolvedValue({
      data: {
        message: "Registration successful"
      }
    });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(
      screen.getByPlaceholderText("Username"),
      {
        target: {
          value: "marjana"
        }
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Email"),
      {
        target: {
          value: "marjana@test.com"
        }
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Password"),
      {
        target: {
          value: "password123"
        }
      }
    );


    fireEvent.click(
      screen.getByRole("button", { name: /register/i })
    );

    await waitFor(() => {

      expect(api.post).toHaveBeenCalledWith(
        "/users/register",
        {
          username: "marjana",
          email: "marjana@test.com",
          password: "password123"
        }
      );

    });

  });

});