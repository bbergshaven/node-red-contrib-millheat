module.exports = function (RED) {
  function MillheatNode(config) {
    RED.nodes.createNode(this, config);
    this.api = RED.nodes.getNode(config.apiRef);

    if (this.api && !this.api.client) {
      this.status({
        fill: 'red',
        shape: 'ring',
        text: 'Credentails are invalid',
      });
    }

    this.on('input', async function (msg, send, done) {
      if (!msg.hasOwnProperty('query')) {
        let errorMessage = 'Missing query in msg';
        this.status({fill: 'red', shape: 'ring', text: errorMessage});
        done(errorMessage);
        return;
      }
      switch (msg.query) {
        case 'selectDevice2020':
          msg.payload = await this.api.selectDevice2020(msg.deviceId);
          break;
        case 'getIndependentDevices2020':
          msg.payload = await this.api.getIndependentDevices2020(msg.homeId);
          break;
        case 'selectDeviceByRoom2020':
          msg.payload = await this.api.selectDeviceByRoom2020(msg.roomId);
          break;
        case 'selectHomeList':
          msg.payload = await this.api.selectHomeList();
          break;
        case 'selectRoomByHome2020':
          msg.payload = await this.api.selectRoomByHome2020(msg.homeId);
          break;
        default:
          let errorMessage = 'Unknown query in msg';
          this.status({fill: 'red', shape: 'ring', text: errorMessage});
          done(errorMessage);
          return;
      }

      send(msg);
      done();
    });
  }
  RED.nodes.registerType('millheat', MillheatNode);
};
