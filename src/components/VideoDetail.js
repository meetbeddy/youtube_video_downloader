import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import Iframe from "react-iframe";
import "./videodetails.css";


class VideoDetail extends Component {
  handleChange = (e) => {
    const formatUrl = e.target.value;

    window.location.href = `${formatUrl}`;
  };

  componentDidMount() {
    M.FormSelect.init(this.FormSelect);
  }
  render() {
    const {
      title,
      embedUrl: { iframeUrl },
      lengthSeconds,
      format,
    } = this.props;

    let minutes = Math.floor(lengthSeconds / 60);
    let seconds = lengthSeconds - minutes * 60;

    let vidFormat =
      format.lenght > 0 ||
      format.map((format, i) => {
        return (
          <option key={i} value={format.url}>
            {format.qualityLabel}
            {"\xa0"}
            {"\xa0"}
            {"\xa0"}
            {format.container}
          </option>
        );
      });

    return (
      <div className="col s12 m7 card">
        <div className="card horizontal">
          <Iframe
            url={iframeUrl}
            width="260px"
            height="150px"
            display="initial"
            position="relative"
          />

          <div className="card-stacked">
            <div className="card-content">
              <p>{title}</p>
              <p>Video Lenght: {`${minutes}:${seconds}`} </p>
            </div>
            <div className="card-action">
              <form>
                <div className="input-field col s6">
                  <select
                    ref={(formSelect) => {
                      this.FormSelect = formSelect;
                    }}
                    id="videoFormat"
                    onChange={this.handleChange}
                  >
                    <option defaultValue="disabled selected">
                      Choose download quality
                    </option>
                    {vidFormat}
                  </select>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoDetail;
