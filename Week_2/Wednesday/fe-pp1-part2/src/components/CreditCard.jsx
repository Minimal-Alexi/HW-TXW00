
import Visa from "../images/visa.png";
import Master from "../images/master.png";
import './CreditCard.css'

const CreditCard = (props) =>
    {
        var source = "";
        if (props.type == "Visa")
            {
                source = Visa;
            }
        else
        {
            source = Master;
        }
        return(
            <div class = "CreditCard" style={{ backgroundColor: props.bgColor, color: props.color }}>
                <img src = {source}/>
                <p class= "number">**** **** **** {props.number.slice(-4)}</p>
                <p> Expires in {props.expirationMonth}/{props.expirationYear%100} {props.bank}<br/> {props.owner}</p>
            </div>
        )
    }

export default CreditCard