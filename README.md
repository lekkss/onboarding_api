# Bank Onboarding API

Bank Onboarding API is a Node.js application built with Express and Sequelize to facilitate user verification, KYC (Know Your Customer) processes, and the automatic creation of user profiles and bank accounts.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Introduction

Bank Onboarding API is designed to streamline user onboarding processes. It simplifies user verification through phone numbers, initiates a KYC process, and automatically creates user profiles and bank accounts, enhancing the overall user experience.

## Features

- **User Verification:** Verify users using their phone numbers and receive OTP codes for authentication.
- **KYC Process:** Initiate a KYC process for users to provide necessary identification details.
- **Automatic Profile Creation:** Upon completion of the KYC process, user profiles are automatically created.
- **Automatic Bank Account Creation:** A bank account is automatically generated for each user with the last 10 digits of the phonumber as an account number.

## Technologies Used

- **Node.js:** JavaScript runtime for server-side development.
- **Express.js:** Web framework for building APIs.
- **Sequelize:** ORM for interacting with MySQL databases using Node.js.
- **MySQL:** Relational database for data storage.

## Prerequisites

Ensure you have the following installed before setting up the project:

- [Node.js and npm](https://nodejs.org/)
- [MySQL](https://www.mysql.com/) or any compatible relational database

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/lekkss/onboarding_api.git

## Usage
2. Install necessary packages and Start the app:

   ```bash
   npm install
   npm start
   
