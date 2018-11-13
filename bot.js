const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "-"
const slowmode_mentions = new Map();
const slowmode_links = new Map();
const slowmode_attachments = new Map();
const ratelimit = 7500; // within 7.5 seconds
const logChannel = "511826404136976394";
 

client.user.setGame('Mal الحامى لسيرفر ','https://www.twitch.tv/sytra_ayman');
  console.log(`Logged in as ${client.user.tag}!`);
  });
  /*جميع الحقوق محفوظهه لريبل ولسيرفر كودز
رآح يرسل للأونر تحذير + م يتطلب ملفات سويته لكم داتا مؤقت
سو روم بأسم log 
أو غيره من الكود عشان يرسل هنا التحذير
nvm i 10 
nvm use 10
npm i discord.js
*/
var guilds = {};
client.on('guildBanAdd', function(guild) {
            const rebellog = client.channels.find("name", "log"),
            Onumber = 3,
  Otime = 10000
guild.fetchAuditLogs({
    type: 22
}).then(audit => {
    let banner = audit.entries.map(banner => banner.executor.id)
    let bans = guilds[guild.id + banner].bans || 0 
    guilds[guild.id + banner] = {
        bans: 0
    }
      bans[guilds.id].bans += 1; 
if(guilds[guild.id + banner].bans >= Onumber) {
try {
let roles = guild.members.get(banner).roles.array();
guild.members.get(banner).removeRoles(roles);
  guild.guild.member(banner).kick();

} catch (error) {
console.log(error)
try {
guild.members.get(banner).ban();
  rebellog.send(`<@!${banner.id}>
حآول العبث بالسيرفر @everyone`);
guild.owner.send(`<@!${banner.id}>
حآول العبث بالسيرفر ${guild.name}`)
    setTimeout(() => {
 guilds[guild.id].bans = 0;
  },Otime)
} catch (error) {
console.log(error)
}
}
}
})
});
 let channelc = {};
  client.on('channelCreate', async (channel) => {
  const rebellog = client.channels.find("name", "log"),
  Oguild = channel.guild,
  Onumber = 3,
  Otime = 10000;
  const audit = await channel.guild.fetchAuditLogs({limit: 1});
  const channelcreate = audit.entries.first().executor;
  console.log(` A ${channel.type} Channel called ${channel.name} was Created By ${channelcreate.tag}`);
   if(!channelc[channelcreate.id]) {
    channelc[channelcreate.id] = {
    created : 0
     }
 }
 channelc[channelcreate.id].created += 1;
 if(channelc[channelcreate.id].created >= Onumber ) {
    Oguild.members.get(channelcreate.id).kick();
rebellog.send(`<@!${channelcreate.id}>
حآول العبث بالسيرفر @everyone`);
channel.guild.owner.send(`<@!${channelcreate.id}>
حآول العبث بالسيرفر ${channel.guild.name}`)
}
  setTimeout(() => {
 channelc[channelcreate.id].created = 0;
  },Otime)
  });

let channelr = {};
  client.on('channelDelete', async (channel) => {
  const rebellog = client.channels.find("name", "log"),
  Oguild = channel.guild,
  Onumber = 3,
  Otime = 10000;
  const audit = await channel.guild.fetchAuditLogs({limit: 1});
  const channelremover = audit.entries.first().executor;
  console.log(` A ${channel.type} Channel called ${channel.name} was deleted By ${channelremover.tag}`);
   if(!channelr[channelremover.id]) {
    channelr[channelremover.id] = {
    deleted : 0
     }
 }
 channelr[channelremover.id].deleted += 1;
 if(channelr[channelremover.id].deleted >= Onumber ) {
  Oguild.guild.member(channelremover).kick();
rebellog.send(`<@!${channelremover.id}>
حآول العبث بالسيرفر @everyone`);
channel.guild.owner.send(`<@!${channelremover.id}>
حآول العبث بالسيرفر ${channel.guild.name}`)
}
  setTimeout(() => {
 channelr[channelremover.id].deleted = 0;
  },Otime)
  });
  

