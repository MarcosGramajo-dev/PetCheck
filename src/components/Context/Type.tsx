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
        Registro: [{}],
        DataPet: {},
        ownerPet: {},
        id: number
}

export type loginContext = {
    login: Boolean, 
    changeState: () => void,
    user: UserVet,
}
// setUser: React.Dispatch<React.SetStateAction<UserVet>>
