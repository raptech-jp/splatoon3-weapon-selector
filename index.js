const { Client, GatewayIntentBits, Partials, REST, EmbedBuilder, Routes } = require('discord.js');
const util = require('util');
require('dotenv').config();

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const jsonData = require('./weapons3.json');
const rest = new REST({ version: '10' }).setToken(TOKEN);

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel],
});

const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const player_list = ["player1", "player2", "player3", "player4", "player5", "player6", "player7", "player8"];

const getDistinctValues = (jsonData, properties) => properties.map(prop => Array.from(new Set(jsonData.weapons.map(weapon => weapon[prop]))));

const [weapon_list, type_list, sub_list, special_list] = getDistinctValues(jsonData, ['name', 'type', 'sub', 'special']);

console.log(util.inspect(weapon_list, { maxArrayLength: null }));
console.log(util.inspect(type_list, { maxArrayLength: null }));
console.log(util.inspect(sub_list, { maxArrayLength: null }));
console.log(util.inspect(special_list, { maxArrayLength: null }));

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

const playerOption = (player, required = false) => ({
    "name": player,
    "description": "プレイヤーを指定",
    "type": 6,
    "required": required
});

const commandOptions = (firstPlayer, ...restPlayers) => [
    playerOption(firstPlayer, true),
    ...restPlayers.map(player => playerOption(player))
];

const createCommand = (name, description, options) => ({
    name,
    description,
    options
});

const random_weapon = createCommand("random", "ブキをランダムで選択します", commandOptions(...player_list));
const search_weapon = createCommand("search", "ブキを絞り込んでランダムに選択します", [{ "name": "in", "description": "検索条件", "type": 3, "required": true }, ...commandOptions(...player_list)]);

client.once("ready", async () => {
    const commands = [random_weapon, search_weapon];

    rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);

    console.log("Ready!")
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }

    switch (interaction.commandName) {
        case 'random':

            var selected_list = []
            player_list.forEach(function (value) {
                if (interaction.options.getUser(value) != null) {
                    selected_list.push((interaction.options.getUser(value)).id)
                }
            })

            var weapon_list = []
            selected_list.forEach(function (value) {
                var number = Math.floor(Math.random() * jsonData.weapons.length)
                selected = jsonData.weapons[number];
                const embed = new EmbedBuilder()
                    .setColor(0xff0000)
                    .setTitle(selected.name)
                    .setFields(
                        { name: "Player", value: `<@${value}>` },
                        { name: "Sub weapon", value: selected.sub, inline: true },
                        { name: "Special weapon", value: selected.special, inline: true }
                    )
                weapon_list.push(embed)
                _sleep(5)
            })
            interaction.reply({ embeds: weapon_list })
            break;

        case 'search':
            var selected_list = []
            player_list.forEach(function (value) {
                if (interaction.options.getUser(value) != null) {
                    selected_list.push((interaction.options.getUser(value)).id)
                }
            })

            const name = interaction.options.getString('in')

            const search_type = weapon_type(name, type_list, sub_list, special_list)

            function weapon_type(name, type, sub, special) {
                if (type.some(function (value) {
                    return value === name
                })) {
                    return "type";
                } else if (sub.some(function (value) {
                    return value === name
                })) {
                    return "sub";
                } else if (special.some(function (value) {
                    return value === name
                })) {
                    return "special";
                } else {
                    return "None"
                }
            }

            function weapon_search(type) {
                var result = []
                switch (type) {
                    case "type":
                        jsonData.weapons.forEach(function (value) {
                            if (value.type == name) {
                                result.push(value)
                            }
                        })
                        break;
                    case "sub":
                        jsonData.weapons.forEach(function (value) {
                            if (value.sub == name) {
                                result.push(value)
                            }
                        })
                        break;
                    case "special":
                        jsonData.weapons.forEach(function (value) {
                            if (value.special == name) {
                                result.push(value)
                            }
                        })
                        break;
                    default:
                        ;
                }
                return result
            }

            const searched_weapon = weapon_search(search_type)

            if (searched_weapon.length === 0) {
                interaction.reply("該当するブキがありません")
            } else {
                var weapon_list = []
                selected_list.forEach(function (value) {
                    var number = Math.floor(Math.random() * searched_weapon.length)
                    selected = searched_weapon[number];
                    const embed = new EmbedBuilder()
                        .setColor(0xff0000)
                        .setTitle(selected.name)
                        .setFields(
                            { name: "Player", value: `<@${value}>` },
                            { name: "Sub weapon", value: selected.sub, inline: true },
                            { name: "Special weapon", value: selected.special, inline: true }
                        )
                    weapon_list.push(embed)
                    _sleep(5)
                })
                interaction.reply({ embeds: weapon_list })
                break;
            }
    }
});

client.login(TOKEN);
