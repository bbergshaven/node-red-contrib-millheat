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

  MillAPINode.prototype.selectDevice2020 = async function (deviceId) {
    return this.client.selectDevice2020(deviceId);
  };
  MillAPINode.prototype.getIndependentDevices2020 = async function (homeId) {
    return this.client.getIndependentDevices2020(homeId);
  };
  MillAPINode.prototype.selectDeviceByRoom2020 = async function (roomId) {
    return this.client.selectDeviceByRoom2020(roomId);
  };
  MillAPINode.prototype.selectHomeList = async function () {
    return this.client.selectHomeList();
  };
  MillAPINode.prototype.selectRoomByHome2020 = async function (homeId) {
    return this.client.selectRoomByHome2020(homeId);
  };

  RED.nodes.registerType('millheat-api', MillAPINode, {
    credentials: {
      access_key: {type: 'text'},
      secret_token: {type: 'password'},
      username: {type: 'text'},
      password: {type: 'password'},
    },
  });
};
