import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import DiscoverBooks from "../components/DiscoverBooks";
import api from "../api/axios";


vi.mock("../api/axios", () => ({
  default: {
    post: vi.fn(),
  },
}));


vi.mock("../components/Sidebar", () => ({
  default: () => <div>Sidebar</div>,
}));


vi.mock("../components/BookSearch", () => ({
  default: ({ onAddBook }) => (
    <button
      onClick={() =>
        onAddBook({
          title: "Atomic Habits",
          author: "James Clear",
          isbn: "12345",
          total_pages: 300,
          cover_image_url: "cover.jpg",
          description: "A book about habits",
          source: "Google Books"
        })
      }
    >
      Add Book
    </button>
  ),
}));


describe("DiscoverBooks", () => {

  test("renders discover books page", () => {

    render(<DiscoverBooks />);


    expect(
      screen.getByText("Discover Books")
    ).toBeInTheDocument();


    expect(
      screen.getByText(
        "Search for books and add them to your reading list."
      )
    ).toBeInTheDocument();

  });


  test("adds a book and shows success message", async () => {

    api.post.mockResolvedValue({
      data: {}
    });


    render(<DiscoverBooks />);


    fireEvent.click(
      screen.getByText("Add Book")
    );


    await waitFor(() => {

      expect(
        screen.getByText(
          "Book added to library!"
        )
      ).toBeInTheDocument();

    });


    expect(api.post)
      .toHaveBeenCalledWith(
        "/reading-list/library/books",
        expect.objectContaining({
          title: "Atomic Habits",
          author: "James Clear"
        })
      );

  });

});