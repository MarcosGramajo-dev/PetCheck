import React, { ReactElement } from "react";
import HistoriaClinica from "../components/HisotriaClinica/HistoriaClinica";

import { render, screen, RenderOptions } from "@testing-library/react";

describe("HistoriaClinica", () => {
  test("renders component", () => {
    render(<HistoriaClinica />);
  });
  
  // test("displays pet information", () => {
  //   render(<HistoriaClinica />);
  //   expect(screen.getByText("Nombre de la Mascota")).toBeInTheDocument();
  //   expect(screen.getByText("Sexo de la Mascota")).toBeInTheDocument();
  // });

  // test("displays vaccination information", () => {
  //   render(<HistoriaClinica />);
  //   expect(screen.getByText("Resumen Clinico")).toBeInTheDocument();
  //   expect(screen.getByText("Vacunacion")).toBeInTheDocument();
  // });

  // test("handles button click", () => {
  //   render(<HistoriaClinica />);
  //   screen.getByRole("button").click();
  // });
});