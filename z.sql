INSERT INTO roles (id, name) VALUES
(1, 'Super Admin' ),
(2, 'Admin' ),
(3, 'Supervisor' ),
(4, 'Smart Agent' ),
(5, 'Farmer' ),
(6, 'Aggregator' ),
(7, 'Buyer' );

DELETE FROM roles WHERE name='Staff';

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

DROP TABLE IF EXISTS `lgas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lgas` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `lgas_state_id_foreign` (`state_id`),
  CONSTRAINT `lgas_state_id_foreign` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`)
) 
ENGINE=InnoDB AUTO_INCREMENT=775 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
