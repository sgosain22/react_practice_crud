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
        cityName: "",
        nameErr: "",
        emailErr:"",
        stuErr: "",
        cityErr: ""
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

  validate = () => {
    //  let nameErr = "";
     let emailErr = "";
    //  let stuErr = "";
    //  let cityErr = "";
  

    if(!this.state.fullName.includes('')){
      nameErr = 'Full Name Please!';
   }
     if(!this.state.emailId.includes('@')){
        emailErr = 'Invalid Email!';
     }
     if(emailErr){
        this.setState({emailErr});
        return false;
     }
  
     return true;
    }

  handleSubmit = (e) => {
    e.preventDefault();
    const isValid = this.validate();
    if(isValid){
      console.log(this.state)
    }
    this.props.onAddOrEdit(this.state);
    
  };


  // validation

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
    }

    if (typeof fields["name"] !== "undefined") {
      if (!fields["name"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["name"] = "Only letters";
      }
    }

    //Email
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

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
        <div style={{color:'red'}}>
          {this.state.nameErr}
        </div>


        <label>Student Code:</label>
        <input
          name="stuCode"
          onChange={this.handleInputChange}
          value={this.state.stuCode}
        />
        <div style={{color:'red'}}>
          {this.state.stuErr}
        </div>


        <label>Email Id:</label>
        <input
          type="email"
          name="emailId"
          onChange={this.handleInputChange}
          value={this.state.emailId}
        />
          <div style={{color:'red'}}>
            {this.state.emailErr}
          </div>


        <label>City Name:</label>
        <input
          name="cityName"
          onChange={this.handleInputChange}
          value={this.state.cityName}
        />
          <div style={{color:'red'}}>
            {this.state.cityErr}
          </div>


        <button id="btnAdd" type="submit">
          Add
        </button>
      </form>
    );
  }
}

export default StudentForm;
