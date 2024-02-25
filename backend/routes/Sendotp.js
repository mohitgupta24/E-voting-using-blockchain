// SendinBlue API****************************************

var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;

const Sendotp = (otp, email) => {
  // console.log(otp, email);
  // Configure API key authorization: api-key
  var apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.SIBAPIKEY;
  var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const sender = {
    email: process.env.USER,
    name: process.env.COMPANY,
  }
  const receivers = [
    {
      email: email,
    },
  ]
  // console.log(email);
  apiInstance.sendTransacEmail({
    sender,
    to: receivers,
    subject: 'Verify Your OTP',
    textContent: `
    Cules Coding will teach you how to become {{params.role}} a developer.
    `,
    htmlContent: `<p>Your OTP(One Time Password) is: ${otp}</p>
                  <p>Do not share with Anyone</p>`,
    params: {
      role: 'Frontend',
    },
  })
    .then(console.log)
    .catch((error)=>{console.log(error.message)});
}


module.exports = Sendotp;