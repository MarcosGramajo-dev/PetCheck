
export default function info(){
    return(
        <div className="relative mt-4 max-sm:mt-20" id="info" data-testid="custom-element">
            <div className=" max-sm:text-center sm:ml-8 info">
                <h1 className="info max-sm:m-auto text-4xl w-1/2 text-vet-blue font-semibold z-0 max-sm:w-[80%]"> Lleva tu servicio a otro nivel. </h1>
                <p className="max-sm:m-auto mt-5 w-[50%] text-base text-slate-500 font-semibold max-sm:w-[80%]"> Registra tu veterinaria y permiti que miles de usuarios puedan acceder a conocer tus servicio </p>
                <label htmlFor="test"  >Text</label>
                <input name="test" id="test" className="my-1 w-60 px-2 border-b-4 border-t-2 border-vet-purple-light rounded-md" type="number"/>
            </div>
        </div>
    )
}