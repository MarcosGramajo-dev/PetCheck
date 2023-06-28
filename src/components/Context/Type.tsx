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
    Vacunas: [{
      Certification: number,
      DataVacuna: string,
      Vacuna: string,
      fecha: string,
      nameAndMatricule: string
    }],
    Registros: [{
      Info: string,
      Registro: string,
      fecha: string
    }],
    DataPet: {
        image: string,
        NombreMascota: string,
        Especie: string,
        Sexo: string,
        Nchip: number,
        Pedigree: number,
        Date: string,
        detalles: string
    },
    ownerPet: {
        NombreDueño: string,
        DNI: number,
        Telefono: number,
        Direccion: string,
        province: string,
        departament: string
    },
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
        addToken: (newToken:string) => void,
        toggleLogin: (bool: boolean) => void,
        toggleOpen: () => void,
        isOpen: boolean,
        showModal: boolean,
        isLogin: boolean,
        addHC: (history: History) => void,
        HC: History
    }
}
export type dataOwnerPet = {
    NombreDueño: string,
    DNI: number,
    Telefono: number,
    Direccion: string,
    province: string,
    departament: string
    }

export type dataPet = {
    image: string;
    NombreMascota: string;
    Especie: string;
    Sexo: string;
    Nchip: number;
    Pedigree: number;
    Date: string;
    detalles: string;
}

export type Vacunas = [{
    Certification: number,
    DataVacuna: string,
    Vacuna: string,
    fecha: string,
    nameAndMatricule: string
  }]

export type Registros = [{
    Info: string,
    Registro: string,
    fecha: string
  }]
// setUser: React.Dispatch<React.SetStateAction<UserVet>>
