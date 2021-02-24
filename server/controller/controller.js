var Userdb = require('../model/model');

// create and save new user
exports.create = (req,res) => {
    // validate request
    if (!req.body){
        res.status(400).send({message: 'Content cannot be empty.'});
        return;
    }

    // new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    // save user to the database
    user
        .save(user)
        .then(data=>{
            //res.send(data)
            res.redirect('/add-user');
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || 'An error has occured while adding user to the database.'
            })
        })
}

// retrieve and return all users/ retrieve and return single user
exports.find = (req,res) => {
    if (req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
            .then(data=>{
                if (!data){
                    res.status(404).send({message: `User with id ${id} not found`});
                }
                else{
                    res.send(data);
                }
            })
            .catch(err=>{
                res.status(500).send({message: `An error occured retrieving user data`});
            })
    }
    else{
        Userdb.find()
            .then(user=>{
                res.send(user)
            })
            .catch(err=>{
                res.status(500).send({message: err.message || 'Error occured while retrieving user information'})
            })
    }
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        console.log('this');
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
                console.log('here')
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

// delete user by id
exports.delete = (req,res) => {
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
        .then(data=>{
            if (!data){
                res.status(404).send({message: `Cannot delete user with id ${id}`})
            }
            else{
                res.send({message: 'User deleted successfully'})
            }
        })
        .catch(err=>{
            res.status(500).send({message: 'Error deleting user'})
        })
}