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
//
type GuildMembersMap = {
    [guildId: string]: Array<string>;
}

let selectedMembers: GuildMembersMap = {}; // Store selected members per guild

client.once('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return; 

    if (interaction.commandName === CommandName.PickRandom) {
        const guild: Guild | null = interaction.guild;
        if (!guild) return;

        const args = interaction.options.get('members')?.value as string | undefined;
        let membersToPick: string[] = [];

        if (args) {
            const memberMentions = args.match(/<@!?(\d+)>/g) || [];
            membersToPick = memberMentions.map(mention => mention.replace(/\D/g, ''));

            selectedMembers[guild.id] = membersToPick;
        } else if (selectedMembers[guild.id]?.length) {
            membersToPick = selectedMembers[guild.id];
        }

        if (!membersToPick.length) {
            return interaction.reply("No members selected before. Please provide members at least once.");
        }

        const randomMemberId = randomPick(membersToPick);
        await interaction.reply(`🥳 <@${randomMemberId}> got out of the hat!`);
    }

    if (interaction.commandName === CommandName.DefineOrder) {
        const guild: Guild | null = interaction.guild;
        if (!guild) return;

        const args = interaction.options.get('members')?.value as string | undefined;
        let membersToOrder: Array<string> = [];

        if (args) {
            const memberMentions = args.match(/<@!?(\d+)>/g) || [];
            membersToOrder = memberMentions.map(mention => mention.replace(/\D/g, ''));
        } else if (selectedMembers[guild.id]?.length) {
            membersToOrder = [...selectedMembers[guild.id]];
        }

        if (!membersToOrder.length) {
            return interaction.reply("No members selected before. Please provide members at least once.");
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

