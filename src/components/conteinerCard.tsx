import Card from './card'

export default function ContainerTarjet(){
    return(
        <div className="mt-8">
            <div>
                <p className="text-vet-blue font-semibold text-center text-2xl max-sm:text-lg">VETERINARIAS EN SAN MIGUEL DE TUCUMAN</p>
            </div>
            <div className="my-10 flex flex-wrap justify-around">
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </div>
    )
}