import { render } from 'ejs';
import db from '../models/index';
import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res) => {
    try { 
        let data = await db.User.findAll();
        return res.render("homepage.ejs", {
            data:JSON.stringify(data),
        })

    }
    catch(e) {
        console.log(e)
    }
}

let getAboutPage = (req, res) => {
    return res.render("test/about.ejs")
}

let getCRUD = (req, res) => {
    return res.render("crud.ejs")
   
}
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send("hiiiiiiiiiii")
   
}
let displayGetCRUD = async(req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('displayCRUD.ejs', {
        dataTable:data
    })
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
 
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);


        return res.render('editCRUD.ejs', {
            user:userData
        });
        
    }
    else {
        return res.send('ko tim thay');
    }
}

let putCRUD = async (req , res) => {
    let data = req.body;
    let allUsers =await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable:allUsers
    })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('Delete user succeed!')
    }
 
    else {
        return res.send('ko thay');
        
    }
}
    
module.exports = {
    getHomePage,
    getAboutPage,
    getCRUD,
    postCRUD,
    displayGetCRUD,
    getEditCRUD,
    putCRUD,
    deleteCRUD,
}