const router = require('express').Router()
const EmailModel = require('../models/EmailModel')

router.post('/email',
  async(req, res) => {
    try{
      const newEmail = ({from,to,subject,content} = req.body)
      const createdEmail = await EmailModel.create(newEmail)
      if(!createdEmail) {
        return res.status(404).json({
          msg: 'Cannot create mail',
          result: false
        })
      }
      else{
        return res.status(200).json({
          msg: 'Successfully Created Email',
          result: true,
          data: createdEmail
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