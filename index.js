

const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const client = new Discord.Client();



const bot = new Discord.Client({disableEveryone: false});

bot.on("guildMemberAdd", function(member){
   member.guild.channels.find("name", "welcome").sendMessage(member.toString() + "Welcome to Community United, I am Community bot, and I am your helper, if you need me just say !help");
});
//---------------------------------------------------------------\\//---------------------------------------------------------------\\

function changing_status() {
    let status = ['Watching CU..', 'Say !help if ya need me..', 'Made by ScriptedBuilderz..']
    let random = status[Math.floor(Math.random() * status.length)]
    bot.user.setActivity(random)
}

bot.on("ready", () => {
    console.log("Changed");
    setInterval(changing_status, 9000);
})



//---------------------------------------------------------------\\//---------------------------------------------------------------\\

bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;


  let prefix = botconfig.prefix;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}purge`){
  message.channel.bulkDelete(args[0]);
 return;
}  
 
 //---------------------------------------------------------------\\//---------------------------------------------------------------\\

if(cmd === `${prefix}purge`){
     if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Sorry, but you do not have the **Manage Messages** permissions! If you think this is an error, contact an owner.')
    if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send('I do not have the **Manage Messages** permission in this server.');

    if (!args[0]) return message.channel.send('You must specify a number of messages.');
    if (args[0] < 1) return message.channel.send('Please provide a number greater than 1.');
    if (args[0] > 100) return message.channel.send('Please provide a number less than 100.');
    if (isNaN(args[0])) return message.channel.send('Please provide a corect number.');

    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`🗑 I delete **${args[0]}** messages.`).then(message => message.delete(3000));
    }).catch().catch((e) => message.channel.send('You can not delete messages older than 14 days.'));
}   
   
  //---------------------------------------------------------------\\//---------------------------------------------------------------\\  
      if(cmd === `${prefix}warn`){
      
   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("***Sorry you cant warn users.***");    
     let wUser = message.guild.member(message.mentions.users.first() || message.guilds.members.get(args[0]));
       if(!wUser) return message.channel.send("Sorry couldnt find user :unamused:");
       let warnreason = args.join(" ").slice(22);
        
        let warnembed = new Discord.RichEmbed()
        .setThumbnail("https://cdn.discordapp.com/attachments/520216250589118465/520252792875778057/unknown.png")
        .setColor("#ff001d")
        .addField("Warn Reason:", warnreason)
        .setDescription("You have been warned in **Community United**")
            
       message.reply("**User has been warned.**");   
            
       if(message.mentions.users.first()) return message.mentions.users.first().send(warnembed);       
      }            
 //---------------------------------------------------------------\\//---------------------------------------------------------------\\
            
 function play(connection, message) {
    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {
        filter: "audioonly"
    }));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });

}
var servers = {};
client.on("message", async message => {
    var args = message.content.substring(prefix.length).split(" ");
    if (!message.content.startsWith(prefix)) return;
    switch (args[0].toLowerCase()) {
        case "mplay":
            if (!message.guild.member(client.user).hasPermission('SPEAK')) return message.channel.send('**Sorry, but i cant join/speak in this channel!**').catch(console.error);
            if (!args[1]) {
                message.channel.send("**Please provide a URL YouTube link to me to play song.**");
                return;
            }

            if (!message.member.voiceChannel) {
                message.channel.send("**I think it may work better if you are in a voice channel!**");
                return;
            }

            if (console.error) {
                message.channel.send("**Sorry, but I cant search videos in YouTube! Provide a link to play!**");
                return;
            }

            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            message.channel.sendMessage('``You song has been added to the queue.``')
            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
            });
            break;
        case "mstop":
            var server = servers[message.guild.id];
            if (!message.member.voiceChannel) {
                message.channel.send("**I think it may work better if you are in a voice channel!**");
                return;
            }

            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            message.channel.send('``The queue of songs removed.``');
            break;
        case "mskip":
            if (!message.member.voiceChannel) {
                message.channel.send("**I think it may work better if you are in a voice channel!**");
                return;
            }

            var server = servers[message.guild.id];
            if (server.dispatcher) server.dispatcher.end();
            message.channel.send('``The song has been sucessfully skipped.``');
            break;
        case "mpause":
            if (!message.member.voiceChannel) {
                message.channel.send("**I think it may work better if you are in a voice channel!**");
                return;
            }

            var server = servers[message.guild.id];
            if (server.dispatcher) server.dispatcher.pause();
            message.channel.send('``The song is paused.``');
            break;
        case "mresume":
            if (!message.member.voiceChannel) {
                message.channel.send("**I think it may work better if you are in a voice channel!**");
                return;
            }

            var server = servers[message.guild.id];
            if (server.dispatcher) server.dispatcher.resume();
            message.channel.send('``The song is sucessfully continued.``');
            break;
    }
});
   
 //---------------------------------------------------------------\\//---------------------------------------------------------------\\   
 
   if(cmd === `${prefix}help`){
     let embed = new Discord.RichEmbed()
     .setThumbnail("https://cdn.discordapp.com/attachments/520216250589118465/520249593271681045/unknown.png")
     .setDescription("Welcome to the Help page, I am CB and I am here to help ya!")
     .setColor("#ff001d")
     .addField("For commands say:", "!cmds")
     .setFooter("For extra info DM a helper.")
     
     message.channel.send(embed)
 }   
      
 //---------------------------------------------------------------\\//---------------------------------------------------------------\\        

 if(cmd === `${prefix}status`){

   let announcement = args.join(" ");
 
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry you cant set status.");  
  bot.user.setActivity(announcement)
   
  let aembed = new Discord.RichEmbed()
  .setTitle("Bot Status")
  .setColor("#ff001d")
  .setDescription("The bot status has been changed, please dont abuse this feature.")
  message.channel.send(aembed);
}
   
//---------------------------------------------------------------\\//---------------------------------------------------------------\\   
   
if(cmd === `${prefix}dm`){

     let mention = args[0];
     const msg = args.slice("1").join(" ");
     
     message.channel.send("User has been DM'ed! Thanks.");
      message.delete().catch(O_o=>{});
      
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry you cant DM people.");
     if(message.mentions.users.first()) return message.mentions.users.first().send(msg);
  }

//---------------------------------------------------------------\\//---------------------------------------------------------------\\
   
 if(cmd === `${prefix}say`){

      if(!message.member.hasPermission("ADMINISTRATOR")) return;
      const sayMessage = args.join(" ");
      message.delete().catch();
      message.channel.send(sayMessage);
      message.delete().catch(O_o=>{});
}
  
//---------------------------------------------------------------\\//---------------------------------------------------------------\\  
   
if (cmd === `${prefix}report`){

   let rUser = message.guild.member(message.mentions.users.first() || message.guilds.members.get(args[0]));
   if(!rUser) return message.channel.send("Sorry couldnt find user :unamused:");
   let reason = args.join(" ").slice(22);

   let repoted = new Discord.RichEmbed()
   .setTitle("Reported in **Community United**")
   .setDescription("You have been reported, please bear in mind the moderators now have this report file Thanks.")
   .addField("Report reason:", reason)
   .setColor("#ff001d")
   .setThumbnail("https://cdn.discordapp.com/attachments/520216250589118465/520254927973384202/unknown.png")
  
      
   let reportembed = new Discord.RichEmbed()
   .setThumbnail("https://cdn.discordapp.com/attachments/520216250589118465/520254927973384202/unknown.png")   
   .setTitle("Moderation Report")
   .setDescription("Moderators need to act on the reported user.")
   .setColor("#ff001d")
   .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
   .addField("Reported by", `${message.author} with ID: ${message.author.id}`)
   .addField("Channel", message.channel)
   .addField("Report time", message.createdAt)
   .addField("Report Reason", reason);


   let reportschannel = message.guild.channels.find(`name`, "reports");
   if(!reportschannel) return message.channel.send("Couldnt find the specified channel path. :unamused:");
   

   message.delete().catch(O_o=>{});
   reportschannel.send(reportembed);
      message.reply("**Your report file has been sent to the moderators, thanks alot.**")  
        if(message.mentions.users.first()) return message.mentions.users.first().send(repoted);
  return;
}
  
 //---------------------------------------------------------------\\//---------------------------------------------------------------\\  
   
  if(cmd === `${prefix}kick`){

  let kUser = message.guild.member(message.mentions.users.first() || message.guilds.members.get(args[0]));
  if(!kUser) return message.channel.send("User not found. :unamused:");
  let kReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Sorry you cant kick people.");
  if(kUser.hasPermission("KICK_MEMBERS")) return message.reply("Sorry that user cannot be kicked.");

   let kicksend = new Discord.RichEmbed()
   .setTitle("Kicked from ***Community United.***")
   .setDescription("You have been kicked, please bear in mind the administrators now have this kick file Thanks.")
   .addField("Kick reason:", kReason)
   .setColor("#ff001d")
   .setThumbnail("https://cdn.discordapp.com/attachments/520216250589118465/520252599350460447/unknown.png")      
        
        
  let kEmbed = new Discord.RichEmbed()
   .setThumbnail("https://cdn.discordapp.com/attachments/520216250589118465/520252599350460447/unknown.png") 
   .setTitle("Moderation Kick")
  .setColor("#ff001d")
  .addField("Kicked User.", `${kUser} with the ID: ${kUser.id}`)
  .addField("Kicked by:", `<@${message.author.username}> with the ID: ${message.author.id}`)
  .addField("Channel", message.channel)
  .addField("Time", message.createdAt)
  .addField("Kick Reason", kReason);

   let kchannel = message.guild.channels.find(`name`, "modlogs");
   if(!kchannel) return message.channel.send("Channnel path not found. :smile:")

  message.guild.member(kUser).kick(kReason);
  kchannel.send(kEmbed);    
  message.reply("***User had been Kicked.***"); 
      if(message.mentions.users.first()) return message.mentions.users.first().send(kicksend);  

  return;
}



 //---------------------------------------------------------------\\//---------------------------------------------------------------\\  
  
   if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guilds.members.get(args[0]));
    if(!bUser) return message.channel.send("User not found. :unamused:");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Sorry you cant ban people.");
    if(bUser.hasPermission("BAN_MEMBERS")) return message.reply("Sorry that user cannot be banned.");
  
   let bansend = new Discord.RichEmbed()
   .setTitle("Banned from ***Community United.***")
   .setDescription("You have been Banned, please bear in mind the administrators now have this kick file Thanks.")
   .addField("Ban reason:", bReason)
   .setColor("#ff001d")
   .setThumbnail("https://cdn.discordapp.com/attachments/520216250589118465/520252506555547649/unknown.png")
   
         
  
    let bEmbed = new Discord.RichEmbed()
    .setThumbnail("https://cdn.discordapp.com/attachments/520216250589118465/520252506555547649/unknown.png")    
    .setTitle("Moderation Ban")
    .setColor("#ff001d")
    .addField("Banned User.", `${bUser} with the ID: ${bUser.id}`)
    .addField("Banned by:", `<@${message.author.username}> with the ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Banned Reason", bReason);

  
     let bChannel = message.guild.channels.find(`name`, "modlogs");
     if(!bChannel) return message.channel.send("Channnel path not found. :smile:")
  
    message.guild.member(bUser).ban(bReason);
    bChannel.send(bEmbed);    
  message.reply("***User had been Banned.***");
        if(message.mentions.users.first()) return message.mentions.users.first().send(bansend);        

    return;
  }
  
});

bot.login(process.env.BOT_TOKEN);
