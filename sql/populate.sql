INSERT INTO users (secret, first_name, last_name, email) VALUES ('TVBRW2DTRY35QXJRQKZAIEX3PKUID5O3', 'Rui', 'Pires', 'ruidgpires10@gmail.com');
INSERT INTO clients (id, name) VALUES ((select MAX(id) FROM users), 'Rui');

INSERT INTO users (secret, first_name, last_name, email) VALUES ('P7ZI2QTVTSPX6HPAQEU3HXFNBH6RCBLB', 'Ana', 'Duarte', 'anaritard@gmail.com');
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
