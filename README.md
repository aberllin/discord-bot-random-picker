# Discord Random Picker Bot 🎲  

A simple Discord bot that allows users to pick a random member from a provided list or generate a randomized order of members. Useful for games, stand-up meetings, retrospective orders, and more!  

## Features  
✅ **Pick a Random Member**: Selects one random user from a list of mentioned members.  
✅ **Generate Random Order**: Shuffles the provided members into a random order for easy task assignments, turn-taking, etc.  

## Commands  

### `/pickrandom`  
**Description**: Selects one random user from a given list of mentioned members.  
**Usage**:  
`/pickrandom members: @User1 @User2 @User3`

**Response**:  
> 🥳 @User2 got out of the hat!  

### `/defineorder`  
**Description**: Generates a randomized order of the mentioned members.  
**Usage**:  
`/defineorder members: @User1 @User2 @User3`

**Response**:  
> 📜 Here’s the random order:  
> 1. @User3  
> 2. @User1  
> 3. @User2  

## Installation  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/aberllin/discord-bot-random-picker.git  
cd discord-bot-random-picker  
```

### 2️⃣ Install Dependencies
```sh
npm install  
```

### 3️⃣ Set Up Environment Variables
Create a .env file in the root directory and add your Discord bot credentials:
```sh
DISCORD_BOT_TOKEN=your-bot-token  
DISCORD_CLIENT_ID=your-client-id  
DISCORD_GUILD_ID=your-guild-id  
```

### 4️⃣ Deploy Commands
Register the bot's slash commands before running it:
```sh
npm run deploy  
```

### 5️⃣ Start the Bot
```sh
npm run start  
```

## Contributions 🤝
Feel free to fork the repo, submit pull requests, and improve the bot! 🚀

## License
This project is MIT Licensed.

Enjoy using the bot! 🎉