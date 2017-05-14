import React, {PureComponent} from 'react';
import {nes} from '../../common';

export default class FpsCounter extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {value: 0};
  }

  componentDidMount() {
    this.timer = setInterval(this.updateFps, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateFps = () => {
    this.setState({value: nes.fps});
  };

  render() {
    const value = ~~this.state.value;
    return <div className="fps-counter">FPS: {value}</div>;
  }

}
