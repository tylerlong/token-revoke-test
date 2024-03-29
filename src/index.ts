import RingCentral from '@rc-ex/core';

const rc = new RingCentral({
  server: process.env.RINGCENTRAL_SERVER_URL,
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
});

const main = async () => {
  await rc.authorize({
    jwt: process.env.RINGCENTRAL_JWT_TOKEN!,
  });
  // save the old token
  const token = rc.token;

  // 1st refreshment
  await rc.refresh();

  // an arbitrary API call
  await rc.restapi().account().extension().get();

  // restore the old token
  rc.token = token;

  // refresh the old token again
  await rc.refresh();
};
main();
