CREATE DATABASE syarikat;

USE syarikat;

CREATE TABLE `users` (
  `id`            INT                   NOT NULL AUTO_INCREMENT,
  `full_name`     VARCHAR(75)           NOT NULL,
  `email`         VARCHAR(128)          NOT NULL,
  `password`      VARCHAR(225)          NOT NULL,
  `role`          ENUM('admin', 'user') NOT NULL DEFAULT 'user',
  `status`        BOOLEAN               NOT NULL DEFAULT 1,
  `refresh_token` VARCHAR(750),
  `created_at`    TIMESTAMP             NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`    TIMESTAMP             NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  UNIQUE KEY `email_unique` (`email`),
  UNIQUE KEY `refresh_token_unique` (`refresh_token`)
) ENGINE=InnoDB;

CREATE TABLE `regions` (
  `id`         INT         NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(25) NOT NULL,
  `created_at` TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  UNIQUE KEY `name_unique` (`name`)
) ENGINE=InnoDB;

CREATE TABLE `members` (
  `id`          INT                                           NOT NULL AUTO_INCREMENT,
  `no_induk`    VARCHAR(20)                                   NOT NULL,
  `full_name`   VARCHAR(75)                                   NOT NULL,
  `birth`       DATE,
  `father_name` VARCHAR(75)                                   NOT NULL,
  `address`     VARCHAR(125)                                  NOT NULL,
  `region_id`   INT                                           NOT NULL,
  `status`      ENUM('new', 'active', 'inactive', 'repeat') NOT NULL DEFAULT 'new',
  `image`       VARCHAR(750),
  `created_at`  TIMESTAMP                                     NOT NULL  DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  TIMESTAMP                                     NOT NULL  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  UNIQUE KEY `no_induk_unique` (`no_induk`),
  FOREIGN KEY (`region_id`) REFERENCES regions(`id`)
) ENGINE=InnoDB;

CREATE TABLE `events` (
  `id`          INT                          NOT NULL AUTO_INCREMENT,
  `name`        VARCHAR(25)                  NOT NULL,
  `type`        ENUM('dzikiran', 'kematian') NOT NULL,
  `description` VARCHAR(125) ,
  `created_at`  TIMESTAMP                    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  TIMESTAMP                    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `event_details` (
  `event_id`   INT       NOT NULL ,
  `member_id`  INT       NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`event_id`, `member_id`),
  FOREIGN KEY (`event_id`) REFERENCES events(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`member_id`) REFERENCES members(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;
