# Instruction On How To Run This App

This is a infinite scrolling web app for exploring Marvel's comics using Marvel API. Builded with Next.js, Tailiwind and axios. Bellow are the instructions for running it properly on your local machine.

## Setting Up Environment Variables

To run this project, you will need to set up the following environment variables:

- NEXT_PUBLIC_MARVEL_PUBLIC_KEY 
- MARVEL_PRIVATE_KEY

You can take a pair of keys after you create a Marvel developer account here: https://developer.marvel.com/

To set up environment variables, create a new file named `.env.local` in the root directory of the project. Copy the contents of `.env.example` into `.env.local` and replace the placeholder values with your own values. It is also recommended to delete the `.env.example` after this process.

## Install Dependencies

Open your terminal inside the root directory and install all dependencies using 
```console
npm install
```

## Run The App

Hit:
```console
npm run dev
``` 
That's it. Happy infinite scrolling!

