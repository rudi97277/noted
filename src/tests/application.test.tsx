import Application from "@/pages/application";
import { screen } from "@testing-library/react";
import { vi, type Mock } from "vitest";
import { renderWithProviders } from "./util";

vi.mock("@/utilities/request.util", () => ({
  __esModule: true,
  default: vi.fn(),
}));

import { vacancyList } from "@/services/mocks/vacancy.mock";
import request from "@/utilities/request.util";

test("renders application list", async () => {
  (request as Mock).mockResolvedValue(vacancyList);

  renderWithProviders(<Application />);
  expect(await screen.findByText(/rejected/i)).toBeInTheDocument();
});
