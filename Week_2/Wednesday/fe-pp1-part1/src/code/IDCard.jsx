import {MeterConverter} from './utils' 

const IDCard = (props) => {
    return (
        <div>
            <ul>
                <li><p><b>First Name:</b>{props.First_Name}</p></li>
                <li><p><b>Last Name:</b>{props.Last_Name}</p></li>
                <li><p><b>Gender:</b>{props.Gender}</p></li>
                <li><p><b>Height:</b>{MeterConverter(props.Height)} m</p></li>
                <li><p><b>Birth:</b>{props.B_Day.toDateString()}</p></li>
            </ul>
            <img src={props.Picture} alt="Profile Image"/>
        </div>
    )
}

export default IDCard