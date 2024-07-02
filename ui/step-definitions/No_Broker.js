const { client } = require('nightwatch-api');
const { createSession, closeSession, startWebDriver, stopWebDriver } = require('nightwatch-api');
const { Given, Then, When } = require('@cucumber/cucumber');


Given('user opens the No Broker application URL', async() => {
  await startWebDriver();
  await createSession();
  let noBroker = client.page.noBroker();

  return noBroker.enterUrl(client, client.globals.baseURL);
});

Then('verify the user has successfully opened the application', () => {
  let noBroker = client.page.noBroker();

  return noBroker.verifySuccessHomePageOpen(client);
});

Then('user select property type', () => {
  let noBroker = client.page.noBroker();

  return noBroker.propertyType(client)
});

Then('user select location as "{}"', (location) => {
  let noBroker = client.page.noBroker();

  return noBroker.selectLocation(client, location)
});

Then('user select living arrangements as "{}"', (living_type) => {
  let noBroker = client.page.noBroker();

  return noBroker.selectLivingType(client, living_type)
});

Then('user select tenant type as "{}"', (tenant_type) => {
  let noBroker = client.page.noBroker();

  return noBroker.selectTenantType(client, tenant_type)
});

Then('user select room type as "{}"', (room_type) => {
  let noBroker = client.page.noBroker();

  return noBroker.selectRoomType(client, room_type)
});

When('user search the property', () => {
  let noBroker = client.page.noBroker();

  return noBroker.selectSearchButton(client)
});

When('user verify tenant type "{}" check box is selected', (tenant_type) => {
  let noBroker = client.page.noBroker();

  return noBroker.verifyTenantTypeCheckBox(client, tenant_type)
});

Then('session is closed', async() => {
  await closeSession();
  await stopWebDriver();
});

