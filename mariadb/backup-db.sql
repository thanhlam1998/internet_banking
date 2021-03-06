-- MariaDB dump 10.17  Distrib 10.4.13-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: banking
-- ------------------------------------------------------
-- Server version	10.4.13-MariaDB-1:10.4.13+maria~focal

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `username` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `admin_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `hashed_password` text COLLATE utf8_unicode_ci NOT NULL,
  `refresh_secret` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('admin',1,'$2a$08$tT9.sSFa5uwExy50PuHWy.4JSoNE09V2Sn1hR5kDCHyJ9joNP/YHO','GgSlLwoRug1w3iypWF4F');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credit_account`
--

DROP TABLE IF EXISTS `credit_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `credit_account` (
  `customer_id` int(11) NOT NULL,
  `credit_number` char(30) COLLATE utf8_unicode_ci NOT NULL,
  `balance` char(30) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`credit_number`),
  KEY `fk_creacc_customer` (`customer_id`),
  CONSTRAINT `credit_account_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit_account`
--

LOCK TABLES `credit_account` WRITE;
/*!40000 ALTER TABLE `credit_account` DISABLE KEYS */;
INSERT INTO `credit_account` VALUES (3,'025917154505','100000',1),(13,'107837111136','100000',1),(14,'134965984343','100000',1),(12,'156395860413','100000',1),(8,'317616012583','100000',1),(7,'400570008578','100000',1),(4,'407103851140','100000',1),(6,'413951248131','100000',1),(1,'565572661049','500000',1),(11,'597909357040','100000',1),(5,'625262950070','100000',1),(10,'752756900169','100000',1),(9,'821070931989','100000',1);
/*!40000 ALTER TABLE `credit_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `identity_number` char(10) COLLATE utf8_unicode_ci NOT NULL,
  `firstname` char(20) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `date_of_birth` date NOT NULL,
  `phone_number` char(10) COLLATE utf8_unicode_ci NOT NULL,
  `email_address` text COLLATE utf8_unicode_ci NOT NULL,
  `username` char(30) COLLATE utf8_unicode_ci NOT NULL,
  `hashed_password` char(70) COLLATE utf8_unicode_ci NOT NULL,
  `refresh_secret` char(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `identity_number` (`identity_number`),
  UNIQUE KEY `phone_number` (`phone_number`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'025895863','LINH','NGUYEN VAN','1998-11-12','0704468257','linh1612340@gmail.com','linh','$2a$08$gKlA.6Ie2HfU/IzgambPXOG.YinikOdf6pwaZxU6QBEB9ZWOyhinS','5FmWSukHG8PapSAcGrNS'),(3,'025895864','KHUE','DOAN','1998-11-12','0704468258','linh0903611@gmail.com','khue','$2a$08$YvaUktj.B6M4pBWWf6gqsujOcas03q3rIPZNI/8zW14rfS/WiN8P6','6sDwx1T5t8IMSPpsLmYS'),(4,'025842863','JINDO','KATORY','1998-11-12','0704468557','jindo@gmail.com','jindo','$2a$08$7q6hgvv71cKCHI.GiM9Z.unu9BBYPUl/lnnUrq8tbugxOrEkqujbe','KW7l0ATa4MutpvM7hhsW'),(5,'346018170','DONALD','TRUMP','1970-08-11','0346018170','donaldtrump@gmail.com','donaldtrump','$2a$08$opMPviHkHzOeu0H6puFgl.6fgs9AuEZDmz4pztXdgqEpgj2Ttbycm','7kfas1b4dcXnwRfit1Ld'),(6,'294038801','BARACK','OBAMA','1976-08-07','0294038801','barackobama@gmail.com','barackobama','$2a$08$ikByeoIAB3p90S/CTIps9uasfVQ7LMziAy4pn72bPpFeHur4N5/ou','lzQSnkyn9ISklZh0IqzK'),(7,'850297117','GEORGE','BUSH','1964-08-17','0850297117','georgebush@gmail.com','georgebush','$2a$08$CDRnEEzdsnRQfSo8aE/5vuXaMeBpwFQHYuz3nLrQmKsd/iQFDP3Im','Fgk71XyXgbO8PC2zgRtT'),(8,'407713428','BILL','CLINTON','1827-08-17','0407713428','billclinton@gmail.com','billclinton','$2a$08$79MptGssegFG3gmF0dwjmuuxmUregNRavOVMtWG46L.N8PFaaTGe2','SE0qH7FD3VyUy8vmHyX9'),(9,'475890764','RONALD','REAGAN','1821-08-06','0475890764','ronaldreagan@gmail.com','ronaldreagan','$2a$08$W5CwKqADgBFbYqiqBn19EudvCz6ZT9Wm.ShiOit0SSY0qYUS39cY2','RHAgr3XFxwWoEuDH5yPE'),(10,'189420657','JIMMY','CARTER','1728-08-08','0189420657','jimmycarter@gmail.com','jimmycarter','$2a$08$2wVb6QTMxzXnZc4dgoTrT.zW5nsrrd6O3vmZh9QxwrBG6jWmNJVFy','MTniZYgH2JFDZexUtKJo'),(11,'587590629','GERALD','FORD','1711-08-02','0587590629','geraldford@gmail.com','geraldford','$2a$08$0Sxq3HXfhlL5ShvSqhs1n.ZsqrBPXHaLGrEOPNWR7H0XQ3DuaInSi','qc80J3U5vx4oYcKWI0D8'),(12,'438542752','RICHARD','NIXON','1677-08-25','0438542752','richardnixon@gmail.com','richardnixon','$2a$08$kB7LjjMAynOm//9QpU0VTu4LsHvt/4wKPifmB/78CaDhMpYf/VSoK','rJCxpJqwWIn6yLsxwUPm'),(13,'121398875','LYNDON','JOHNSON','1676-07-26','0121398875','lyndonjohnson@gmail.com','lyndonjohnson','$2a$08$XbXYUZYCfyDNaVqr3Arcs.4QOPBPrh8RCu/0e0/zsW9bxTTi/nJMm','EgNrhcU5XXO3RIqfnnAc'),(14,'484338172','JOHN','KENNEDY','1661-07-06','0484338172','johnkennedy@gmail.com','johnkennedy','$2a$08$vde8BAbibs7SJOLosKUnk.KlAZqbFOr344bjftSn/gitZGxpduby2','gW2rZqoVBoy3icJWJz4a');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debt`
--

DROP TABLE IF EXISTS `debt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `debt` (
  `debt_id` int(11) NOT NULL AUTO_INCREMENT,
  `lender_id` int(11) DEFAULT NULL,
  `lender_name` varchar(100) DEFAULT NULL,
  `debtor_id` int(11) DEFAULT NULL,
  `debtor_name` varchar(100) DEFAULT NULL,
  `amount` char(30) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`debt_id`),
  KEY `lender_id` (`lender_id`),
  KEY `debtor_id` (`debtor_id`),
  CONSTRAINT `debt_ibfk_1` FOREIGN KEY (`lender_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `debt_ibfk_2` FOREIGN KEY (`debtor_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debt`
--

LOCK TABLES `debt` WRITE;
/*!40000 ALTER TABLE `debt` DISABLE KEYS */;
/*!40000 ALTER TABLE `debt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deposit_transaction_history`
--

DROP TABLE IF EXISTS `deposit_transaction_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deposit_transaction_history` (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `credit_number` char(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `amount` bigint(20) unsigned DEFAULT NULL,
  `ts` bigint(20) unsigned DEFAULT NULL,
  `partner_code` char(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `credit_number` (`credit_number`),
  CONSTRAINT `deposit_transaction_history_ibfk_1` FOREIGN KEY (`credit_number`) REFERENCES `credit_account` (`credit_number`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deposit_transaction_history`
--

LOCK TABLES `deposit_transaction_history` WRITE;
/*!40000 ALTER TABLE `deposit_transaction_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `deposit_transaction_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee` (
  `username` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `employee_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `hashed_password` text COLLATE utf8_unicode_ci NOT NULL,
  `refresh_secret` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('linhnguyen',2,'$2a$08$GBxBwOQmgqnPey6V5U4PA.zWaB3l9EZHu40bgkXFdv0s0UBNxFv02','EmSa4EasanF0ZKEaVaz4'),('lamnguyen',3,'$2a$08$l5V2RG6RCcCEPLmQaHNkC.kkR9.qE8mUloirE.Z1P97eAAB7fMFy2','t4N7oZ7BUurlnQIlo1D1'),('khuedoan',4,'$2a$08$hTti.RNvkUKldXxc24okHO5ZKOGoI7CBBegImM1WRKwR9pFsKTVp.','6gvqJetSstbDbHwFxXit');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partner_api`
--

DROP TABLE IF EXISTS `partner_api`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partner_api` (
  `partner_id` int(11) NOT NULL AUTO_INCREMENT,
  `partner_code` char(20) COLLATE utf8_unicode_ci NOT NULL,
  `bankname` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `public_key` text COLLATE utf8_unicode_ci NOT NULL,
  `bank_secret` char(20) COLLATE utf8_unicode_ci NOT NULL,
  `partner_secret` char(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`partner_id`),
  UNIQUE KEY `bankname` (`bankname`),
  UNIQUE KEY `partner_code` (`partner_code`),
  UNIQUE KEY `public_key` (`public_key`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partner_api`
--

LOCK TABLES `partner_api` WRITE;
/*!40000 ALTER TABLE `partner_api` DISABLE KEYS */;
INSERT INTO `partner_api` VALUES (1,'linh','linhbank','LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFEQ0JpUUtCZ1FDSmxRWi9tMStpTGZLL2xwWURtaWNsZTZ2MApsbExXdGRZaFNrSDZidWlPck5iYVhWSC8vWmNHOVRwT0xVMXZMK1BrdnByQ1ovTjFTdHF6MHhOcnpjZFQwekZJCnhRU3IzMWZCMXF6RDIrVDRuakJjR1JPU3R2MHV4aGFhcm1XVkp3akxpYTBybEw3Z3JSTDBheHc0ckVTTTluc04KYmU4WG5KR1ZLdEZ5OU1YSEJ3SURBUUFCCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ==','kQYtFpj7pJfi5VVfoeGD','idk'),(2,'NaniBank','NaniBank','LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFnc1JybVl2cUZlWEdudExSYS84NApaeDdJNWlKa0RZTlZsQ1hDeHIyV1ZBb1lLa2lRV1cvamxERDRPRWhLQ1pDSmdWVkdUNDNYeFVrUTNzdjcrZVZPCjFNTzFpU2JNcWw5NlZTQkx3eWJJZlByRmpNWG5vWEU0bGdSeTA2bEFtQ1NUbWp2V1pXNnhybEdSd2RrV054SWIKa3RSNmVSaUkvL0VSS3FoRk0rWFoydXIveFR5djI4aFpoajhVSW55SEpvZ2ZQaVgvY2FsMWRyLzdHS3pxeXFVcAovbVJudGEzMWhWWlpzWGIxTENRdHluWkk2cGZVS0xaN2pvazRMN0xtK1M5K0QzZGhjTXhCd0pEMTVJakNEdFFFCjM3bGh1YVJXQjcyaE9wTkZYRkVVV1hsNDA4U01SeXFiR1Bwcy91K1RFbXN0eW85cXlVdmR3V0ViTWczR21FN00KR1FJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t','M0ec3lAqjHV82v66VYDb','himom'),(3,'bankdbb','bankdbb','LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZU1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTUFEQ0JpQUtCZ0h2R2ZDck9zTFBvbEtUT3BycXpndU5wODVnawpHZGgvd2JDQnRYQnRYN09iTVNQcUJOMGFGZ2lqUmZuME5Lb2xJbjBpZXZFaWFiODJ0dEJPNTdGR2dOV0crZm0vCkNxWDcyZE9waXQ5QTVXcWR3S1k1aUkvMHlPK1dOTXRKcUx3SjVxcy9DcDBFd0ZBYnFNaC80VXhzeWFpdzAyOWgKWDJJSkVkVzhvWWIrMG13UEFnTUJBQUU9Ci0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ==','Tj0xYDEDiQF9f2GYCxSv','bankdbb'),(4,'N42','nhom42bank','LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFEQ0JpUUtCZ1FDQ1AxTXhjdWlRUVM5N2ROdWVFNmI2dzVJWApybHdpRU5OU1dSZThVd1Fpa0VNUW5qU3NxZ3BlWFJiUm8ybWpTZ2V4cGxuNDE2UFAvRlBYUmg2clMxcHVDeUxMCk40Z1hZYTdwbFF5ZDU4NkV3NE9CVlZGV25hN29oSmNNTGJWWDF3Z0FwWmRlYmJpbm5VeG5JN0E2WkdMOVFrRysKN29UWWZOb0ZYSDdXR3NaUWJ3SURBUUFCCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQo=','HjvV0rNq1GOvnPZmNaF3','_(5KmP*YcTM(@?:');
/*!40000 ALTER TABLE `partner_api` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receive_from_transaction_history`
--

DROP TABLE IF EXISTS `receive_from_transaction_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `receive_from_transaction_history` (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `credit_number` char(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `from_credit_number` char(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `amount` bigint(20) unsigned DEFAULT NULL,
  `message` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `partner_code` char(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ts` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `credit_number` (`credit_number`),
  KEY `receive_from_transaction_history_FK` (`from_credit_number`),
  CONSTRAINT `receive_from_transaction_history_ibfk_1` FOREIGN KEY (`credit_number`) REFERENCES `credit_account` (`credit_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receive_from_transaction_history`
--

LOCK TABLES `receive_from_transaction_history` WRITE;
/*!40000 ALTER TABLE `receive_from_transaction_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `receive_from_transaction_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `remind_list`
--

DROP TABLE IF EXISTS `remind_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `remind_list` (
  `remind_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `credit_number` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `remind_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `partner_code` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`remind_id`),
  UNIQUE KEY `remind_list_UN` (`customer_id`,`credit_number`),
  KEY `remind_list_FK` (`customer_id`),
  CONSTRAINT `remind_list_FK` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `remind_list`
--

LOCK TABLES `remind_list` WRITE;
/*!40000 ALTER TABLE `remind_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `remind_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reset_password_otp`
--

DROP TABLE IF EXISTS `reset_password_otp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reset_password_otp` (
  `reset_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `otp` varchar(6) COLLATE utf8_unicode_ci NOT NULL,
  `status` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `ts` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`reset_id`),
  KEY `reset_password_otp_FK` (`customer_id`),
  CONSTRAINT `reset_password_otp_FK` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reset_password_otp`
--

LOCK TABLES `reset_password_otp` WRITE;
/*!40000 ALTER TABLE `reset_password_otp` DISABLE KEYS */;
/*!40000 ALTER TABLE `reset_password_otp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saving_account`
--

DROP TABLE IF EXISTS `saving_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `saving_account` (
  `account_id` int(11) NOT NULL AUTO_INCREMENT,
  `credit_number` char(30) COLLATE utf8_unicode_ci NOT NULL,
  `balance` char(30) COLLATE utf8_unicode_ci NOT NULL,
  `customer_id` int(11) NOT NULL,
  PRIMARY KEY (`account_id`),
  KEY `fk_saveacc_customer` (`customer_id`),
  CONSTRAINT `saving_account_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saving_account`
--

LOCK TABLES `saving_account` WRITE;
/*!40000 ALTER TABLE `saving_account` DISABLE KEYS */;
/*!40000 ALTER TABLE `saving_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sent_to_transaction_history`
--

DROP TABLE IF EXISTS `sent_to_transaction_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sent_to_transaction_history` (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `credit_number` char(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `to_credit_number` char(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `amount` bigint(20) unsigned DEFAULT NULL,
  `message` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `partner_code` char(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ts` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `credit_number` (`credit_number`),
  KEY `sent_to_transaction_history_FK` (`to_credit_number`),
  CONSTRAINT `sent_to_transaction_history_ibfk_1` FOREIGN KEY (`credit_number`) REFERENCES `credit_account` (`credit_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sent_to_transaction_history`
--

LOCK TABLES `sent_to_transaction_history` WRITE;
/*!40000 ALTER TABLE `sent_to_transaction_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `sent_to_transaction_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_otp`
--

DROP TABLE IF EXISTS `transaction_otp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaction_otp` (
  `transaction_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `from_credit_number` char(30) COLLATE utf8_unicode_ci NOT NULL,
  `to_credit_number` char(30) COLLATE utf8_unicode_ci NOT NULL,
  `amount` bigint(20) unsigned NOT NULL,
  `message` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fee_payer` char(10) COLLATE utf8_unicode_ci NOT NULL,
  `partner_code` char(20) COLLATE utf8_unicode_ci NOT NULL,
  `otp` char(6) COLLATE utf8_unicode_ci NOT NULL,
  `ts` bigint(20) unsigned NOT NULL,
  `status` char(10) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `transaction_otp_FK_1` (`from_credit_number`),
  KEY `transaction_otp_FK_2` (`to_credit_number`),
  KEY `transaction_otp_FK` (`customer_id`),
  CONSTRAINT `transaction_otp_FK` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `transaction_otp_FK_1` FOREIGN KEY (`from_credit_number`) REFERENCES `credit_account` (`credit_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_otp`
--

LOCK TABLES `transaction_otp` WRITE;
/*!40000 ALTER TABLE `transaction_otp` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction_otp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `withdraw_transaction_history`
--

DROP TABLE IF EXISTS `withdraw_transaction_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `withdraw_transaction_history` (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `credit_number` char(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `amount` bigint(20) unsigned DEFAULT NULL,
  `ts` bigint(20) unsigned DEFAULT NULL,
  `partner_code` char(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `credit_number` (`credit_number`),
  CONSTRAINT `withdraw_transaction_history_ibfk_1` FOREIGN KEY (`credit_number`) REFERENCES `credit_account` (`credit_number`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `withdraw_transaction_history`
--

LOCK TABLES `withdraw_transaction_history` WRITE;
/*!40000 ALTER TABLE `withdraw_transaction_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `withdraw_transaction_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'banking'
--
/*!50003 DROP PROCEDURE IF EXISTS `deposit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `deposit`(
	IN accNum char(30),
	IN amount int
)
BEGIN
	DECLARE bl int;
	START TRANSACTION;

	SELECT balance INTO bl FROM banking.credit_account WHERE credit_number = accNum FOR UPDATE;
	UPDATE banking.credit_account SET balance = amount + bl WHERE credit_number = accNum;

	COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `withdraw` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `withdraw`(
	IN accNum char(30),
	IN amount int
)
BEGIN
	DECLARE moneyLeft int;
	DECLARE bl int;
	START TRANSACTION;

	SELECT balance INTO bl FROM banking.credit_account WHERE credit_number = accNum FOR UPDATE;
	SET moneyLeft = bl - amount;
	IF moneyLeft < 50000 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'account balance insufficient';
	ELSE
		UPDATE banking.credit_account SET balance = moneyLeft WHERE credit_number = accNum;
	END IF;
	COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-19 14:27:15
