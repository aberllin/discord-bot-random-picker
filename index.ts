import { Client, GatewayIntentBits, Guild } from 'discord.js';
import { config } from 'dotenv';
import randomPick from 'random-item';
import { CommandName } from './deploy-commands.js';

config();

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMembers, 
    ] 
});


client.once('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === CommandName.PickRandom) {
        const guild = interaction.guild;
        if (!guild) return;

        const args = interaction.options.get('members')?.value as string | undefined;
        if (!args) {
            return interaction.reply("You must provide a list of members to pick from!");
        }

        const memberMentions = args.match(/<@!?(\d+)>/g) || [];
        const membersToPick = memberMentions.map(mention => mention.replace(/\D/g, ''));

        if (!membersToPick.length) {
            return interaction.reply("No valid members mentioned. Please mention users properly.");
        }

        const randomMemberId = randomPick(membersToPick);
        await interaction.reply(`🥳 <@${randomMemberId}> got out of the hat!`);
    }

    if (interaction.commandName === CommandName.DefineOrder) {
        const guild: Guild | null = interaction.guild;
        if (!guild) return;

        const args = interaction.options.get('members')?.value as string | undefined;
        if (!args) {
            return interaction.reply("You must provide a list of members to define an order!");
        }

        const memberMentions = args.match(/<@!?(\d+)>/g) || [];
        const membersToOrder = memberMentions.map(mention => mention.replace(/\D/g, ''));

        if (!membersToOrder.length) {
            return interaction.reply("No valid members mentioned. Please mention users properly.");
        }

        // Shuffle the array
        for (let i = membersToOrder.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [membersToOrder[i], membersToOrder[j]] = [membersToOrder[j], membersToOrder[i]];
        }

        const orderList = membersToOrder.map((id, index) => `${index + 1}. <@${id}>`).join("\n");
        await interaction.reply(`📜 Here’s the random order:\n${orderList}`);
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);
