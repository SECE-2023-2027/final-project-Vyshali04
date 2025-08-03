import { requireAuth } from '../../../middleware/auth'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const authResult = await requireAuth(req, res)
    if (authResult !== true) {
      return 
    }

    res.status(200).json({
      user: req.user
    })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}