const fs = require('fs');
const os = require('os');

let read_values = 'I fell out of a coconut tree :3.';


fs.readFile('sample.txt','utf-8',(err,data) =>{
    if(err)
        {
            console.error("Error", err);   
        }
    else
    {
        console.log("Data read: ",data);
        read_values = data;
    }
})

fs.writeFile('output.txt',read_values,(err) => {
    if(err)
        {
            console.error("Error", err);   
        }
    else
    {
        console.log("Succesfully printed data.")
    }
})

console.log("Platform: " + os.platform());
console.log("Hostname: " + os.hostname());
console.log("CPUs: " + os.cpus());