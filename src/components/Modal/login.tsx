import Close from '../../images/icons/close.svg'
import { Link } from 'react-router-dom'

interface IProps {
  toggleOpen(): void;
  toggleLogin(): void;
}

export default function Login(props: IProps) {
  return (
    <div className="relative">
      <form className="flex flex-col justify-center items-center py-3">
        <p className=" text-xl pb-2">Iniciar Sesion</p>
        <div className="relative w-60 object-cover my-2">
          <input className="my-1 w-60 px-2 border-b-4 border-t-2 border-vet-purple-light rounded-md" type="text" placeholder='Usuario' />
        </div>
        <div className="relative w-60 object-cover my-2">
          <input className="my-1 w-60 px-2 border-b-4 border-t-2 border-vet-purple-light rounded-md" type="password" placeholder='Password' />
        </div>
        <button onClick={(event)=> {event.preventDefault(); props.toggleOpen(); props.toggleLogin()}} className="my-2 w-32 px-4 h-8 border bg-white border-vet-purple text-vet-purple rounded-lg hover:text-white hover:bg-vet-purple hover:border-white text-sm">Iniciar Sesion</button>
        <Link to="register" className="text-vet-purple-dark text-xs my-2"> ¿No tiene Cuenta?. Registrate Aquí</Link>
      </form>
    </div>
  )
}