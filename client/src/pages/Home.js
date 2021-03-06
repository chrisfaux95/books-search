import React, { useState } from 'react';
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Form from "../components/Form";
import Book from "../components/Book";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

export default function Home() {
    const [books, setBooks] = useState([]);
    const [q, setQ] = useState("");
    const [message, setMessage] = useState("Search for a book to begin!");

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setQ({...q, [name]: value})

    }

    const handleFormSubmit = (event) => {
        event.preventDefault;
        getBooks();
    }

    const handleBookSave = (id) => {
        const book = books.find(b => b.id === id);

        API.saveBook({
            googleId: book.id,
            title: book.volumeInfo.title,
            subtitle: book.volumeInfo.subtitle,
            link: book.volumeInfo.infoLink,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks.thumbnail
        }).then(getBooks);
    }

    const getBooks = () => {
        API.getBooks(q).then(res => setBooks(res.data)).catch(
            () => {
                setBooks([])
                setMessage("No New Books Found, Try Searching Again");
            }
        )
    }

    return (
        <Container>
            <Row>
                <Col size="md-12">
                    <Jumbotron>
                        <h1 className="text-center">
                            Google Books Search
                        </h1>
                        <h2 className="text-center">
                            Search for and save books of interest.
                        </h2>
                    </Jumbotron>
                </Col>
                <Col size="md-12">
                    <Card title="Book Search" icon="far fa-book">
                        <Form
                            handleInputChange={handleInputChange}
                            handleFormSubmit={handleFormSubmit}
                            q={[q, setQ]}
                        />
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col size="md-12">
                    <Card title="Results">
                        {books.length ? (
                            <List>
                                {books.map((book) => (
                                    <Book
                                        key={book.id}
                                        title={book.volumeInfo.title}
                                        subtitle={book.volumeInfo.subtitle}
                                        link={book.volumeInfo.infoLink}
                                        authors={book.volumeInfo.authors.join(", ")}
                                        description={book.volumeInfo.description}
                                        image={book.volumeInfo.imageLinks.thumbnail}
                                        Button={() => (
                                            <button
                                                onClick={() => handleBookSave(book.id)}
                                                className="btn btn-primary ml-2">
                                                Save
                                            </button>
                                        )}
                                    />
                                )
                                )}
                            </List>
                        ) : <h2 className="text-center">{message}</h2>}
                    </Card>
                </Col>
            </Row>
            <Footer />
        </Container>
    );
}