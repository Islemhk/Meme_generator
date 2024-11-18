import { useState, useEffect } from "react"
import "./App.css"
//import meme_img from "./assets/static-assets-upload16516727709672546872.webp"
import meme_data from "./Meme_Data"
export default function Main() {




    const [allMemes, setAllMemes] = useState([])
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then((data) => setAllMemes(data.data.memes))
            .catch((error) => console.error("Error fetching memes:", error));
    }, [])

    const [url_img, setUrlImg] = useState(
        {
            topText: "",
            bottomText: "",
            randomImage: "https://i.imgflip.com/30b1gx.jpg",
            isTop: "top"
        })
        const [topTextStyling, setTopTextStyling] = useState({
            topMargin: 10,
            bottomMargin: 10,
            leftMargin: 10,
            rightMargin: 10,
            color: "#fff"
        });
        
        const [bottomTextStyling, setBottomTextStyling] = useState({
            topMargin: 10,
            bottomMargin: 10,
            leftMargin: 10,
            rightMargin: 10,
            color: "#fff"
        });
    console.log(topTextStyling)

    let top_or_left = url_img.isTop == "top"
        ? topTextStyling
        : bottomTextStyling



    let topTextStyles = {
        marginTop: `${topTextStyling.topMargin}px`,
        marginRight: `${topTextStyling.rightMargin}px`,
        marginBottom: `${topTextStyling.bottomMargin}px`,
        marginLeft: `${topTextStyling.leftMargin}px`,
        color: topTextStyling.color
    };
    console.log("topTextStyles",topTextStyles)
    let bottomTextStyles = {
        marginTop: `${bottomTextStyling.topMargin}px`,
        marginRight: `${bottomTextStyling.rightMargin}px`,
        marginBottom: `${bottomTextStyling.bottomMargin}px`,
        marginLeft: `${bottomTextStyling.leftMargin}px`,
        color: bottomTextStyling.color
    };


    function getMemeImg() {
        if (allMemes.length === 0) return;
        const random_nb = Math.floor(Math.random() * allMemes.length)
        setUrlImg(prv => ({ ...prv, randomImage: allMemes[random_nb].url }))
    }
    function clickHandler(event) {
        const { name, value } = event.target
        setUrlImg(prv => {
            return {
                ...prv,
                [name]: value
            }
        })
    }
    function submitHandler(event) {
        event.preventDefault()
    }
    function handleStyle(event) {
        let { name, value } = event.target
        value = name.includes('margin') ? parseInt(value) : value;
        let direction = url_img.isTop == "top" ? setTopTextStyling : setBottomTextStyling
        direction(prv => {
            return {
                ...prv,
                [name]: value
            }
        })
    }
    return (
        <form className="form" onSubmit={submitHandler}>

            <div className="grid-cols-2">
                <div className="">
                    <label htmlFor="Top_text" >Top text</label>
                    <input name="topText" type="text" placeholder="Shut up" id="Top_text" onChange={clickHandler} />
                </div>
                <div className="">
                    <label htmlFor="bottom_text">Bottom text</label>
                    <input name="bottomText" type="text" id="bottom_text" placeholder="And take my money" onChange={clickHandler} /><br />
                </div>
            </div>

            <div className="Stylegrid">

                <div className="box 1">
                    <label htmlFor="top_margin">Top margin</label>
                    <input name="marginTop" type="number" id="top_margin" placeholder="0px" onChange={handleStyle} />
                </div>
                <div className="box 2">
                    <label htmlFor="bottom_margin">bottom margin</label>
                    <input name="marginBottom" type="number" id="bottom_margin" placeholder="0px" onChange={handleStyle} />
                </div>
                <div className="box 3">
                    <label htmlFor="left_margin">left margin</label>
                    <input name="marginLeft" type="number" id="left_margin" placeholder="0px" onChange={handleStyle} />
                </div>
                <div className="box 4">
                    <label htmlFor="right_margin">right margin</label>
                    <input name="marginRight" type="number" id="right_margin" placeholder="0px" onChange={handleStyle} />
                </div>
                <div className="box 5">
                    <label htmlFor="color">color</label>
                    <input name="color" type="color" id="color" onChange={handleStyle} />
                </div>
                <div className="box 6">
                    <label htmlFor="rightOrLeft">right or left</label>
                    <select name="isTop" id="rightOrLeft" value={url_img.isTop} onChange={clickHandler}>
                        <option value=""></option>
                        <option value="top">Top</option>
                        <option value="bottom">Bottom</option>
                    </select>
                </div>

            </div>


            <button id="submit" onClick={getMemeImg}>Create new image ✨</button>

            <div className="memeContainer">
                <img src={url_img.randomImage} alt="" id="meme_imge" name="memeImg" />
                <p className="meme--topText" style={topTextStyles}>{url_img.topText}</p>
                <p className="meme--bottomText" style={bottomTextStyles}>{url_img.bottomText}</p>
            </div>
        </form>
    )
}