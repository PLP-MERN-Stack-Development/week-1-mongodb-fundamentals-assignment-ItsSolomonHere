# 📚 MongoDB Bookstore Project

A MongoDB-based application for storing, querying, and analyzing a collection of classic books. This project demonstrates core MongoDB operations, advanced queries, aggregation pipelines, and indexing.

---

## 📌 Features

- Basic and advanced querying (filter, sort, projection, pagination)
- Aggregation pipelines for analytics
- Indexing for performance optimization
- Sample dataset of classic literature

---

## 🗃️ Dataset

Each book document has the following schema:

```json
{
  title: String,
  author: String,
  genre: String,
  published_year: Number,
  price: Number,
  in_stock: Boolean,
  pages: Number,
  publisher: String
}
🚀 Getting Started
Prerequisites
MongoDB installed locally or access to a MongoDB Atlas cluster

Mongo Shell or MongoDB Compass

Setup
Clone this repository

Import the dataset into MongoDB:

mongoimport --db bookstore --collection books --file books.json --jsonArray
Ensure books.json contains the sample dataset provided.

🔍 Task Reference
Task 3: Advanced Queries
Find in-stock books published after 2010 (projection: title, author, price):


db.books.find(
  { in_stock: true, published_year: { $gt: 2010 } },
  { _id: 0, title: 1, author: 1, price: 1 }
)
Sort by price (ascending & descending):

t
db.books.find({}, { _id: 0, title: 1, price: 1 }).sort({ price: 1 }) // Asc
db.books.find({}, { _id: 0, title: 1, price: 1 }).sort({ price: -1 }) // Desc
Pagination (5 books per page, e.g., page 2):


db.books.find({}, { _id: 0, title: 1, author: 1, price: 1 }).sort({ title: 1 }).skip(5).limit(5)
Task 4: Aggregation Pipelines
1. Average price by genre:


db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } },
  { $project: { _id: 0, genre: "$_id", avgPrice: { $round: ["$avgPrice", 2] } } }
])
2. Author with the most books:

t
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])
3. Books grouped by publication decade:


db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          { $toString: { $multiply: [10, { $floor: { $divide: ["$published_year", 10] } }] } },
          "s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      totalBooks: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])
Task 5: Indexing
1. Create index on title:


db.books.createIndex({ title: 1 })
2. Compound index on author and published_year:


db.books.createIndex({ author: 1, published_year: -1 })
3. Explain query performance:


db.books.find({ title: "1984" }).explain("executionStats")
🧪 Testing
You can test the queries using:

MongoDB Shell

MongoDB Compass

A Node.js backend with Mongoose or native MongoDB driver

📂 File Structure

.
├── books.json            # Sample book data
├── README.md             # Project documentation
📚 License
MIT License

✍️ Author
Solomon — Developer | MongoDB Enthusiast