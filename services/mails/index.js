const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  SENDER_EMAIL,
} = process.env;

const oauth2Client = new OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);

const sendEmail = (to, url, text) => {
  oauth2Client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN,
  });

  const accessToken = oauth2Client.getAccessToken();

  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_EMAIL,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: GOOGLE_REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailTemplate = {
    from: SENDER_EMAIL,
    to,
    subject: "Blog IT Email Verification",
    html: `
    <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the BlogIT.</h2>
            
            <p>Congratulations! You're almost set to start using BlogIT.
                Just click the button below to validate your email address.
            </p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${text}</a>
    </div>
    `,
  };

  smtpTransport.sendMail(mailTemplate, (err, info) => {
    if (err) return err;
    return info;
  });
};

module.exports = sendEmail;
