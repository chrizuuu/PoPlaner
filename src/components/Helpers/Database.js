import Realm from "realm";

// Declare Schema
class BookSchema extends Realm.Object {}
BookSchema.schema = {
    name: 'Book',
    properties: {
        title: 'string',
        pages:  'int',
        edition: 'int?'
    }
};

// Create realm
let realm = new Realm({schema: [BookSchema], schemaVersion: 1});

export {
  getAllBooks,
  addBook,
}

// Export the realm
export default realm;