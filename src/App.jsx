import React from 'react';
import './App.css';

import Slider from '@material-ui/lab/Slider';
import Grid from '@material-ui/core/Grid';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GetAppRounded from '@material-ui/icons/GetAppRounded'
import PlayArrow from '@material-ui/icons/PlayArrow';
import 'bootstrap/dist/css/bootstrap.css';

export const TITLE = "Language Dialogue Converter";
export const HEADER_URL = "https://language-dialogue-server.herokuapp.com/";
export const SYNTHESIZE_ENDPOINT = "synthesize";

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isDownloading: false,
      // isPlaying: false,
      formData: {
        text1: '',
        text2: '',
        voice1: "en-AU-Wavenet-A", // default value
        voice2: "en-AU-Wavenet-A", // default value
        pitch1: 0,
        pitch2: 0,
        speed1: 100,
        speed2: 100,
        break: 0
      },
      result: ""
    };
  }

  handleContentChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    let formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  };

  handleSliderChange = name => (e, value) => {
    let formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  };

  handleDownloadClick = (event) => {
    const formData = this.state.formData;
    this.setState({isDownloading: true});
    fetch(HEADER_URL + SYNTHESIZE_ENDPOINT,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(response => {
          this.setState({
            result: response.result,
            isDownloading: false
          });
        });
  };

  // handlePlayClick = (event) => {
  //   const formData = this.state.formData;
  //   this.setState({isPlaying: true});
  //   fetch(HEADER_URL + SYNTHESIZE_ENDPOINT,
  //       {
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json'
  //         },
  //         method: 'POST',
  //         body: JSON.stringify(formData)
  //       })
  //       .then(response => response.json())
  //       .then(response => {
  //         this.setState({
  //           result: response.result,
  //           isPlaying: false
  //         });
  //       });
  // };

  render() {
    const isDownloading = this.state.isDownloading;
    // const isPlaying = this.state.isPlaying;
    const formData = this.state.formData;
    const result = this.state.result;

    const classes = makeStyles(theme => ({
      button: {
        margin: theme.spacing(4),
      },
      leftIcon: {
        marginRight: theme.spacing(4),
      },
      rightIcon: {
        marginLeft: theme.spacing(4),
      },
      iconSmall: {
        fontSize: 20,
      },
    }));

    const pitchMarks = [
      {
        value: 0,
        label: '0',
      },
      {
        value: -5,
        label: '-5',
      },
      {
        value: 5,
        label: '5',
      }
    ];

    const speedMarks = [
      {
        value: 100,
        label: '100%',
      },
      {
        value: 75,
        label: '75%',
      },
      {
        value: 125,
        label: '125%',
      }
    ];

    const breakMarks = [
      {
        value: 0,
        label: '0s',
      },
      {
        value: 1,
        label: '1s',
      },
      {
        value: 2,
        label: '2s          ',
      }
    ];

    return (
        <Container>
          <div>
            <h1 className="title">{TITLE}</h1>
          </div>
          <div className="content">
            <Form>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Language 1</Form.Label>
                  <Form.Control
                      as="textarea"
                      type="text"
                      name="text1"
                      placeholder="Write something here..."
                      value={formData.text1}
                      onChange={this.handleContentChange}
                      rows="5"/>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Language 2</Form.Label>
                  <Form.Control
                      as="textarea"
                      type="text"
                      name="text2"
                      placeholder="Write something here..."
                      value={formData.text2}
                      onChange={this.handleContentChange}
                      rows="5"/>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Select Voice</Form.Label>
                  <Form.Control
                      as="select"
                      value={formData.voice1}
                      name="voice1"
                      onChange={this.handleContentChange}>
                    <option value="en-AU-Wavenet-A">en-AU-A Female</option>
                    <option value="en-AU-Wavenet-B">en-AU-B Male</option>
                    <option value="en-AU-Wavenet-C">en-AU-C Female</option>
                    <option value="en-AU-Wavenet-D">en-AU-D Male</option>

                    <option value="en-GB-Wavenet-A">en-GB-A Female</option>
                    <option value="en-GB-Wavenet-B">en-GB-B Male</option>
                    <option value="en-GB-Wavenet-C">en-GB-C Female</option>
                    <option value="en-GB-Wavenet-D">en-GB-D Male</option>

                    <option value="en-US-Wavenet-A">en-US-A Male</option>
                    <option value="en-US-Wavenet-B">en-US-B Male</option>
                    <option value="en-US-Wavenet-C">en-US-C Female</option>
                    <option value="en-US-Wavenet-D">en-US-D Male</option>
                    <option value="en-US-Wavenet-E">en-US-E Female</option>
                    <option value="en-US-Wavenet-F">en-US-F Female</option>

                    <option value="ru-RU-Wavenet-A">ru-RU-A Female</option>
                    <option value="ru-RU-Wavenet-B">ru-RU-B Male</option>
                    <option value="ru-RU-Wavenet-C">ru-RU-C Female</option>
                    <option value="ru-RU-Wavenet-D">ru-RU-D Male</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Select Voice</Form.Label>
                  <Form.Control
                      as="select"
                      value={formData.voice2}
                      name="voice2"
                      onChange={this.handleContentChange}>
                    <option value="en-AU-Wavenet-A">en-AU-A Female</option>
                    <option value="en-AU-Wavenet-B">en-AU-B Male</option>
                    <option value="en-AU-Wavenet-C">en-AU-C Female</option>
                    <option value="en-AU-Wavenet-D">en-AU-D Male</option>

                    <option value="en-GB-Wavenet-A">en-GB-A Female</option>
                    <option value="en-GB-Wavenet-B">en-GB-B Male</option>
                    <option value="en-GB-Wavenet-C">en-GB-C Female</option>
                    <option value="en-GB-Wavenet-D">en-GB-D Male</option>

                    <option value="en-US-Wavenet-A">en-US-A Male</option>
                    <option value="en-US-Wavenet-B">en-US-B Male</option>
                    <option value="en-US-Wavenet-C">en-US-C Female</option>
                    <option value="en-US-Wavenet-D">en-US-D Male</option>
                    <option value="en-US-Wavenet-E">en-US-E Female</option>
                    <option value="en-US-Wavenet-F">en-US-F Female</option>

                    <option value="ru-RU-Wavenet-A">ru-RU-A Female</option>
                    <option value="ru-RU-Wavenet-B">ru-RU-B Male</option>
                    <option value="ru-RU-Wavenet-C">ru-RU-C Female</option>
                    <option value="ru-RU-Wavenet-D">ru-RU-D Male</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Row>
                <Form.Group as={Col}>
                  <Form.Label>Select Pitch</Form.Label>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                      <Slider
                          defaultValue={0}
                          aria-labelledby="pitch1"
                          step={1}
                          min={-5}
                          max={5}
                          marks={pitchMarks}
                          valueLabelDisplay="auto"
                          onChange={this.handleSliderChange("pitch1")}
                      />
                    </Grid>
                  </Grid>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Select Speed</Form.Label>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                      <Slider
                          defaultValue={100}
                          aria-labelledby="speed1"
                          step={1}
                          min={75}
                          max={125}
                          marks={speedMarks}
                          valueLabelDisplay="auto"
                          onChange={this.handleSliderChange("speed1")}
                          // valueLabelFormat={this.speedFormat}
                      />
                    </Grid>

                  </Grid>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Select Pitch</Form.Label>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                      <Slider
                          defaultValue={0}
                          aria-labelledby="pitch2"
                          step={1}
                          min={-5}
                          max={5}
                          marks={pitchMarks}
                          valueLabelDisplay="auto"
                          onChange={this.handleSliderChange("pitch2")}
                      />
                    </Grid>

                  </Grid>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Select Speed</Form.Label>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                      <Slider
                          defaultValue={100}
                          aria-labelledby="speed2"
                          step={1}
                          min={75}
                          max={125}
                          marks={speedMarks}
                          valueLabelDisplay="auto"
                          onChange={this.handleSliderChange("speed2")}
                      />
                    </Grid>
                  </Grid>
                </Form.Group>
              </Row>

              <Row>
                <Col>
                  <Form.Group as={Col}>
                    <Form.Label>Select Break Time between sentences</Form.Label>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs>
                        <Slider
                            defaultValue={0}
                            aria-labelledby="break"
                            step={0.05}
                            min={0}
                            max={2}
                            marks={breakMarks}
                            valueLabelDisplay="auto"
                            onChange={this.handleSliderChange("break")}
                        />
                      </Grid>

                    </Grid>
                  </Form.Group>
                </Col>

                <Col>
                </Col>
                <Col>
                </Col>

              </Row>
            </Form>

            <Form>
              <Row>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={isDownloading}
                    onClick={!isDownloading ? this.handleDownloadClick : null}
                    className={classes.button}>
                  {
                    isDownloading ? 'Downloading...' : 'Download MP3'
                  }
                  <GetAppRounded className={classes.rightIcon}>send</GetAppRounded>
                </Button>
              </Row>

              {/*<Row>*/}

              {/*  <Button*/}
              {/*      variant="contained"*/}
              {/*      color="default"*/}
              {/*      disabled={isPlaying}*/}
              {/*      onClick={!isPlaying ? this.handlePlayClick : null}*/}
              {/*      className={classes.button}>*/}
              {/*    {*/}
              {/*      isPlaying ? 'Pause' : 'Play Dialogue'*/}
              {/*    }*/}
              {/*    <PlayArrow className={classes.rightIcon}/>*/}
              {/*  </Button>*/}
              {/*</Row>*/}

            </Form>

          </div>

          {result === "" ? null :
              (<Row>
                <Col className="result-container">
                  <h5 id="result">{result}</h5>
                </Col>
              </Row>)
          }

        </Container>
    );
  }
}
