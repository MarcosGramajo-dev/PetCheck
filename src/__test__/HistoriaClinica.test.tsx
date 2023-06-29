import React, { ReactElement } from "react";
import '@testing-library/jest-dom/extend-expect';
import NuevaHistoria from '../components/HisotriaClinica/newHistory'
import { render, screen, fireEvent } from "@testing-library/react";

describe("Info", () => {
    test("Renderizado de componente", () => {
        render(<NuevaHistoria />);
    });

    test("Validacion de inputs number ingresando texto", async () => {
        render(<NuevaHistoria />)
        const inputId = await document.querySelector('#idLibretaNewHC') as HTMLInputElement;
        fireEvent.change(inputId, { target: { value: 'TextTest' } });
        expect(inputId.value).toBe('TextTest');
    })

    test("Validacion de inputs number ingresando numeros", async () => {
        render(<NuevaHistoria />)
        const inputDNI = await document.querySelector('#DNINewHC') as HTMLInputElement;
        fireEvent.change(inputDNI, { target: { value: '39575559' } });
        expect(inputDNI.value).toBe('39575559')
    })

    test("Enviar Formulario incompleto", async ()=> {
        render(<NuevaHistoria />)
        const btnSubmit = await document.querySelector('#SubmitNewHC') as HTMLButtonElement;
        fireEvent.click(btnSubmit);

        const message = await document.querySelector('#messageNewHC') as HTMLElement;
        expect(message).toBeInTheDocument();
        //queria hacer una funcion que envie el formulario y tomara una respuesta pero esta a medias
    })
    
    })