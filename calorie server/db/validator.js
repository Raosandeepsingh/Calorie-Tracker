const { body, validationResult} = require('express-validator')

const userValidationRules = () => {
  return [
    body('name').isLength({min:6}),
    body('Weight').isNumeric(),
    body('Height').isNumeric(),
    body('dob').not(),
    body('username').isLength({min:3}),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({min: 6}),
    body('gender').not().isEmpty().withMessage('Gender is required').isIn(["M", "F"]),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}


async function calculateAge(dob) { // birthday is a date
  console.log(dob)
  let birthdaytoDate = new Date(dob)
  console.log(birthdaytoDate)
  var ageDifMs = Date.now() - birthdaytoDate.getTime();
  // console.warn(ageDifMs);
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  console.log(ageDate)
  return Math.abs(ageDate.getUTCFullYear() - 1970);

}

async function bmrCalculation(age,Weight,Height,gender){
  console.log(age,Weight,Height,gender)
  if(gender == 'M'){
    return  66.4730 + (13.7516 * Weight) + (5.0033 * Height)-(6.7550 * age) 
  }else if(gender == 'F'){
    return   655.0955 + (9.5634 * Weight) + (1.8496 * Height) - (4.6756 * age)  
 }else{
    return "cannot be Calculate"
  }
}


module.exports = {
  userValidationRules,
  validate,
  bmrCalculation,
  calculateAge
}