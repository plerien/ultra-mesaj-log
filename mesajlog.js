const Discord = require('discord.js')

const db = require('quick.db')

exports.run = async (client, message, args) => {

  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bu komutu yürütebilmek için **Yönetici** yetkisine sahip olmalısın.`))

let logk = message.mentions.channels.first() || message.channel
let logkanal = await db.fetch(`mesajlog_${message.guild.id}`)
  
  if (args[0] === "sıfırla" || args[0] === "kapat") {
    if(!logkanal) return (new Discord.MessageEmbed().setDescription(`**Mesaj-log** zaten ayarlanmamış.`))
    db.delete(`mesajlog_${message.guild.id}`)

    message.channel.send(new Discord.MessageEmbed().setDescription(`**Mesaj-log** başarıyla sıfırlandı. Açmak için: **!mesajlog**`))

    return
  }
  

db.set(`mesajlog_${message.guild.id}`, logk.id)

message.channel.send(new Discord.MessageEmbed().setDescription(`**Mesaj-log** ${logk} kanalına kuruldu. Kapatmak için: **!mesajlog sıfırla**`))


};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['mesaj-log' , 'mesajlog'],
    permLevel: 0
};

exports.help = {
    name: 'mesaj-log',
    description: 'mesaj log işte bro kaydeder fln',
    usage: 'mesajlog'
};