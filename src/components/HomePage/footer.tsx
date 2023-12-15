import githubIcon from '../../images/Github.svg'
import filetext from '../../images/FileText.svg'
import unsta from '../../images/unsta.svg'

export default function Footer(){

    return(
        <div className="w-full bg-[#818181] text-white py-5">
            <div className="flex flex-wrap justify-center items-start px-6 w-full">
                
                <div className=" w-full md:w-4/12">
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
                <div className="flex w-full flex-col md:w-8/12 md:flex-row">
                    <div className="w-full md:pl-8 md:w-6/12">
                        <p>Materia:</p>
                        <p className="pl-5">Proyecto Final</p>
                        <p>Profesor:</p>
                        <p className="pl-5">Ing. Copas Elios</p>
                    </div>
                    <div className=" flex justify-center w-full py-2 md:justify-center">
                        <img className="w-[300px] h-[100px] min-w-[300px]" src={unsta} alt="unsta"/>
                    </div>
                </div>
            </div>
        </div>
    )
}