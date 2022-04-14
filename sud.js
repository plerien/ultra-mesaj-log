const db = require('quick.db')

client.on("messageDelete", async (message) => {
  if (message.author.bot || message.channel.type == "dm") return;

  let mesajlog = message.guild.channels.cache.get(await db.fetch(`mesajlog_${message.guild.id}`));
  if (!mesajlog) return;

  const embed = new Discord.MessageEmbed()

.setDescription(`${message.author} (${message.author.id}) tarafından yazılan mesaj ${message.channel} kanalında silindi. \n ( Mesaj ID: ${message.id} ) \n\n ${message.content}`)
.setColor("RED")
.setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 4096, format: 'png' }))

  mesajlog.send({ embed: embed })

})

client.on("messageUpdate", async (oldMessage, newMessage) => {

  let mesajlog = await db.fetch(`mesajlog_${oldMessage.guild.id}`);

  if (!mesajlog) return;

  if (oldMessage.content === newMessage.content) return
  const { MessageButton } = require('discord-buttons')
  const button = new MessageButton()
  .setLabel('Mesaja atla!')
  .setStyle('url')
  .setEmoji(`↗️`)
  .setURL(`https://discord.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id}`);
  let embed = new Discord.MessageEmbed()

  .setThumbnail(oldMessage.author.displayAvatarURL({ dynamic: true, size: 4096, format: 'png' }))
.setColor("YELLOW")
  .setDescription(`${oldMessage.author} (${oldMessage.author.id}) ${oldMessage.channel} kanalında bir mesaj düzenledi.
  ( Mesaj ID: ${oldMessage.id} ) 
  
  **Önce**
  ${oldMessage.content}
  
  **Sonra**
  ${newMessage.content}`)

  client.channels.cache.get(mesajlog).send({ embed: embed, component: button })

})
