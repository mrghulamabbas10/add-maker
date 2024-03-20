import dbConnect from '../../../lib/dbConnect'
import Ads from '../../../models/Ad'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const { category } = req.query

        // Check if category parameter is provided
        if (!category) {
          const data = await Ads.find()
          return res.status(200).json({ success: true, data })
        }

        const { search = '' } = req.query

        const query = {
          title: { $regex: search, $options: 'i' },
          category: category, // Ensure category is included in the query
        }

        const ads = await Ads.find(query)

        res.status(200).json({
          success: true,
          data: ads,
        })
      } catch (error) {
        res.status(400).json({ success: false, message: error.message })
      }
      break

    case 'POST':
      try {
        const ad = await Ads.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: ad })
      } catch (error) {
        res.status(400).json({ success: false, message: error.message })
      }
      break
    default:
      res.status(400).json({ success: false, message: error.message })
      break
  }
}