client.on('guildMemberAdd', member => {
if(member.user.bot) {
member.user.ban();
let c = member.guild.channels.find(r => r.name === "chat");
if(c) return;
if(c) return c.send(`:no_entry: | Banned ${member} , Reason: \`AntiBots - Protection\``);
}
});


client.on("message", message => {
 
    if (message.content.startsWith("!ping")) {
        let startTime = Date.now();
        message.channel.send("Ping...").then(newMessage => {
            let endTime = Date.now();
            newMessage.edit("Pong! Took `" + Math.round(endTime - startTime) + "ms`!");
        });
    }
 
    function log(logmessage) {
        if (message.guild.channels.has(logChannel)) {
            message.guild.channels.get(logChannel).send({ embed: logmessage}).then().catch(err => console.log(err));
        }
    }
 
   
    let banLevel = {
        "mentions": 10,
        "links": 10,
        "attachments": 10
    };
 
   
    if (message.author.bot || !message.guild || !message.member || !message.guild.member(client.user).hasPermission("BAN_MEMBERS") || message.member.hasPermission("MANAGE_MESSAGES")) return;
 
 
    if (message.mentions.users.size == 1 && message.mentions.users.first().bot) return;
 
   
    let entry_mentions = slowmode_mentions.get(message.author.id);
    let entry_links = slowmode_links.get(message.author.id);
    let entry_attachments = slowmode_attachments.get(message.author.id);
 
    if (!entry_mentions) {
        entry_mentions = 0;
        slowmode_mentions.set(message.author.id, entry_mentions);
    }
    if (!entry_links) {
        entry_links = 0;
        slowmode_links.set(message.author.id, entry_links);
    }
    if (!entry_attachments) {
        entry_attachments = 0;
        slowmode_attachments.set(message.author.id, entry_attachments);
    }
 
   
    entry_mentions += message.mentions.users.size + message.mentions.roles.size;
    entry_links += message.embeds.length;
    entry_attachments += message.attachments.size;
   
    slowmode_mentions.set(message.author.id, entry_mentions);
    slowmode_links.set(message.author.id, entry_links);
    slowmode_attachments.set(message.author.id, entry_attachments);
 
   
    if (entry_links > banLevel.links) {
        message.member.ban(1).then(member => {
            message.channel.send(`:ok_hand: banned \`${message.author.tag}\` for \`link spam\``);
            log(new Discord.RichEmbed().setTitle(':hammer: Banned').setColor(0xFF0000).setTimestamp().addField('User', `${message.author.tag} (${message.author.id})`).addField('Reason', `Posting too many links (${entry_links}x)`));
            slowmode_links.delete(message.author.id);
        })
        .catch(e => {
            log(new Discord.RichEmbed().setTitle(':x: ERROR').setColor(0x000001).setTimestamp().addField('User', `${message.author.tag} (${message.author.id})`).addField('Reason', `Could not ban because they have a higher role`));
        });
    } else {
        setTimeout(()=> {
            entry_links -= message.embeds.length;
            if(entry_links <= 0) slowmode_links.delete(message.author.id);
        }, ratelimit);
    }
 
    if (entry_mentions > banLevel.mentions) {
        message.member.ban(1).then(member => {
            message.channel.send(`:ok_hand: banned \`${message.author.tag}\` for \`mention spam\``);
            log(new Discord.RichEmbed().setTitle(':hammer: Banned').setColor(0xFF0000).setTimestamp().addField('User', `${message.author.tag} (${message.author.id})`).addField('Reason', `Mentioning too many users (${entry_mentions}x)`));
            slowmode_mentions.delete(message.author.id);
        })
        .catch(e => {
            log(new Discord.RichEmbed().setTitle(':x: ERROR').setColor(0x000001).setTimestamp().addField('User', `${message.author.tag} (${message.author.id})`).addField('Reason', `Could not ban because they have a higher role`));
        });
    } else {
        setTimeout(()=> {
            entry_mentions -= message.mentions.users.size + message.mentions.roles.size;
            if(entry_mentions <= 0) slowmode_mentions.delete(message.author.id);
        }, ratelimit);
    }
 
    if (entry_attachments > banLevel.attachments) {
        message.member.ban(1).then(member => {
            message.channel.send(`:ok_hand: banned \`${message.author.tag}\` for \`image spam\``);
            log(new Discord.RichEmbed().setTitle(':hammer: Banned').setColor(0xFF0000).setTimestamp().addField('User', `${message.author.tag} (${message.author.id})`).addField('Reason', `Posting too many images (${entry_attachments}x)`));
            slowmode_attachments.delete(message.author.id);
        })
        .catch(e => {
            log(new Discord.RichEmbed().setTitle(':x: ERROR').setColor(0x000001).setTimestamp().addField('User', `${message.author.tag} (${message.author.id})`).addField('Reason', `Could not ban because they have a higher role`));
        });
    } else {
        setTimeout(()=> {
            entry_attachments -= message.attachments.size;
            if(entry_attachments <= 0) slowmode_attachments.delete(message.author.id);
        }, ratelimit);
    }
 
});
 
