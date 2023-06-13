export type UserVet = {
    email: string,
    password: string,
    vet: {
        image: string,
        nameLocal: string ,
        ownerVet: string,
        service: { value: string, isChecked: boolean}[],
        numMatricula: number,
        province: string,
        departament: string,
        address: string,
        tel: number,
        telWp: number,
        web: string,
        instagram: string,
        facebook: string,
        tiktok: string
    }
}

export type History = {
        Vacunas: [{}],
        Registros: [{}],
        DataPet: {},
        ownerPet: {},
        id: number
}

export type loginContext = {
    changeState: () => void,
    login: Boolean, 
    user: UserVet,
    authContext: {
        changeState: () => void,
        login: boolean,
        user: UserVet,
        saveInLocalStorage: (dataUser: UserVet) => void,
        token: string,
        URL: string,
        addToken: (snewToken:string) => void,
        toggleLogin: (bool: boolean) => void,
        toggleOpen: () => void,
        isOpen: boolean,
        showModal: boolean,
        isLogin: boolean
    }
}
// setUser: React.Dispatch<React.SetStateAction<UserVet>>
