const admin      = require('firebase-admin');
const moment     = require('moment-timezone');
const bcrypt     = require('bcrypt');
const nodemailer = require('nodemailer');

const db     = admin.firestore();
const auth   = admin.auth();
const now    = moment().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");

const { success_OK, success_created, server_error_internal, client_error_not_allowed } = require('../../helpers/responsers');

exports.register = body => {
  const REGISTER = async items => {
    let emailChecking = await db.collection('users').where('email', '==', items.email).get()
      .then(result => {
        if(result.empty) {
          return false
        } else {
          return true
        }
      })

    let promise = await new Promise(function(resolve, reject) {
      switch (true) {
        case emailChecking: reject(client_error_not_allowed(`Email ${items.email} has already taken by other user.`))
          break;
        case !items.firstname: reject(server_error_internal('Register failed, firstname cannot be empty.'))
          break;
        case !items.lastname: reject(server_error_internal('Register failed, lastname cannot be empty.'))
          break;
        case !items.email: reject(server_error_internal('Register failed, email cannot be empty.'))
          break;
        case !items.password: reject(server_error_internal('Register failed, password cannot be empty.'))
          break;
        default: 
          resolve(items);
          sendEmailNotification(items.email)
      }
    })

    return promise
  }

  const setupData = payload => {
    let hashingPassword = bcrypt.hashSync(payload.password, 10)

    let dataPayload = {
      firstname: payload.firstname,
      lastname: payload.lastname,
      email: payload.email,
      gender: payload.gender,
      avatar: !payload.avatar ? null : payload.avatar,
      device_info: !payload.device_info ? null : payload.device_info,
      password: hashingPassword,
      is_verified: false,
      is_active: true,
      phone: null,
      bod: null,
      authentication_uid: null,
      created_at: now,
      updated_at: now
    }

    return dataPayload
  }

  const sendEmailNotification = async email => {
    let transporter = await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.email,
        pass: process.env.pass
      }
    })

    let mailInfo = await {
      from: `"Paperflix Technology" <${process.env.email}>`,
      to: email,
      subject: 'Welcome to Paperflix',
      text: 'Hi, nice to meet you. Please click link below to verify your Paperflix account. Thank you!'
    }

    transporter.sendMail(mailInfo, (error, info) => {
      if(error) {
        console.log(`Failed to send email confirmation: ${error}`)
        return
      } else {
        console.log(`Success to send email. ${info}`)
        return
      }
    })
  }

  const makeAuthentication = async (payload) => {
    let authenticated = await auth.createUser({
      email: payload.email,
      password: payload.password
    })

    return authenticated
  }

  const storeDatatoDB = async (data, payload) => {
    data.authentication_uid = payload
    let dataFinal = data
    let userStored = await db.collection('users').add(dataFinal)

    return userStored
  }

  return REGISTER(body).then(response => {
    let data = setupData(response)
    return data
  })
  .then(response => {
    let authUID = makeAuthentication(response).then(record => record.uid)
    return authUID
  })
  .then(response => {
    let data = setupData(body)
    let userID = storeDatatoDB(data, response).then(record => record.id)
    return userID
  })
  .then(response => {
    let dataPresentation = { id: response }
    return success_created(
      `Success create Paperflix account. Please open your email to confirmation your account.`, 
      dataPresentation
    )
  })
  .catch(error => {
    return error
  })
}