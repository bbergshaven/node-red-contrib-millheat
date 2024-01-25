module.exports = function (RED) {
  function MillheatNode(config) {
    RED.nodes.createNode(this, config);
    this.api = RED.nodes.getNode(config.apiRef);

    if (!this.api || this.api && !this.api.client) {
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
      try{
        switch (msg.query) {
          case 'getHouses':
            msg.payload = await this.api.getHouses();
            break;
          case 'getDevicesForHouse':
              msg.payload = await this.api.getDevicesForHouse(msg.houseId);
            break;
          case 'getIndependentDevicesForHouse':
            msg.payload = await this.api.getIndependentDevicesForHouse(msg.houseId);
            break;
          default:
            let errorMessage = 'Unknown query in msg';
            this.status({fill: 'red', shape: 'ring', text: errorMessage});
            done(errorMessage);
            return;
        }
      }catch(error){
        let errorMessage = `${error}`;
        this.status({fill: 'red', shape: 'ring', text: errorMessage});
        done(errorMessage);
        return;
      }
      this.status({});
      send(msg);
      done();
    });
  }
  RED.nodes.registerType('millheat', MillheatNode);
};
