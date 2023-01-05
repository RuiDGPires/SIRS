INSERT INTO users (secret) VALUES ('TVBRW2DTRY35QXJRQKZAIEX3PKUID5O3');
INSERT INTO clients (id, name) VALUES ((select MAX(id) FROM users), 'Rui');

INSERT INTO users (secret) VALUES ('P7ZI2QTVTSPX6HPAQEU3HXFNBH6RCBLB');
INSERT INTO employees (id, name) VALUES ((select MAX(id) FROM users), 'Rita');


INSERT INTO bikes (latitude, longitude, rightly_parked) VALUES (
    38.737784,
    -9.137769,
    false
);
INSERT INTO bikes (latitude, longitude, rightly_parked) VALUES (
    38.736134,
    -9.136855,
    true
);
INSERT INTO bikes (latitude, longitude, rightly_parked) VALUES (
    38.738239,
    -9.139268,
    true
);
