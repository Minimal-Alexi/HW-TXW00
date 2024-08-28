import React from 'react'
function Random({min, max}) {
min = Math.ceil(min);
max = Math.floor(max);
let random = Math.floor(Math.random() * (max - min + 1)) + min;
return (
    <div>
        <p>Random value between {min} and {max} = {random}</p>
    </div>
)
}
export default Random