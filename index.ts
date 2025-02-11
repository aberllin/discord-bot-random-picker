import { Client, GatewayIntentBits, CommandInteraction, Guild } from 'discord.js';
import { config } from 'dotenv';
import randomPick from 'random-item';

config(); // Load environment variables

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMembers, 
    ] 
});

interface GuildMembersMap {
    [guildId: string]: string[];
}

let selectedMembers: GuildMembersMap = {}; // Store selected members per guild

client.once('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return; // ✅ Fix: Proper type guard

    if (interaction.commandName === 'pickrandom') {
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
});

client.login(process.env.DISCORD_BOT_TOKEN);
