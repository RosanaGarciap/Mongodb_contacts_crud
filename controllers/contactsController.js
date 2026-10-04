const mongoose = require('mongoose');

//Schema with required information fields

const contactSchema = new mongoose.Schema({
    firstName:{
        type:String, 
        required: true
    },
    lastName:{
        type:String, 
        required: true
    },
    email: {type: String, 
        required: true
    },
    favoriteColor: {
        type: String
    },   
    birthday: {
        type: String
    }
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema,'contacts');

//GET: Request all contacts or one by ID
exports.getContacts = async (req, res) => {
    try {
        //if URL contains id parameter then
        if (req.query.id) {
            const contact = await Contact.findById(req.query.id);
            if (!contact) {
                return res.status(404).json({error: 'The contact doesn\'t exist'});
            }
            return res.status(200).json(contact);
        }

        // If there is no id returns the whole list
        const contacts = await Contact.find();
        return res.status(200).json(contacts);
    } catch (error) {
        //Internal server error
        res.status(500).json({error: error.message});
    }
}

//POST: Create NEW CONTACT

exports.createContact = async (req,res) => {
    try {
        const newContact = new Contact({
            firstName: req.body.firstName,
            lastName:req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        });
        const savedContact = await newContact.save();

        // returns ID and code 201 for new record added
        return res.status(201).json({id:savedContact._id});
    } catch (error){
       return res.status(400).json({error: error.message});
    }
}

//PUT: UPDATE CONTACT
exports.updateContact = async (req,res) => {
    try {
        const contactId = req.params.id;
        const updateData = {
            firstName: req.body.firstName,
            lastName:req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const result = await Contact.findByIdAndUpdate(contactId, updateData);
        if (!result) {
            return res.status(404).json({error: 'Contact not found'});
        }

        //Return status 204
        return res.status(204).send();
    } catch (error){
       return res.status(400).json({error: error.message});
    }
};

//DELETE: Delete a contact with ID
exports.deleteContact = async (req,res)=>{
    try {
       const contactId = req.params.id;
       const result = await Contact.findByIdAndDelete(contactId);
       
       if (!result) {
        return res.status(404).json({error: "Contact not found"})
       }
    return res.status(200).json({error: "Contact deleted successfully"})

    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}