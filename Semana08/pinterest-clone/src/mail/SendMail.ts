import nodemailer from "nodemailer";


async function SendMail(email: string, password: string) {
    
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, 
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'IFinterest <contact@ifinterest.com>', // sender address
        to: email, // list of receivers
        subject: "Bem-vindo ao IFinterest", // Subject line
        html: `<b>${password}</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

export { SendMail }