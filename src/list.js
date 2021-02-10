import React, { Component } from 'react';
import ModalForm from './modal.js';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';



export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {

      start_time: "",
      userdetails: [],
      showModal: false,

    }
  }

  componentDidMount() {
    this.refreshList();
  }
  refreshList() {

    fetch('http://localhost:3000/members')
      .then(response => response.json())
      .then(data => {
        this.setState({ userdetails: data });
      });
  }

  componentDidUpdate() {
    this.refreshList();
  }

  render() {
    const { userdetails, userid, username, starttime, endtime } = this.state;
    let Modalshow = () => this.setState({ showModal: false });
    return (
      <div>
        <h1 text-align="center">Users</h1>
        <Table striped bordered hover>
        
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {userdetails.map(user =>
              <tr key={user.Id}>
                <td>{user.id}</td>
                <td>{user.real_name}</td>
                <td>{user.activity_periods[0].start_time}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      variant="primary"
                      onClick={() => this.setState({
                        showModal: true,
                        userid: user.id,
                        username: user.real_name,
                        starttime: user.activity_periods[0].start_time,
                        endtime: user.activity_periods[0].end_time
                      })}
                    >View
                  </Button>
                    <ModalForm
                      show={this.state.showModal}
                      onHide={Modalshow}
                      userid={userid}
                      username={username}
                      starttime={starttime}
                      endtime={endtime}
                    />
                  </ButtonToolbar>
                </td>
              </tr>
            )}
          </tbody>
        </Table>


      </div>
    );
  }
}


