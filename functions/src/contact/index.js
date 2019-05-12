const functions = require('firebase-functions')
const nodemailer = require('nodemailer')
const cors = require('cors')({
  origin: true
})

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: functions.config().gmail.email,
    pass: functions.config().gmail.password
  }
})

const contact = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    const { email, message, name } = request.body
    const mailOptions = {
      from: 'noreply@mjinkens.com',
      to: 'matthew.jinkens@gmail.com',
      subject: 'Message from ' + name + ' on mjinkens.com',
      text: 'Sender: ' + email + '\n\n' + message
    }

    transporter.sendMail(mailOptions, error => {
      if (error) {
        throw error
      }

      response.status(200).send('Success!')
    })
  })
})

module.exports = contact
