import Close from '../../images/icons/close.svg'

export default function Login(){
    return(
    <div className="relative">
        <div className="absolute right-[-1.2rem] top-[-1.7rem] w-10 h-10 p-2 rounded-full bg-vet-purple-light"> <img src={Close} alt="#" /> </div>
        <form className="flex flex-col justify-center items-center py-3">
          <p className=" text-xl pb-2">Iniciar Sesion</p>
          <div className="relative w-60 object-cover my-2">
            <input className="my-1 w-60 px-2 border-b-4 border-t-2 border-vet-purple-light rounded-md" type="text" placeholder='Usuario'/>
          </div>
          <div className="relative w-60 object-cover my-2">
            <input className="my-1 w-60 px-2 border-b-4 border-t-2 border-vet-purple-light rounded-md"  type="password" placeholder='Password'/>
          </div>
          <button className="my-2 w-32 px-4 h-8 border bg-white border-vet-purple text-vet-purple rounded-lg hover:text-white hover:bg-vet-purple hover:border-white text-sm">Iniciar Sesion</button>
          <a href="#" className="text-vet-purple-dark text-xs my-2">¿No tiene Cuenta?. Registrate Aquí</a>
        </form>
      </div>
    )
}