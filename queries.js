db.books.inserMany([
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: 'J. B. Lippincott & Co.'
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: 'Charles Scribner\'s Sons'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Dystopian',
    published_year: 1932,
    price: 11.50,
    in_stock: false,
    pages: 311,
    publisher: 'Chatto & Windus'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: 'George Allen & Unwin'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: 'Little, Brown and Company'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: 'T. Egerton, Whitehall'
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: 'Allen & Unwin'
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    genre: 'Political Satire',
    published_year: 1945,
    price: 8.50,
    in_stock: false,
    pages: 112,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: 'HarperOne'
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    published_year: 1851,
    price: 12.50,
    in_stock: false,
    pages: 635,
    publisher: 'Harper & Brothers'
  },
  {
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    genre: 'Gothic Fiction',
    published_year: 1847,
    price: 9.99,
    in_stock: true,
    pages: 342,
    publisher: 'Thomas Cautley Newby'
  }
]);

// Find all books in a specific genre
db.books.find({ genre : "Fiction" })

//Find books published after a certain year
db.books.find({ published_year : { $gt: 1950 } })

//Find books by a specific author
db.books.find({ author : "Aldous Huxley"})

//Update the price of a specific book 
db.books.updateOne(
  { title :"The Alchemist"},
  { $set : { price : 14.55 }}
  )

  // Delete a book by its title
 db.books.deleteOne({ title: "Moby Dick" }) 

 //Books in stock and published after 2010
 db.books.find(
  { in_stock : true ,published_year : { $gt : 2010 } },
  { title: 1, price: 1, _id:0 }
)

//Sort books by price (ascending)
db.books.find(
  {},
  { _id: 0, title: 1, author: 1, price: 1 }
).sort({ price: 1 })
 

//sort books by price (descending)
db.books.find(
  {},
  { _id: 0, title :1 ,author: 1, price: 1 }
).sort({ price: -1 })

// Pagination: 5 books per page (e.g., page 2)
db.books.find(
{},
{ _id: 0 ,title: 1 ,author: 1 ,price: 1 }
).sort({ title: 1 }) // sorting by title or any filed
.skip(5)
.limit(5)

// Aggregation Pipeline
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      avgPrice: { $avg: "$price" }
    }
  },
  {
    $project: {
      _id: 0,
      genre: "$_id",
      avgPrice: { $round: ["$avgPrice", 2] }
    }
  }
])

// Find the author with the most books
db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          {
            $toString: {
              $multiply: [
                10,
                { $floor: { $divide: ["$published_year", 10] } }
              ]
            }
          },
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
  {
    $sort: { _id: 1 }
  }
])

//Create an index on title
db.books.createIndex({ title: 1 })



//2. Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

//Use explain() to show performance improvement
db.books.find({ title: "1984" }).explain("executionStats")

//Query after indexing title:
db.books.find({ title: "1984" }).explain("executionStats")
