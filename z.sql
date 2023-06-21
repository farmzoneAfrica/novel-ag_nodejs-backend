INSERT INTO roles (id, name) VALUES
(1, 'Super Admin' ),
(2, 'Admin' ),
(3, 'Supervisor' ),
(4, 'Smart Agent' ),
(5, 'Farmer' ),
(6, 'Aggregator' ),
(7, 'Buyer' );

DELETE FROM roless WHERE name='Staff';

select * from local_governments where state_id="7";

❯
INSERT INTO roles (id, name, is_admin) VALUES
(1, 'Super Admin', 0),
(2, 'Admin', 1),
(3, 'Supervisor', 1 ),
(4, 'Smart Agent', 1 ),
(5, 'Farmer', 0),
(6, 'Aggregator', 0 ),
(7, 'Buyer', 0);