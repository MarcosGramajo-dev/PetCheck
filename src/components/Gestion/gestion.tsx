import {useState} from 'react'
import ArrowDown from '../../images/icons/arrow_down.svg'
import Modal from '../Modal/modal'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import RowTable from './rowTable';
import { useLoginState } from '../Context/Context';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: '',
    },
  },
};

const labels = ['Lunes', 'Martes', 'Miercos', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Ventas($)',
      data: [25000, 35000, 12000, 18000, 14500, 32000, 0],
      borderColor: '#6C74BB',
      backgroundColor: '#6C74BB',
    },
    // {
    //     label: 'N° de Ventas',
    //     data: [8, 12, 5, 7, 5, 10, 0],
    //     borderColor: '#8842CF',
    //     backgroundColor: '#8842CF',
    //   },
  ],
};

export default function gestion(){
const [toggleExpand, setToggleExpand] = useState('')


const login = useLoginState();

    return(
        <div className="mt-20">
            <div onClick={() => { /*toggleExpand === 'expand' ? setToggleExpand('contract') : setToggleExpand('expand')*/ }} className={toggleExpand + " " + "border-4 border-vet-purple-light w-11/12 m-auto bg-white/80 flex-col justify-start items-center rounded-lg my-5 cursor-pointer h-auto"}>
                <div className="flex items-center justify-between px-5">
                    <p className="text-vet-blue pl-3 my-2">Movimiento de los Ultimos 7 Dias</p>
                    {/* <div className="w-10"><img src={ArrowDown} alt="#" /></div> */}
                </div>
                <div>
                    <Line options={options} data={data} />
                </div>
            </div>
            
            <div className="border-4 border-vet-purple-light w-11/12 m-auto bg-white flex-col justify-start items-center rounded-lg my-5 pb-3">
                <div className="flex items-center justify-between px-5">
                    <p className="text-vet-blue pl-3">Venta Diaria</p>
                    <button onClick={()=> login?.authContext.toggleOpen} className="my-2 duration-300 text-xs px-4 h-6 border border-vet-purple text-vet-purple rounded-lg bg-white hover:text-neutral-50 hover:bg-vet-purple"> Agregar Venta </button>
                </div>
                <div className=" overflow-x-auto px-3">
                    <table className="w-11/12 m-auto min-w-[32rem]">
                        <thead>
                            <tr className=" text-xs text-vet-purple border-b-2 text-center">
                                <th>ID</th>
                                <th>DESCRIPCION</th>
                                <th>CANT</th>
                                <th>PRECIOxU</th>
                                <th>TOTAL</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <RowTable/>
                            <RowTable/>
                            <RowTable/>
                            <RowTable/>
                            <RowTable/>
                        </tbody>


                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="border-2 text-center" colSpan={2}>TOTAL($) $8500</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <Modal modalType={"newSell"}/>
        </div>
    )
}