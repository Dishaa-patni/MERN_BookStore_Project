import express from "express"
import { Book_Database } from "../models/bookModel.js";

const router=express.Router();



//route to create new book 
router.post("/", async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: "Send all required fields:title,author,publishYear",
        });
      }
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
      };
  
      const new_created_book = await Book_Database.create(newBook);
      return response.status(201).send(new_created_book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  //route for getting all the books from the database
  router.get("/", async (request, response) => {
    try {
      const retrived_books = await Book_Database.find({});
  
      return response.status(200).json({
        count: retrived_books.length,
        data_collection: retrived_books,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  //route for getting book by id
  router.get("/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const retrived_books = await Book_Database.findById(id);
  
      return response.status(200).json(
        retrived_books
      );
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  //Route for update a book
  router.put("/:id", async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: "Send all required fields:title,author,publishYear",
        });
      }
      const { id } = request.params;
      const result = await Book_Database.findByIdAndUpdate(id, request.body);
      if (!result) {
        return response.status(404).send({ message: "Book not found" });
      }
      return response.status(200).send({ message: "Book updated successfully" });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  // route for deleting a book by id
  router.delete("/:id", async (request, response) => {
    try {
      const { id } = request.params;
  
      const deleted_book = await Book_Database.findByIdAndDelete(id);
      if (!deleted_book) {
        return response.status(400).send({ message: "Book not deleted" });
      }
      return response.status(200).send({ message: "Book deleted successfully" });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  export default router;