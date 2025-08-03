import clientPromise from '../../../../lib/mongodb'
import { requireAuth } from '../../../../middleware/auth'
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

    if (req.method === 'PUT') {
      
      const { chapterId, completed } = req.body

      if (typeof chapterId !== 'number' || typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Invalid chapter data' })
      }

      
      const book = await db.collection('books').findOne({
        _id: new ObjectId(id),
        userId: req.user.id
      })

      if (!book) {
        return res.status(404).json({ error: 'Book not found' })
      }

      
      const updatedChapters = book.chapters.map(chapter =>
        chapter.id === chapterId ? { ...chapter, completed } : chapter
      )

      
      const completedChapters = updatedChapters.filter(chapter => chapter.completed).length
      const progress = Math.round((completedChapters / updatedChapters.length) * 100)

      
      const result = await db.collection('books').updateOne(
        { _id: new ObjectId(id), userId: req.user.id },
        {
          $set: {
            chapters: updatedChapters,
            progress,
            updatedAt: new Date()
          }
        }
      )

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Book not found' })
      }

      res.status(200).json({
        message: 'Chapter updated successfully',
        progress
      })

    } else {
      res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Chapter API error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}