const nodeMailer = require('nodemailer');
const mailConfig = require('../../app/config/mail.config');
require('dotenv/config');

exports.sendMailRegister = (user, subject, hashedEmail) => {
    const transport = nodeMailer.createTransport({
        host: mailConfig.HOST,
        port: mailConfig.PORT,
        secure: false,
        auth: {
            user: mailConfig.USERNAME,
            pass: mailConfig.PASSWORD,
        },
        tls: { rejectUnauthorized: false },
    })

    const options = {
        from: mailConfig.FROM_ADDRESS, // từ email mình
        to: user.email, // gửi tới email nào
        subject: subject,
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Please activate your account</title>
  <!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
</head>

<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
  <table role="presentation"
    style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
    <tbody>
      <tr>
        <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
          <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
            <tbody>
              <tr>
                <td style="padding: 40px 0px 0px;">
                  <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                    <div style="color: rgb(0, 0, 0); text-align: center;">
                      <h1 style="margin: 1rem 0">Xác minh Email</h1>
                      <p style="padding-bottom: 16px">Ấn vào nút "Xác minh" bên dưới để xác minh email của bạn</p>
                      <p style="padding-bottom: 16px"><a href="${process.env.APP_URL}/verify?email=${user.email}&token=${hashedEmail}" target="_blank"
                          style="text-decoration: none; padding: 12px 24px; border-radius: 4px; color: #FFF; background: #2B52F5;display: inline-block;margin: 0.5rem 0;">Xác
                          minh</a></p>
                      <p style="padding-bottom: 16px">Nếu bạn không yêu cầu xác minh thì bạn có thể bỏ qua email này.</p>
                      <p style="padding-bottom: 16px">Thanks,<br>Group 6</p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>

</html>`
    }
    return transport.sendMail(options);
}

exports.sendMailForgotPass = (user, subject, hashedEmail) => {
    const transport = nodeMailer.createTransport({
        host: mailConfig.HOST,
        port: mailConfig.PORT,
        secure: false,
        auth: {
            user: mailConfig.USERNAME,
            pass: mailConfig.PASSWORD,
        },
        tls: { rejectUnauthorized: false },
    })

    const options = {
        from: mailConfig.FROM_ADDRESS, // từ email mình
        to: user.email, // gửi tới email nào
        subject: subject,
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Please activate your account</title>
  <!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
</head>

<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
  <table role="presentation"
    style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
    <tbody>
      <tr>
        <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
          <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
            <tbody>
              <tr>
                <td style="padding: 40px 0px 0px;">
                  <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                    <div style="color: rgb(0, 0, 0); text-align: center;">
                      <h1 style="margin: 1rem 0">Đổi mật khẩu</h1>
                      <p style="padding-bottom: 16px">Ấn vào nút "Xác nhận đổi mật khẩu" bên dưới để tiến hành thay đổi mật khẩu của bạn</p>
                      <p style="padding-bottom: 16px"><a href="${process.env.APP_URL}/forgot/${user.email}?token=${hashedEmail}"" target="_blank"
                          style="text-decoration: none; padding: 12px 24px; border-radius: 4px; color: #FFF; background: #2B52F5;display: inline-block;margin: 0.5rem 0;">Xác
                          nhận đổi mật khẩu</a></p>
                      <p style="padding-bottom: 16px">Nếu bạn không yêu cầu đổi mật khẩu thì bạn có thể bỏ qua email này.</p>
                      <p style="padding-bottom: 16px">Thanks,<br>Group 6</p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>

</html>`
    }
    return transport.sendMail(options);
}