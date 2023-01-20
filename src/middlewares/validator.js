const { checkSchema, validationResult } = require('express-validator')

exports.rules = (method) => {
  switch (method) {
    case 'register': {
      return checkSchema({
        firstName: {
          in: ['body'],
          errorMessage: 'First name is required',
          isString: true
        },
        lastName: {
          in: ['body'],
          errorMessage: 'Last name is required',
          isString: true
        },
        phoneNumber: {
          in: ['body'],
          isMobilePhone: {
            errorMessage: 'Phone number is invalid'
          }
        },
        email: {
          in: ['body'],
          isEmail: {
            errorMessage: 'Email is invalid'
          }
        },
        password: {
          in: ['body'],
          isStrongPassword: {
            errorMessage:
              'Password must be at least 6 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one symbol',
            options: {
              minLength: 6,
              minLowercase: 1,
              minUppercase: 1,
              minNumbers: 1,
              minSymbols: 1
            }
          }
        }
      })
    }
    case 'login': {
      return checkSchema({
        email: {
          in: ['body'],
          isEmail: {
            errorMessage: 'Email is invalid'
          }
        },
        password: {
          in: ['body'],
          isStrongPassword: {
            errorMessage:
              'Password must be at least 6 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one symbol',
            options: {
              minLength: 6,
              minLowercase: 1,
              minUppercase: 1,
              minNumbers: 1,
              minSymbols: 1
            }
          }
        }
      })
    }
    case 'forgotPassword': {
      return checkSchema({
        email: {
          in: ['body'],
          isEmail: {
            errorMessage: 'Email is invalid'
          }
        }
      })
    }
    case 'resetPassword': {
      return checkSchema({
        email: {
          in: ['body'],
          isEmail: {
            errorMessage: 'Email is invalid'
          }
        },
        code: {
          in: ['body'],
          isString: true,
          isLength: {
            errorMessage: 'Code must be 5 characters long'
          }
        },
        password: {
          in: ['body'],
          isStrongPassword: {
            errorMessage:
              'Password must be at least 6 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one symbol',
            options: {
              minLength: 6,
              minLowercase: 1,
              minUppercase: 1,
              minNumbers: 1,
              minSymbols: 1
            }
          }
        }
      })
    }
    default: {
      return (req, res, next) => {
        next()
      }
    }
  }
}

exports.validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().forEach((err) => extractedErrors.push({ [err.param]: err.msg }))
  return res.status(400).json({
    status: false,
    message: 'Validation failed',
    errors: extractedErrors
  })
}
