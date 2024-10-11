# Interview App

## Purpose
This project demonstrates user management using Auth0 and Marvel API integration with a microfrontend architecture. It is built using React, TypeScript, Redux, and MUI.

## Installation
- Clone the repository.
- Run `npm install` to install dependencies.
- Start the project with `npm start`.

## How to Use
- Configure `.env` for Auth0 and Marvel API credentials.
- Upon successful login, users can view their profile and interact with the Marvel API.

## Modules
- **User Management**: Handles user authentication and authorization using Auth0.
- **Marvel Dashboard**: Fetches and displays data from Marvel API.

## Recent Updates
- **JWT Token Management**: Implemented local storage support for JWT tokens and added expiration check logic to ensure token validity.
- **User Info Handling**: Updated the Redux state management to safely handle user information and prevent TypeScript errors when user data is unavailable.
- **Redux Integration**: Enhanced the application’s architecture with Redux to manage authentication and user state efficiently.

