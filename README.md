# Angular Spotify Clone with Supabase Backend

This README provides an overview of the Angular Spotify Clone project, a web application that allows users to upload and listen to songs they've created. This application utilizes the Supabase backend for data storage and management and is styled using Tailwind CSS.

## Table of Contents
- Introduction
- Features
- Getting Started
  - Prerequisites
  - Installation
- Usage
- Technologies Used
- Contributing
- License

## Introduction

The Angular Spotify Clone is a web application inspired by Spotify that allows users to upload and listen to their own music. This project uses the Angular framework for the frontend, Supabase for the backend, and Tailwind CSS for styling. Users can create accounts, upload their music, listen to songs, and manage their playlists.

## Features
- **User Authentication**: Users can sign up, log in, and maintain their own accounts.
- **Music Upload**: Users can upload their own songs with information like title, artist, album, and cover art.
- **Playlist Management**: Users can create and manage playlists, add and remove songs from playlists.
- **Music Playback**: Users can play songs, pause, skip, and adjust volume.
- **Search and Explore**: Users can search for songs and artists and explore new music.- 
- **User Profiles**: Users can view and edit their profiles.

## Getting Started

Follow these instructions to set up the Angular Spotify Clone on your local development environment.

### Prerequisites
Before you begin, ensure you have the following installed on your system:

- Node.js and npm (Node Package Manager)
- Angular CLI: Install using npm install -g @angular/cli

### Installation
  - Clone the repository:
    ````bash
    git clone https://github.com/richardHaggioGwati/angular_spotify.git

  - Change your working directory to the project folder:
    ````bash
    cd angular-spotify-clone
  
- Install project dependencies:
  ````bash
  npm install
  
- Create a Supabase project and configure the backend. Refer to the Supabase documentation for more information on setting up your Supabase project.

- Configure the Angular application to use your Supabase project by updating the environment variables in src/environments/environment.ts with your Supabase credentials.

- Start the development server:
  ````bash
  ng serve

- Open your web browser and navigate to http://localhost:4200/ to access the application.

## Usage
- Register for an account or log in if you already have one.
- Upload your songs and manage them in your library.
- Create and manage playlists.
- Search for songs and artists and explore new music.
- Enjoy listening to your uploaded songs.

## Technologies Used

- **Angular**: A powerful and flexible JavaScript framework for building web applications.
- **Supabase**: An open-source alternative to Firebase that provides authentication, database, storage, and real-time functionality for your application.
- **Tailwind CSS**: A utility-first CSS framework for designing responsive and beautiful web interfaces.
- **HTML/CSS**: For structuring and styling the user interface.
- **TypeScript**: A statically typed superset of JavaScript used for building the application.

## Contributing
We welcome contributions from the community! If you'd like to contribute to this project, please follow these steps:

1. Fork the project.
2. Create a new branch with a descriptive name: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push your changes to your fork: `git push origin feature/your-feature-name`.
5. Create a pull request, detailing the changes you've made and the issue it resolves.

## License
This project is licensed under the MIT License.

Thank you for using the Angular Spotify Clone with Supabase Backend and Tailwind CSS styling! If you have any questions or encounter issues, feel free to open an issue or reach out to me.

Happy listening and coding! 🎵🎧🎶
