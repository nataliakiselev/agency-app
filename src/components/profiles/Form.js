import React from "react";
import axios from "axios";

class Form extends React.Component {
  submitProfile = (e) => {
    e.preventDefault();
    const form = e.target;
    // const data = new FormData(form);

    // const data = formData.entries();
    const data = Object.fromEntries(new FormData(e.target));
    // const data = JSON.stringify(obj);
    console.log(e.target, "form");
    console.log(data, "data");
    axios({
      method: "post",
      url: "http://localhost:4000/mern/profiles",

      body: data,

      headers: {
        "Content-Type": "multipart/form-data",
      },

      //   firstName: e.target.firstName.value,
      //   email: e.target.email.value,
      //    phone: e.target.phone.value,
      //    lastName: e.target.lastName.value,
      // },
    })
      // .then((response) => response.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
    form.reset();
  };

  render() {
    return (
      <div className="row">
        <h1 className="center">Add a new profile </h1>
        <form
          action="/profile"
          method="post"
          encType="multipart/form-data"
          className="col s12"
          onSubmit={this.submitProfile}
        >
          <div className="row">
            <div className="input-field col s6">
              <input id="firstName" type="text" name="firstName" />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="input-field col s6">
              <input id="lastName" type="text" name="lastName" />
              <label htmlFor="lastName">Last Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input id="email" type="text" name="email" />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col s6">
              <input id="phone" type="text" name="phone" />
              <label htmlFor="phone">Phone</label>
            </div>
          </div>
          {/* <div class="row">
            <div class="col s12">
              <div class="file-field input-field">
                <div class="btn">
                  <span>File</span>
                  <input id="photos" name="photos" type="file" multiple />
                </div>
                <div class="file-path-wrapper">
                  <label for="photos" class="sr-only">
                    Photos to upload
                  </label>
                  <input
                    id="photos_names"
                    name="photos_names"
                    class="file-path validate"
                    type="text"
                    placeholder="Upload one or more files"
                  />
                </div>
              </div>
            </div>
          </div> */}
          <button
            className=" btn waves-effect waves-lght"
            type="submit"
            name="action"
          >
            Add Profile
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
