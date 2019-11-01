const admin  = require('firebase-admin');
const moment = require('moment-timezone');
const bcrypt = require('bcrypt');

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
}