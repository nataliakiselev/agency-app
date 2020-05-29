import React from "react";
import axios from "axios";

import "./App.css";
import List from "./profiles/List";
import Profile from "./profiles/Profile";
import Form from "./profiles/Form";
import ErrorBoundary from "./ErrorBoundary";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
      currentProfile: {},
    };
    this.updateCurrentProfile = this.updateCurrentProfile.bind(this);
  }

  // async getProfiles() {
  //   const url = "http://localhost:4000/mern/profiles";
  //   try {
  //     const response = await fetch(url);
  //     if (response.status >= 200 && response.status < 300) {
  //       const resJson = await response.json();
  //       this.setState({ profiles: resJson.data });
  //     } else {
  //       throw response;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  componentDidMount() {
    // this.getProfiles();
    const url = "http://localhost:4000/mern/profiles";
    axios
      .get(url)
      .then((Response) => {
        console.log(Response, "response");
        this.setState({
          profiles: Response.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateCurrentProfile(item) {
    this.setState({
      currentProfile: item,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="col s12">
            <nav>
              <div className="nav-wrapper  white">
                <a href="/" className="brand-logo left black">
                  STORM
                </a>
              </div>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col s3">
            <List
              profiles={this.state.profiles}
              updateCurrentProfile={this.updateCurrentProfile}
            />
          </div>
          <div className="col s9">
            <Profile profile={this.state.currentProfile} />
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <Form />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
