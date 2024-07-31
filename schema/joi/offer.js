const Joi = require("joi");

//patterns
const objectIdPattern = /^[0-9a-fA-F]{24}$/;
const contactNumberPattern = /^\d{10}$/;
const countryCodePattern = /^\+\d{1,4}$/;


//schema
const offerValidationSchema = Joi.object({

    role : Joi.string().required(),

    offer_link : Joi.string().required(),

    location : Joi.array().items(Joi.string().required()).required(),

    total_opening : Joi.number().required(),

    drive :Joi.string().required(),

    type : Joi.string().required(),

    sector : Joi.string().required(),
    
    salary : Joi.object({
        min: Joi.number().required(),  // Minimum salary, required field
        max: Joi.number().default(null)   // Maximum salary, required field
    }).default(),

    criteria : Joi.object().default({}),

    last_date : Joi.date().greater('now').required(),

    interview_date : Joi.date().greater('now').required(),

    contacted_person : Joi.object({
        name: Joi.string().required(),         
        designation: Joi.string().required(),  
        email: Joi.string().email().required(), 
        contact_no: Joi.object({
            country_code: Joi.string().pattern(countryCodePattern).default("+91"), 
            number: Joi.string().pattern(contactNumberPattern).required() 
        }).required() 
    }).required(),
   
    company: Joi.string().pattern(objectIdPattern).required()
                .messages({'string.pattern.base': 'Invalid company ID format.'}), 

    applicants: Joi.array().items(Joi.string().pattern(objectIdPattern))
                    .messages({'string.pattern.base': 'Invalid applicant ID format.'}), 

    selected: Joi.array().items(Joi.string().pattern(objectIdPattern))
                 .messages({'string.pattern.base': 'Invalid selected ID format.'}) 

});

module.exports = offerValidationSchema;