process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: \n" + err.stack);
});







client.on('message', message => {
     if(!message.channel.guild) return;
 if(message.content.startsWith("-bc")) {
  if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
  if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**للأسف لا تمتلك صلاحية** `ADMINISTRATOR`' );
  let args = message.content.split(" ").join(" ").slice(2 + prefix.length);
  let BcList = new Discord.RichEmbed()
  .setThumbnail(message.author.avatarURL)
  .setAuthor(`محتوى الرساله ${args}`)
  .setDescription(`برودكاست بـ امبد 📝\nبرودكاست بدون امبد✏ \nلديك دقيقه للأختيار قبل الغاء البرودكاست\nيمكنك اضافة اسم السيرفر في البرودكاست عن طريق كتابة <server>\nيمكنك اضافة اسم المرسل في البرودكاست عن طريق كتاية <by>\nيمكنك منشنة العضو في الرساله عن طريق كتابة <user>`)
  if (!args) return message.reply('**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**');message.channel.send(BcList).then(msg => {
  msg.react('📝')
  .then(() => msg.react('✏'))
  .then(() =>msg.react('📝'))
   
  let EmbedBcFilter = (reaction, user) => reaction.emoji.name === '📝' && user.id === message.author.id;
  let NormalBcFilter = (reaction, user) => reaction.emoji.name === '✏' && user.id === message.author.id;
 
 
  let EmbedBc = msg.createReactionCollector(EmbedBcFilter, { time: 60000 });
  let NormalBc = msg.createReactionCollector(NormalBcFilter, { time: 60000 });
 
 
 
 
  EmbedBc.on("collect", r => {
 
 
  message.channel.send(`:ballot_box_with_check: تم ارسال الرساله بنجاح`).then(m => m.delete(5000));
  message.guild.members.forEach(m => {
  let EmbedRep = args.replace('<server>' ,message.guild.name).replace('<user>', m).replace('<by>', `${message.author.username}#${message.author.discriminator}`)
  var bc = new
  Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription(EmbedRep)
  .setThumbnail(message.author.avatarURL)
  m.send({ embed: bc })
  msg.delete();
  })
  })
  NormalBc.on("collect", r => {
    message.channel.send(`:ballot_box_with_check: تم ارسال الرساله بنجاح`).then(m => m.delete(5000));
  message.guild.members.forEach(m => {
  let NormalRep = args.replace('<server>' ,message.guild.name).replace('<user>', m).replace('<by>', `${message.author.username}#${message.author.discriminator}`)
  m.send(NormalRep);
  msg.delete();
  })
  })
  })
  }
  });
 
 
     
         






client.login(process.env.BOT_TOKEN);
