import {Client, Intents, Collection, MessageEmbed, MessageAttachment, DiscordAPIError, MessageSelectMenu, CommandInteractionOptionResolver} from 'discord.js';
import require from 'dotenv/config';
import fetch from 'node-fetch';
import { promises as fs } from "fs";
const botToken = process.env.BOT_TOKEN;


const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

bot.on("ready", () => {
    console.log("The bot is ready");
});

bot.on('messageCreate', message => {
    if(!message.content.startsWith(process.env.BOT_PREFIX || message.author.bot)) return;

    const args = message.content.slice(process.env.BOT_PREFIX.length).split(/ + /);
    const command = args.shift().toLocaleLowerCase();

    if(command === "twerk"){
        message.channel.send("Twerk it <@" + message.author.id + ">");
    }

    if(command === "plums"){
        message.channel.send("<@538930976374652928> fix your bot.");
    }

    if(command === "rice"){
        async function addRice(){
            async function readData(){

                let dataX = fs.readFile('rice.json', 'utf8', function(err, data) {
                    return data;
                });

                return dataX;

            }

            var dataFromFile = await readData();
            dataFromFile = JSON.parse(dataFromFile);

            dataFromFile.grains = dataFromFile.grains + 1;

            var grainsToSay = dataFromFile.grains;

            fs.writeFile('rice.json', JSON.stringify(dataFromFile), function(err) {
                if(err) throw err;
                console.log('The grains have been restored!');
            });
            if (grainsToSay == 1) {
                message.channel.send('<@675621674154065922> now has ' + grainsToSay + ' grain of rice!');
            }
            else {
                if(grainsToSay < 200) {
                    message.channel.send('<@675621674154065922> now has ' + grainsToSay + ' grains of rice!');
                }
                else{
                    message.channel.send('<@675621674154065922> it is time - Please select your fish....');
                    message.channel.send('!Tuna, !Salmon or !Yellowtail?');                    
                }
            }
        }
        addRice();
    }

    if(command === "tuna" || command === "salmon" || command === "yellowtail"){
        async function selectFish(){
            async function readData(){

                let dataX = fs.readFile('rice.json', 'utf8', function(err, data) {
                    return data;
                });

                return dataX;

            }

            var dataFromFile = await readData();
            dataFromFile = JSON.parse(dataFromFile);
            var totalGrains = dataFromFile.grains;
            
            if(totalGrains < 200) {
                message.channel.send("Make sure you have enough rice before you proceed!")
            } else {
                if (command === "tuna"){
                    dataFromFile.fish.tuna = dataFromFile.fish.tuna + 1;
                    dataFromFile.grains = dataFromFile.grains - 200;
                } else if (command === "salmon") {
                    dataFromFile.fish.salmon = dataFromFile.fish.salmon + 1;
                    dataFromFile.grains = dataFromFile.grains - 200;
                } else {
                    dataFromFile.fish.yellowtail = dataFromFile.fish.yellowtail + 1;
                    dataFromFile.grains = dataFromFile.grains - 200;
                }
            }

            fs.writeFile('rice.json', JSON.stringify(dataFromFile), function(err) {
                if(err) throw err;
                console.log('Fish failed');
            });

            message.channel.send("<@675621674154065922> type !roll to create your sushi!");
        }

        if (message.author.id == '675621674154065922'){
            selectFish();
        }
    }

    if (command === "roll"){
        async function makeSushi(){
            async function readData(){

                let dataX = fs.readFile('rice.json', 'utf8', function(err, data) {
                    return data;
                });

                return dataX;

            }

            var dataFromFile = await readData();
            dataFromFile = JSON.parse(dataFromFile);
            var checkFish = false;
            
            if(dataFromFile.fish.tuna > 0) {
                dataFromFile.sushi.tuna = dataFromFile.sushi.tuna + 1;
                dataFromFile.fish.tuna = dataFromFile.fish.tuna - 1;
                checkFish = true;
            } else if (dataFromFile.fish.salmon > 0) {
                dataFromFile.sushi.salmon = dataFromFile.sushi.salmon + 1;
                dataFromFile.fish.salmon = dataFromFile.fish.salmon - 1;
                checkFish = true;
            } else if (dataFromFile.fish.yellowtail > 0){
                dataFromFile.sushi.yellowtail = dataFromFile.sushi.yellowtail + 1;
                dataFromFile.fish.yellowtail = dataFromFile.fish.yellowtail - 1;
                checkFish = true;
            } else {
                message.channel.send('You have no fish!')
                checkFish = false;
            }

            if (checkFish = true) {
                fs.writeFile('rice.json', JSON.stringify(dataFromFile), function(err) {
                    if(err) throw err;
                    console.log('Sushi failed');
                });

                message.channel.send('Your sushi was rolled beautifully!')
                message.channel.send('Please tell me who you would like to gift your sushi to! (!gift <@user> (<tuna> <salmon> <yellowtail>))')
            } 


        }
        
        if (message.author.id == '675621674154065922') {
            makeSushi();
        }
    }

    if (command === "sushi") {
        async function checkGifts() {
            async function readData(){

                let dataX = fs.readFile('rice.json', 'utf8', function(err, data) {
                    return data;
                });

                return dataX;

            }

            var dataFromFile = await readData();
            dataFromFile = JSON.parse(dataFromFile);

            if (dataFromFile.gifted.tuna != "") {
                message.channel.send("Gifted Tuna: " + dataFromFile.gifted.tuna);
            }
            if (dataFromFile.gifted.salmon != "") {
            message.channel.send("Gifted Salmon: " + dataFromFile.gifted.salmon);
            }
            if (dataFromFile.gifted.yellowtail != "") {
            message.channel.send("Gifted Yellowtail: " + dataFromFile.gifted.yellowtail);
            }
        }

        checkGifts();
    }

    if (command === "fish") {
        async function checkFish() {
                async function readData(){
    
                    let dataX = fs.readFile('rice.json', 'utf8', function(err, data) {
                        return data;
                    });
    
                    return dataX;
    
                }
    
            var dataFromFile = await readData();
            dataFromFile = JSON.parse(dataFromFile);

            message.channel.send("Total fish: Tuna - " + dataFromFile.fish.tuna + " Salmon - " + dataFromFile.fish.salmon + " Yellowtail - " + dataFromFile.fish.yellowtail);
        
        }

        if (message.author.id == '675621674154065922') {
            checkFish();
        }
    }
});

