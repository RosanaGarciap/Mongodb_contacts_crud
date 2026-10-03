const mongoose = require('mongoose');

//Schema with required information fields

const contactSchema = new mongoose.Schema({
    firstName:{
        type:String, required: true},
    lastName:{
        type:String, required: true},
    email: {type: String, required: true},
    favoriteColor: {type: String},   
    birthday: {type: String}
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema,'contacts');

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