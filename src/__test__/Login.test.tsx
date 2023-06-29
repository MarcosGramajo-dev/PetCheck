import React, { ReactElement } from "react";
import '@testing-library/jest-dom/extend-expect';
import Login from '../components/Modal/login'
import { render, screen, fireEvent } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";

describe("Login", () => {
    test("Renderizado de componente", async () => {
        render(<Login />);
    }); 

    test("ingresando valores en inputs de login", async () => {
        render(<Login/>)
        const inputEmail = await document.querySelector('#emailLogin') as HTMLInputElement;
        const inputPass = await document.querySelector('#pass') as HTMLInputElement;
        const btnLogin = await document.querySelector('#submitLogin') as HTMLButtonElement;

        fireEvent.change(inputEmail, { target: { value: 'email@test.com' } });
        fireEvent.change(inputPass, { target: { value: '123456' } });
        fireEvent.click(btnLogin)
        
        const MError = await document.querySelector('#MError') as HTMLElement

        expect(inputEmail.value).toBe('email@test.com')
        expect(inputPass.value).toBe('123456')
        expect(MError).toBeInTheDocument()

    })


})