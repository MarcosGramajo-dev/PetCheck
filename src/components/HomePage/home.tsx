import Info from './info'
import Search from './search'
import ConteinerCard  from './conteinerCard'
import Footer from './footer'

export default function home(){
    return(
        <div>
            <Info/>
            <Search/>
            <ConteinerCard/>
            <Footer/>
        </div>
    )
}