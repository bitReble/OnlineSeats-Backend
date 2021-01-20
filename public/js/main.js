// POST /auth/signup/operator
const signupOperatorRequestDiv = document.getElementById(
  "signup-operator-request"
);

const signupOperatorRequest = JSON.stringify(
  {
    body: {
      email: "example@gmail.com",
      password: "password",
      name: "example",
    },
  },
  null,
  2
);

signupOperatorRequestDiv.innerHTML = `<pre>${signupOperatorRequest}</pre>`;

const signupOperatorResponseDiv = document.getElementById(
  "signup-operator-response"
);

const signupOperatorResponse = JSON.stringify(
  {
    body: {
      _id: "6007e37b845b3c27444cc02b",
      msg: "operator was successfully created!",
    },
  },
  null,
  2
);

signupOperatorResponseDiv.innerHTML = `<pre>${signupOperatorResponse}</pre>`;

// POST /auth/signin/admin
const signinAdminRequestDiv = document.getElementById("signin-admin-request");

const signinAdminRequest = JSON.stringify(
  {
    body: {
      email: "example@gmail.com",
      password: "password",
    },
  },
  null,
  2
);

signinAdminRequestDiv.innerHTML = `<pre>${signinAdminRequest}</pre>`;

const signinAdminResponseDiv = document.getElementById("signin-admin-response");

const signinAdminResponse = JSON.stringify(
  {
    body: {
      msg: "successfully logged in!",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.oISS84G",
      user_id: "6007b113550d982700af7618",
      expires_in: 7200,
    },
  },
  null,
  2
);

signinAdminResponseDiv.innerHTML = `<pre>${signinAdminResponse}</pre>`;

// POST /auth/signin/operator
const signinOperatorRequestDiv = document.getElementById(
  "signin-operator-request"
);

const signinOperatorRequest = JSON.stringify(
  {
    body: {
      email: "example@gmail.com",
      password: "password",
    },
  },
  null,
  2
);

signinOperatorRequestDiv.innerHTML = `<pre>${signinOperatorRequest}</pre>`;

const signinOperatorResponseDiv = document.getElementById(
  "signin-operator-response"
);

const signinOperatorResponse = JSON.stringify(
  {
    body: {
      msg: "successfully logged in!",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.oISS84G",
      user_id: "6007b113550d982700af7618",
      expires_in: 7200,
    },
  },
  null,
  2
);

signinOperatorResponseDiv.innerHTML = `<pre>${signinOperatorResponse}</pre>`;
