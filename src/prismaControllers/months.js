const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.getMonths = async (req, res) => {
  try {
    const getMonths = await prisma.months.findMany()
    res.status(200).json({
      status: true,
      message: 'Months retrieved successfully',
      results: getMonths
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: false,
      message: 'Internal server error'
    })
  }
}
