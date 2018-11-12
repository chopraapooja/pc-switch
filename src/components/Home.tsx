import React, { Component } from "react";
import mqtt from 'mqtt';

const onError = (err) => {
  if (err) {
    console.error(err)
  }
}

export class Home extends Component {
  state = { status: false, hdd: false }
  client = null;
  componentDidMount() {
    // on page load
    this.client = mqtt.connect("mqtts://m21.cloudmqtt.com:36704", { clientId: 'javascript' + Math.random().toString(16).substr(2, 8), username: "rs-1", password: "rs-1", keepalive: 60, reconnectPeriod: 1000, protocolId: 'MQIsdp', protocolVersion: 3, clean: true, port: 36704, host: "mqtts://m21.cloudmqtt.com", });

    this.client.on('error', onError)
    this.client.subscribe("rs-1/monitor", onError)
    this.client.on('message', (topic, _message) => {
      // message is Buffer
      const message = JSON.parse(_message)
      this.setState({ hdd: message.analogValue == 0 ? false : true })
    })
  }
  
  componentWillUnmount() {
    this.closeConnection();
  }

  closeConnection = () => {
    this.client.publish("rs-1/monitorPins", JSON.stringify({ "pin": 5, "operation": "remove" }))
    this.client.unsubscribe(["rs-1/pinMode", "rs-1/gpio", "rs-1/monitorPins"])
    this.client.end();
  }

  onClick = () => {
    this.setState({ status: !this.state.status })
    this.client.publish("rs-1/pinMode", JSON.stringify({ "pin": 2, "set": 1 }), (err) => { if (err) console.log(err); });
    this.client.publish("rs-1/gpio", JSON.stringify({ "pin": 2, "set": 0, "duration": 1000 }));
    this.client.publish("rs-1/monitorPins", JSON.stringify({ "pin": 5, "operation": "add" }));
  }

  render() {
    return (<section>
      <a rel="external" className={(this.state.status ? "on" : "off")} onClick={this.onClick}
        href="#button" id="button"><i className="fas fa-power-off" /></a>
      <span className={"led " + (this.state.status ? "green-led" : "red-led")}></span>
      <span className={"led " + (this.state.hdd ? "" : "white-led")} style={{ bottom: '-30px' }}></span>
    </section>);
  }
}