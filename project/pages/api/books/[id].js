import clientPromise from '../../../lib/mongodb'
import { requireAuth } from '../../../middleware/auth'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
  try {
    const authResult = await requireAuth(req, res)
    if (authResult !== true) {
      return 
    }

    const { id } = req.query
    const client = await clientPromise
    const db = client.db()

    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid book ID' })
    }

    if (req.method === 'GET') {
      
      const book = await db.collection('books').findOne({
        _id: new ObjectId(id),
        userId: req.user.id
      })

      if (!book) {
        return res.status(404).json({ error: 'Book not found' })
      }

      const transformedBook = {
        ...book,
        id: book._id.toString(),
        _id: undefined
      }

      res.status(200).json({ book: transformedBook })

    } else if (req.method === 'PUT') {
      
      const { title, author, coverImage } = req.body

      if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required' })
      }

      const updateData = {
        title,
        author,
        coverImage: coverImage || '',
        updatedAt: new Date()
      }

      const result = await db.collection('books').updateOne(
        { _id: new ObjectId(id), userId: req.user.id },
        { $set: updateData }
      )

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Book not found' })
      }

      res.status(200).json({ message: 'Book updated successfully' })

    } else if (req.method === 'DELETE') {
      
      const result = await db.collection('books').deleteOne({
        _id: new ObjectId(id),
        userId: req.user.id
      })

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Book not found' })
      }

      res.status(200).json({ message: 'Book deleted successfully' })

    } else {
      res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Book API error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}