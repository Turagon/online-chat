function emailVerify(email) {
  const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
  return emailRule.test(email) ? true : false
}

function passwordVerify(password) {
  const number = '0123456789'
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const pass = password.split("")
  const numberCheck = pass.filter(item => number.includes(item))
  const lowerCaseCheck = pass.filter(item => lowerCase.includes(item))
  const upperCaseCheck = pass.filter(item => upperCase.includes(item))
  if (numberCheck.length && lowerCaseCheck.length && upperCaseCheck.length && password.length >= 6 && password.length <= 12) {
    return true
  } else {
    return false
  }
}

function dataVerifyResult (req, res) {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password
  const password2 = req.body.password2
  const errors = []
  if (!emailVerify(email)) {
    errors.push({ msg: 'The email format is invalid' })
  }

  if (!passwordVerify(password)) {
    errors.push({ msg: 'The format or length of password is invalid' })
  }

  if (password !== password2) {
    errors.push({ msg: 'The passwords do not match each other' })
  }

  if (errors.length) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  }
}

module.exports = dataVerifyResult 