import DeleteIcon from '../../images/icons/delete.svg'
import EditIcon from '../../images/icons/edit.svg'

export default function rowTable(){
    return(
        <tr className="border-b-2 text-center text-xs">
            <td>32</td>
            <td className=" max-w-sm overflow-x-auto text-left pl-1" >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam qui delectus eos ad sequi eum nemo.</td>
            <td>1</td>
            <td>$300</td>
            <td>$300</td>
            <td className="flex justify-center items-center h-full"> <img className="w-4 min-w-[16px] cursor-pointer" src={EditIcon} alt="#" /> <img className="w-4 min-w-[16px] cursor-pointer" src={DeleteIcon} alt="#" /> </td>
        </tr>
    )
}