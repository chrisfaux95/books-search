import React from 'react';

export default function Form({ handleInputChange, handleFormSubmit }) {

    return (
        <form>
            <label for="book">Book:</label>
            <input
                id="book"
                type="text"
                onChange={handleInputChange}
            />
            <button onClick={handleFormSubmit}>Search!</button>
        </form>
    )
}