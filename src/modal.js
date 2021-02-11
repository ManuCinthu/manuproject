import React, { Component } from 'react';
import { Modal, Form, Button, Row, Col, FormLabel, FormControl } from 'react-bootstrap';

export default class ModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userdetails: []
        };

        this.handlesubmit = this.handlesubmit.bind(this);
}

    componentDidMount() {

        fetch('http://localhost:3000/members')
            .then((response) => response.json())
            .then((data) =>
                this.setState({ userdetails: data }));
    }


    handlesubmit(event) {
        console.log(event.target.start_time)
        event.preventDefault();
        fetch('http://localhost:3000/members', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            },

            body: JSON.stringify({
                id: event.target.id.value,
                real_name: event.target.real_name.value,
                activity_periods: [{
                start_time: event.target.start_time.value,
                end_time: event.target.end_time.value,

                }]
            })
        })
            .then(res => res.json()

            )
    }


    render() {

        return (


            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        User
        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.handlesubmit}>
                                <Form.Group controlId="Id">
                                    <FormLabel>Id</FormLabel>
                                    <FormControl
                                        type="text"
                                        name="Id"
                                        required
                                        defaultValue={this.props.userid}
                                        placeholder="Id" />
                                </Form.Group>
                                <Form.Group controlId="Name">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl
                                        type="text"
                                        name="Name"
                                        placeholder="Name"
                                        defaultValue={this.props.username}
                                    />
                                </Form.Group>


                                <Form.Group controlId="Start time">
                                    <FormLabel>Start time</FormLabel>
                                    <FormControl
                                        type="datetime"
                                        name="Start time"
                                        placeholder="mmm-dd-yyyy hh:mm"
                                        value={this.props.starttime}
                                    />
                                </Form.Group>


                                <Form.Group controlId="End time">
                                    <FormLabel>End time</FormLabel>
                                    <FormControl
                                        type="datetime"
                                        name="End time"
                                        placeholder="mmm-dd-yyyy hh:mm"
                                        value={this.props.endtime}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" type="submit">Submit
                </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }


}


