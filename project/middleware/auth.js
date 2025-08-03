import { verifyToken, getTokenFromRequest } from '../lib/auth'
import clientPromise from '../lib/mongodb'
import { ObjectId } from 'mongodb'

export const requireAuth = async (req, res, next) => {
  try {
    const token = getTokenFromRequest(req)
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' })
    }

 
    const client = await clientPromise
    const db = client.db()
    const user = await db.collection('users').findOne({ 
      _id: new ObjectId(decoded.userId) 
    })

    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    
    req.user = {
      id: user._id.toString(),
      email: user.email,
      name: user.name
    }

    if (next) {
      return next()
    }
    return true
  } catch (error) {
    console.error('Auth middleware error:', error)
    return res.status(500).json({ error: 'Authentication failed' })
  }
}