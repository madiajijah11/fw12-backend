const { PrismaClient } = require('@prisma/client')
const jwt = require('jsonwebtoken')

const prisma = new PrismaClient()

exports.checkout = async (req, res) => {
  const authorization = req.headers.authorization
  const token = authorization.split(' ')[1]
  const { id } = jwt.verify(token, process.env.SECRET_KEY)
  try {
    const {
      bookingDate,
      bookingTime,
      movieId,
      cinemaId,
      fullName,
      email,
      phoneNumber,
      paymentMethodId,
      seatNum
    } = req.body
    const transaction = await prisma.transactions.create({
      data: {
        userId: parseInt(id),
        fullName,
        email,
        phoneNumber,
        paymentMethodId: parseInt(paymentMethodId),
        reserveSeats: {
          createMany: {
            data: seatNum.split(', ').map((seat) => ({
              seatNum: seat,
              movieId: parseInt(movieId),
              cinemaId: parseInt(cinemaId),
              bookingDate: new Date(bookingDate),
              bookingTime: new Date(bookingTime)
            }))
          }
        }
      }
    })
    const seats = await prisma.reserveSeats.findMany({
      where: {
        transactionId: transaction.id
      }
    })
    return res.status(200).json({
      status: true,
      message: 'Transaction created successfully',
      results: {
        transaction,
        seats
      }
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}
