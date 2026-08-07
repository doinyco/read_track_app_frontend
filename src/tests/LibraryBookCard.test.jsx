import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import LibraryBookCard from "../components/LibraryBookCard";
import api from "../api/axios";
import React from "react";

vi.mock("../api/axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("LibraryBookCard", () => {

  test("displays book information", async () => {

    api.get.mockResolvedValue({
      data: {
        pages_read: 50,
        percentage_completed: 25
      }
    });

    const book = {
      reading_list_id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      status: "currently_reading",
      total_pages: 200,
      cover_image_url: "cover.jpg"
    };

    render(
      <LibraryBookCard 
        book={book}
        refresh={vi.fn()}
      />
    );

    expect(
      screen.getByText("Atomic Habits")
    ).toBeInTheDocument();

    expect(
      screen.getByText("James Clear")
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText(/Page 50 of 200/)
      ).toBeInTheDocument();

    });

  });

});