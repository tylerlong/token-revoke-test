import RingCentral from '@rc-ex/core';
import waitFor from 'wait-for-async';

const rc = new RingCentral({
  server: process.env.RINGCENTRAL_SERVER_URL,
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
});

const main = async () => {
  await rc.authorize({
    jwt: process.env.RINGCENTRAL_JWT_TOKEN!,
  });
  const token = rc.token;

  // for (let i = 0; i < 6; i++) {
  //   await rc.authorize({
  //     jwt: process.env.RINGCENTRAL_JWT_TOKEN!,
  //   });
  //   console.log(i);
  //   await waitFor({ interval: 2000 });
  // }

  // await rc.revoke();

  await rc.refresh();
  await rc.restapi().account().extension().get();
  rc.token = token;
  // await waitFor({ interval: 2000 });
  await rc.refresh();
  // const r = await rc.restapi().account().extension().get();
  // console.log(r);
};
main();
