import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // 只允许POST提交表单
  if (req.method !== 'POST') {
    return res.status(405).json({ tip: '请求方式错误' });
  }

  const { name, email, company, tel, message } = req.body;

  // 邮箱发送配置（推荐用Gmail发送最稳定）
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'deliajy.main@gmail.com',
      pass: '19950211zjy'
    }
  });

  const mailContent = {
    from: '外贸官网询盘 <deliajy.main@gmail.com>',
    to: 'delia@abiglazy.com', // 收到询盘的邮箱
    subject: '新海外客户询盘',
    html: `
      <p>客户姓名：${name}</p>
      <p>客户邮箱：${email}</p>
      <p>公司名称：${company}</p>
      <p>电话：${tel}</p>
      <p>需求详情：${message}</p>
    `
  };

  try {
    await transporter.sendMail(mailContent);
    res.status(200).json({ success: true, msg: 'Inquiry sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: 'Send failed, please try again later' });
  }
}