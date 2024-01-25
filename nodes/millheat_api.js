module.exports = async function (RED) {
  let client = await import('millheat-js');
  function MillAPINode(n) {
    RED.nodes.createNode(this, n);
    if (this.credentials) {
      try {
        this.client = new client.Client(this.credentials);
      } catch (error) {
        console.error('Failed creating client: ', error);
      }
    }
  }

  MillAPINode.prototype.getHouses = async function () {
    console.log(this.client)
    return this.client.getHouses();
  };
  MillAPINode.prototype.getDevicesForHouse = async function (houseId) {
    return this.client.getDevicesForHouse(houseId);
  };
  MillAPINode.prototype.getIndependentDevicesForHouse = async function (houseId) {
    return this.client.getIndependentDevicesForHouse(houseId);
  };
  RED.nodes.registerType('millheat-api', MillAPINode, {
    credentials: {
      username: {type: 'text'},
      password: {type: 'password'},
    },
  });
};
