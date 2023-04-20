const fetch = require('node-fetch')

async function logJSONData() {
  const response = await fetch("http://localhost:3000/api/agent");
  const jsonData = await response.json();
  console.log(jsonData.data.agents.length);
}
logJSONData();
//  console.log(logJSONData());