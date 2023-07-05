import githubIcon from '../../images/Github.svg'
import filetext from '../../images/FileText.svg'
import unsta from '../../images/unsta.svg'

export default function Footer(){

    return(
        <div className="w-full bg-[#818181] text-white py-5">
            <div className="flex flex-wrap w-full justify-center items-start px-6 max-[1000px]:flex-col">
                
                <div className="w-4/12 max-[1000px]:w-full">
                    <p>Alumnos:</p>
                    <ul>
                        <li>
                            <p className="pl-5">Cerviño Bernabe   - Desarrollador BackEnd</p>
                        </li>
                        <li>
                            <p className="pl-5">Gramajo Marcos    - Scrum Master - Desarrollador FrontEnd</p>
                        </li>
                        <li>
                            <p className="pl-5">Murua Lourdes     - Tester Automation</p>
                        </li>
                    </ul>
                    <div className="flex">
                        <a href="/"><img className="w-[30] h-[30] p-3" src={githubIcon} alt="github"/></a>
                        <a href="/"><img className="w-[30] h-[30] p-3" src={filetext} alt="file"/></a>
                    </div>
                </div>
                <div className="flex w-8/12 max-[1000px]:w-full max-[600px]:flex-col">
                    <div className="w-6/12 max-[1000px]:w-full pl-8">
                        <p>Materia:</p>
                        <p className="pl-5">Proyecto Final</p>
                        <p>Profesor:</p>
                        <p className="pl-5">Ing. Copas Elios</p>
                    </div>
                    <div className="w-6/12 flex justify-end max-[1000px]:w-full max-[600px]:justify-center">
                        <img className="w-[300px] h-[100px] min-w-[300px]" src={unsta} alt="unsta"/>
                    </div>
                </div>
            </div>
        </div>
    )
}