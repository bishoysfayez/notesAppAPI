import joi from 'joi'

const validationType = ["body", "params", "query","headers"];

 
const validation = (Schema)=>{
    return (req, res, next)=>{
    //console.log(Schema);
    let validationError = [];
    validationType.forEach((key) =>{
        if(Schema[key]){
            // console.log(key);
            let valid = Schema[key].validate(req[key],{abortEarly : false});
           //console.log(req[key]);
            if(valid.error){
                validationError.push(valid.error.details)
            }
        }
    
    });
    if(validationError.length){
        res.json({message : "joi error", validationError })
    } else{
        next();
    }

}
}

export default validation;