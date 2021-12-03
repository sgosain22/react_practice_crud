import React, { Component } from "react";

class StudentForm extends Component {
  state = {
    ...this.returnStateObject(),
  };

  returnStateObject() {
    if (this.props.currentIndex === -1)
      return {
        fullName: "",
        stuCode: "",
        emailId: "",
        cityName: ""
      };
    else return this.props.list[this.props.currentIndex];
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.currentIndex !== this.props.currentIndex ||
      prevProps.list !== this.props.list
    ) {
      this.setState({ ...this.returnStateObject() });
      console.log(prevProps, this.props);
    }
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state === ''){
        alert('true')
    }else{}

    this.props.onAddOrEdit(this.state);
    
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} autoComplete="off">
        <h2 className="frmHead">Student Form</h2>
        <label>Full Name:</label>
        <input
          name="fullName"
          onChange={this.handleInputChange}
          value={this.state.fullName}
        />
        <label>Student Code:</label>
        <input
          name="stuCode"
          onChange={this.handleInputChange}
          value={this.state.stuCode}
        />
        <label>Email Id:</label>
        <input
          name="emailId"
          onChange={this.handleInputChange}
          value={this.state.emailId}
        />
        <label>City Name:</label>
        <input
          name="cityName"
          onChange={this.handleInputChange}
          value={this.state.cityName}
        />
        <button id="btnAdd" type="submit">
          Add
        </button>
      </form>
    );
  }
}

export default StudentForm;
