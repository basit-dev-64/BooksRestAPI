# BooksRestAPI

API Endpoints and Their Usage:

1. GET / - Home

Description: This endpoint serves as the home page for the Books Application.
Usage: Access the home page of the application.

2. POST /api/books - Add a New Book

Description: Add a new book to the database with the provided title, author, and summary.
Usage: Use a POST request to add a new book to the collection.

3. GET /api/books - Get All Books

Description: Retrieve a list of all books from the database.
Usage: Use a GET request to fetch the list of all books.

4. GET /api/books/:id - Get Book by ID

Description: Retrieve details of a specific book by its unique identifier (ID).
Usage: Use a GET request with the book's ID to fetch its details.

5. PUT /api/books/:id - Update Book by ID

Description: Update the details of a specific book by its ID with the provided data.
Usage: Use a PUT request with the book's ID to update its details.

6. DELETE /api/books/:id - Delete Book by ID

Description: Delete a specific book from the database by its ID.
Usage: Use a DELETE request with the book's ID to remove it from the collection.




Instructions to Set Up and Run the Application Locally:

1. Clone the repository or set up your Node.js and MongoDB environment.
2. Install required dependencies by running:
3. Copy code
4. npm install
5. Set up your MongoDB connection by providing the appropriate MongoDB URI in the code.
6. Start the application by running: npm start
   
Access the application locally at http://localhost:5050. The API endpoints can be tested using tools like Postman or by integrating them into your frontend application.