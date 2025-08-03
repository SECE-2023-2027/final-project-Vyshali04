import clientPromise from '../../../lib/mongodb'
import { requireAuth } from '../../../middleware/auth'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
  try {
    const authResult = await requireAuth(req, res)
    if (authResult !== true) {
      return 
    }

    const client = await clientPromise
    const db = client.db()

    if (req.method === 'GET') {
      
      const books = await db.collection('books')
        .find({ userId: req.user.id })
        .sort({ createdAt: -1 })
        .toArray()

      
      const transformedBooks = books.map(book => ({
        ...book,
        id: book._id.toString(),
        _id: undefined
      }))

      res.status(200).json({ books: transformedBooks })

    } else if (req.method === 'POST') {
      
      const { title, author, coverImage, totalChapters } = req.body

     
      if (!title || !author || !totalChapters) {
        return res.status(400).json({ error: 'Title, author, and total chapters are required' })
      }

      if (totalChapters < 1) {
        return res.status(400).json({ error: 'Total chapters must be at least 1' })
      }

      
      const chapters = Array.from({ length: totalChapters }, (_, i) => ({
        id: i + 1,
        title: `Chapter ${i + 1}`,
        completed: false
      }))

      const bookData = {
        title,
        author,
        coverImage: coverImage || '',
        totalChapters: parseInt(totalChapters),
        chapters,
        progress: 0,
        userId: req.user.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const result = await db.collection('books').insertOne(bookData)

      const newBook = {
        ...bookData,
        id: result.insertedId.toString(),
        _id: undefined
      }

      res.status(201).json({
        message: 'Book created successfully',
        book: newBook
      })

    } else {
      res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Books API error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}