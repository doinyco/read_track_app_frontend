import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import Dashboard from "../components/Dashboard";
import api from "../api/axios";


vi.mock("../api/axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

vi.mock("../components/Sidebar", () => ({
  default: () => <div>Sidebar</div>,
}));

describe("Dashboard", () => {

  test("displays user dashboard information", async () => {

    api.get.mockResolvedValue({
      data: {
        username: "Marjana",

        stats: {
          books_read: 10,
          currently_reading: 2,
          want_to_read: 5
        },

        currently_reading: [],
        completed_books: [],
        wishlist: []
      }
    });

    render(<Dashboard />);

    expect(
      screen.getByText("Loading...")
    ).toBeInTheDocument();

    await waitFor(() => {

      expect(
        screen.getByText(/Marjana/)
      ).toBeInTheDocument();

    });

    expect(
      screen.getByText("Books Read")
    ).toBeInTheDocument();

    expect(
      screen.getByText("10")
    ).toBeInTheDocument();

  });

});