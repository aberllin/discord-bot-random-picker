import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { config } from 'dotenv';

config();

const commands = [
    new SlashCommandBuilder()
        .setName('pickrandom')
        .setDescription('Pick a random participant from the selected list.')
        .addStringOption(option => 
            option.setName('members')
                .setDescription('Mention members to pick from')
                .setRequired(true)
        ),
].map(command => command.toJSON());

const clientId = process.env.DISCORD_CLIENT_ID!;
const guildId = process.env.DISCORD_GUILD_ID!;
const botToken = process.env.DISCORD_BOT_TOKEN!;

const rest = new REST({ version: '9' }).setToken(botToken);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
