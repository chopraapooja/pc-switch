import React, { Component } from "react";
import mqtt from 'mqtt';

export class Home extends Component {
  state = { status: false }
  client = null;
  componentDidMount() {
    // on page load
    this.client = mqtt.connect("mqtts://m21.cloudmqtt.com:36704", { clientId: 'javascript' + Math.random().toString(16).substr(2, 8), username: "rs-1", password: "rs-1", keepalive: 60, reconnectPeriod: 1000, protocolId: 'MQIsdp', protocolVersion: 3, clean: true, port: 36704, host: "mqtts://m21.cloudmqtt.com", });

    this.client.on('error', (err) => { console.log(err, "on error") })
  }

  onClick = () => {
    this.setState({ status: !this.state.status })
    this.client.publish("rs-1/pinMode", JSON.stringify({ "pin": 2, "set": 1 }), (err) => { if(err) console.log(err); });
    this.client.publish("rs-1/gpio", JSON.stringify({ "pin": 2, "set": 0, "duration": 1000 }));
  }

  render() {
    return (<section>
      <a rel="external" className={this.state.status ? "on" : "off"} onClick={this.onClick}
        href="#button" id="button"><i className="fas fa-power-off" /></a>
      <span></span>
    </section>);
  }
}