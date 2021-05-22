import "./UnderConstruction.css"
export default function UnderConstruction(){
    return(
        <div className="c-underConstruction">
            <h1>הדף בבניה</h1>
            <img src={process.env.PUBLIC_URL + "/images/under-construction.png"}></img>
            <p>שווה לעקוב</p>
            <p>באפשרותך לחזור ל<a href="#">דף הבית</a></p>
        </div>
    )
}