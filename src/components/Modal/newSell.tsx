
export default function NewSell(){
    return(
        <div>
            <form className="flex flex-col justify-center items-center w-4/5 m-auto">
                <p className="text-vet-purple text-[1.2rem]">Agregar Venta</p>
                <input className="border-b-2 border-vet-purple-light m-1" type="number" placeholder="ID"/>  
                <textarea className="border-b-2 border-vet-purple-light w-full m-1" placeholder="Descripcion"/>
                <div className="flex ">
                    <input className="border-b-2 border-vet-purple-light m-1 w-1/2" type="number" placeholder="Cantidad"/>
                    <input className="border-b-2 border-vet-purple-light m-1 w-1/2" type="number" placeholder="Precio Unitario" />
                </div>
                <button className="my-3 duration-300 text-base px-6 h-8 border border-vet-purple text-neutral-50 bg-vet-purple rounded-lg hover:text-vet-purple hover:bg-neutral-50 ">CARGAR</button>
            </form>
        </div>
    )
}