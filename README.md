# Library manager web application

Manage books, authors and shelves. 
Add new authors manually, or add them when creating a new book. Set dimensions to your shelves, place the books in a subsection of a shelf.

## Pages

`/` - Main page. Browse you shelves here, check inside the shelf, and even create new books inside a shelf section.

`/admin/books` - List of books. Cannot yet add book to a shelf section from here.

`/admin/authors` - List of authors. Add new authors by their name.

`/admin/shelves` - List of shelves. Add new shelves by giving it a name, row and column count.


## Setup

Create a new `.env` file. Inside the environment file create a new entry with the key of `DATABASE_URL`. The value of this should the URL of your MySQL database (I haven't tested it with other relational databases).
```bash
DATABASE_URL=mysql://[username]:[password]@[host]:[port]/[db_name]?schema=public
```

Run with npm
```bash
npm run build
npm run start
```