import React, { ReactElement } from "react";
import '@testing-library/jest-dom/extend-expect';
import Info from '../components/HomePage/info'

import { render, screen, fireEvent } from "@testing-library/react";



describe("Info", () => {
    test("renders component", () => {
        render(<Info />);
      });

    test("test 2", () => {
        render(<Info />);
        const element = document.querySelector('#test') as HTMLElement;
        expect(element).toBeInTheDocument();
    })

    test("test 1",  async () => {
        render(<Info />);
        // const element = document.('servicio');
        // expect(element).toBeInTheDocument();
    })

    test("test 3", async () =>{
        render(<Info />);
        const element = document.querySelectorAll('.info');
        expect (element.length === 2).toBe(true);
    })

    test("test 4", async () =>{
        render(<Info />);
        const element = await document.querySelector('#input') as HTMLInputElement;
        fireEvent.change(element, { target: { value: 'Mi nombre' } })
        expect(element.value).toBe('Mi nombre');
    })

    test("test 5", async () =>{
        render(<Info />);
        const element = await document.querySelector('#input') as HTMLInputElement;
        fireEvent.change(element, { target: { value: '123' } })
        expect(element.value).toBe('123');
    })

})