import React, { Component, Fragment } from "react";
import "materialize-css/dist/css/materialize.min.css";
import VideoDetail from "./VideoDetail";
import Spinner from "./tools/Spinner";
import "./main.css";

class Main extends Component {
  state = {
    url: "",
    videoDetails: {},
    format: [],
    err: "",
    waiting: "false",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { url } = this.state;
    this.setState({ waiting: "true" });
    this.sendURL(url);
  };

  sendURL = async (url) => {
    const res = await fetch(`http://localhost:4000/convert?URL=${url}`, {
      method: "GET",
    });
    if (res.ok) {
      const details = await res.json();
      this.setState({
        videoDetails: details.videoDetails,
        format: details.formats,
      });
    } else {
      const error = await res.json();

      this.setState({
        err: error.message,
      });
    }
  };

  render() {
    const { title, lengthSeconds, videoId, embed } = this.state.videoDetails;
    const { format, err, waiting } = this.state;

    let videoSection;
    if (waiting === "true" && !videoId && !err) {
      videoSection = <Spinner />;
    }
    if (videoId) {
      videoSection = (
        <VideoDetail
          title={title}
          lengthSeconds={lengthSeconds}
          embedUrl={embed}
          format={format}
        />
      );
    }
    return (
      <div className="container">
        <h1 className="main-header">
          <span className="title">YouTube</span> Video Downloader
        </h1>
        <form onSubmit={this.handleSubmit}>
          <input
            className="URL-input "
            placeholder="enter video url eg https://youtu.be/rBAAoV-4MGI"
            name="url"
            onChange={this.handleChange}
          />
          <button className="convert-button">Convert</button>
        </form>
        {err ? <p style={{ color: "red" }}> {err + "!!"}</p> : null}
        {videoSection}
      </div>
    );
  }
}
export default Main;