bot.on('messageCreate', message => {
    if(!message.content.startsWith(process.env.BOT_PREFIX || message.author.bot)) return;

    const args = message.content.slice(process.env.BOT_PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase(); 

    if (command === "gift") {
        async function giftSushi() {
            async function readData(){

                let dataX = fs.readFile('rice.json', 'utf8', function(err, data) {
                    return data;
                });

                return dataX;

            }

            var dataFromFile = await readData();
            dataFromFile = JSON.parse(dataFromFile);

            var giftCheck = false;
        
            let userToGift = args[0]; //first argument
            let sushiToGift = args[1];

            if(sushiToGift === "tuna"){
                if(dataFromFile.sushi.tuna > 0) {
                    if(dataFromFile.gifted.tuna === 0) {
                        dataFromFile.gifted.tuna = dataFromFile.gifted.tuna + (userToGift);
                        dataFromFile.sushi.tuna = dataFromFile.sushi.tuna - 1;
                    } else {
                        dataFromFile.gifted.tuna = dataFromFile.gifted.tuna + (", " + userToGift);
                        dataFromFile.sushi.tuna = dataFromFile.sushi.tuna - 1;
                    }
                    giftCheck = true;
                    message.channel.send('<@' + message.author.id + '> has sent ' + userToGift + ' some beautifully rolled ' + sushiToGift + ' sushi! Enjoy!')
                }
                else {
                    message.channel.send('<@675621674154065922> you have no tuna sushi to gift!');
                }
            } else if(sushiToGift === "salmon") {
                if(dataFromFile.sushi.salmon > 0) {
                    if(dataFromFile.gifted.salmon === 0) {
                        dataFromFile.gifted.salmon = dataFromFile.gifted.salmon + (userToGift);
                        dataFromFile.sushi.salmon = dataFromFile.sushi.salmon - 1;
                    } else {
                        dataFromFile.gifted.salmon = dataFromFile.gifted.salmon + (", " + userToGift);
                        dataFromFile.sushi.salmon = dataFromFile.sushi.salmon - 1;
                    }
                    giftCheck = true;
                    message.channel.send('<@' + message.author.id + '> has sent ' + userToGift + ' some beautifully rolled ' + sushiToGift + ' sushi! Enjoy!')
                }
                else {
                    message.channel.send('<@675621674154065922> you have no salmon sushi to gift!');
                }
            } else if(sushiToGift === "yellowtail") {
                if(dataFromFile.sushi.yellowtail > 0) {
                    if(dataFromFile.gifted.yellowtail === 0) {
                        dataFromFile.gifted.yellowtail = dataFromFile.gifted.yellowtail + (userToGift);
                        dataFromFile.sushi.yellowtail = dataFromFile.sushi.yellowtail - 1;
                    } else {
                    dataFromFile.gifted.yellowtail = dataFromFile.gifted.yellowtail + (", " + userToGift);
                    dataFromFile.sushi.yellowtail = dataFromFile.sushi.yellowtail - 1;
                }
                    giftCheck = true;
                    message.channel.send('<@' + message.author.id + '> has sent ' + userToGift + ' some beautifully rolled ' + sushiToGift + ' sushi! Enjoy!')
                }
                else {
                    message.channel.send('<@675621674154065922> you have no yellowtail sushi to gift!');
                }
            }
            
            if (giftCheck == true) {
                fs.writeFile('rice.json', JSON.stringify(dataFromFile), function(err) {
                    if(err) throw err;
                    console.log('Gift failed');
                });
            }
            
        }

        if (message.author.id == '675621674154065922') {
            giftSushi();
        }
    }
});

bot.login(botToken);