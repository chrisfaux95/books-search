import React from 'react';
import { List, ListItem } from "../List";
import { Row, Col } from "../Grid";
import "./style.css";
import { Book } from '../../../../Mern-hw-starter/models';

export default Book({ key, title, subtitle, link, author, description, image, Button}) {
    return (
        <ListItem>
            <Row>
                <Col size="md-4">
                    <h4>{title}</h4>
                    {subtitle ? <h5>{subtitle}</h5> : <br />}
                    <p>Written By {author}</p>
                </Col>
                <Col className="ml-auto">
                    {/* VIEW AND SAVE BUTTONS */}
                    {Button}
                </Col>
            </Row>
            <Row>
                <Col>

                </Col>
                <Col>
                    {description}
                </Col>
            </Row>
        </ListItem>
        // CODE HERE
    )
}
