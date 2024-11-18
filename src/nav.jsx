import "./App.css"
import logo from "./assets/logo.png"
export default function Nav(){
    return (
        <nav>
            <img src={logo} alt="logo" className="nav--logo"/>
            <div className="nav--logo-text">Meme Generator</div>
        </nav>
    )
}