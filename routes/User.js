const router = require('express').Router()
const UserModel = require('../models/UserModel')
const MailModel = require('../models/EmailModel')

router.post('/user',
  async (req, res) => {
    try{
      const newUser = ({email} = req.body)
      const createUser = await UserModel.create(newUser)
      if(!createUser){
        return res.status(404).json({
          msg: 'Cannot find user',
          result: false
        })
      }
      else{
        return res.status(200).json({
          msg: 'Successfully created user',
          result: true,
          data: createUser
        })
      }
    }
    catch(err){
      console.log(err)
      return res.status(500).json({
        msg: 'Server Error',
        result: false
      })
    }
  }
)

router.get('/user/sentMails', 
  async(req, res) => {
    try{
      const {user} = req.body
      const mails = await MailModel.find({from: user})
      if(!mails || mails.length <= 0){
        return res.status(404).json({
          msg: 'No mails found',
          result: false
        })
      }
      else{
        return res.status(200).json({
          msg: 'Successfully retrived mails',
          result: true,
          data: mails
        })
      }
    }
    catch(err){
      console.log(err)
      return res.status(500).json({
        msg: 'Server error',
        result: false
      })
    }
  }
)

router.get('/user/recievedMails', 
  async(req, res) => {
    try{
      const {user} = req.body
      const mails = await MailModel.find({to: user}).sort({'createdAt': -1})
      if(!mails || mails.length <= 0){
        return res.status(404).json({
          msg: 'No mails found',
          result: false
        })
      }
      else{
        return res.status(200).json({
          msg: 'Successfully retrived mails',
          result: true,
          data: mails
        })
      }
    }
    catch(err){
      console.log(err)
      return res.status(500).json({
        msg: 'Server error',
        result: false
      })
    }
  }
)

module.exports = router