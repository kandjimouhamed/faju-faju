const twilio = require("twilio")
// const dotenv = require()


const sendSms = async (req, res) => {
  const {recipent, textMessage } = req.body;

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = new twilio(accountSid, authToken);

   client.messages
    .create({
      body: textMessage,
      from: process.env.PHONE_NUMBER,
      to: recipent,
    })
    .then((message) => console.log(message.body))
    .catch((err) => console.log(err))

    return res.json('message send')
};

module.exports = sendSms;
