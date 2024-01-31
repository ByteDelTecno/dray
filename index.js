const { Client, GatewayIntentBits, EmbedBuilder, ActivityType, ChannelType, Collection } = require("discord.js");
const adminPanel = require('./admin/admin-panel.js')
const token = process.env['TOKEN']

const dray = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildBans
	]
});


dray.once("ready", async () => {
		console.log(`Se ha iniciado sesión como ${dray.user.tag}`);
		dray.user.setPresence({
				activities: [{ name: 'la oscuridad', type: ActivityType.Watching }]
		});
		dray.user.setStatus('dnd');
		const commands = [
				{
						name: 'saludo',
						description: 'El bot te saluda'
				},
				{
						name: 'ping',
						description: 'Comprueba la latencia del bot'
				},
			{
				name: 'help',
				description: 'Muestra el menú de ayuda de el bot 🤑'
			},
			{
				name: 'botinfo',
				description: 'Muestra la información de el bot'
			},
			{
				name: 'prefix',
				description: 'Muestra el prefix de el bot'
			},
			{
				name: 'avatar',
				description: 'Muestra tu avatar.'
			}
    ]

		try {
				const commandObjects = await dray.application?.commands.set(commands);
				if (commandObjects) {
						console.log('Se han registrado los siguientes slash commands:', commandObjects.map(command => command.name).join(', '));
				} else {
						console.error('No se pudo crear los comandos');
				}
		} catch (error) {
				console.error('Error al crear los comandos:', error);
		}
});

 


dray.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'saludo') {
        await interaction.reply('¡Hola! ¿Cómo estás?');
    } else if (commandName === 'ping') {
        await interaction.reply(`Pong! ${dray.ws.ping}ms.`);
		} else if (commandName === 'help') {
			const helpEmbed = new EmbedBuilder()
			.setTitle('Ayuda de Dray')
			.setDescription('Hola, bienvenido a mi menú de ayuda.\nAqui abajo te dejo mis comandos.\n\n**/saludo**:\nEl bot te saluda.\n**/ping**:\nMuestra el ping de el bot en **ms**.')
						.setColor('#1c8063')
					.setImage('https://cdn.discordapp.com/attachments/1199397811297468526/1199397855392186478/dray.gif?ex=65c2654c&is=65aff04c&hm=24ce877739f8cafb7eab0c3e99b5e9c2dbafe514e0e3fbaaa9010f580d65c0a1&')
			.setFooter({ text: 'Eres del team Dray?'});
			await interaction.reply({ embeds: [helpEmbed]})
		} else if (commandName === 'botinfo') {
			const botInfo = new EmbedBuilder()
			.setTitle('Información de el bot')
			.setColor('#1c8063')
				.setThumbnail('https://cdn.discordapp.com/avatars/1199057975550152714/8d2bcee4f779df831c017ee543d25366.webp')
			.setDescription(`**Nombre**:\n${dray.user.tag}\n**Creado por**:\nEl bot fue creado por [imghosty__](https://discord.com/users/1164975777461305357)\n**Creado el**:\n22 de enero del 2024`)
			.setFooter({ text: 'BotInfo | Dray'});
			await interaction.reply({ embeds: [botInfo]})
		} else if (commandName === 'prefix') {
			await interaction.reply('Mi prefix es `?`.')
		} else if (commandName === 'avatar') {
			await interaction.reply({ content: "El comando no es utilizable por el momento", ephemeral: true});
		}
});


dray.on('messageCreate', message => {
  if (message.content.startsWith('?avatar')) {
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
      user = message.author;
    }
    const userAvatar = new EmbedBuilder()
      .setTitle(`Eu! Parece que este es el avatar de ${user.tag}!`)
      .setImage(user.displayAvatarURL({ dynamic: true }))
      .setColor('#3498db');
		message.channel.sendTyping()
				setTimeout(() => {
          message.reply({ embeds: [userAvatar]});
				}, 5000);
  }
});




dray.on('guildCreate', guild => {
    
    const channel = dray.channels.cache.get('1201208173315510272');
    if (!channel) return;
	const newServer = new EmbedBuilder()
	.setTitle('Me han añadido a un servidor!')
		.setColor('#1c8063')
	.setDescription(`Aqui estan los detalles de el servidor:\n**Nombre**:\n${guild.name}\n**Creado por**:\n<@${guild.ownerId}>\n**Miembros**:\n${guild.memberCount}`)
		.setThumbnail(guild.iconURL())
	.setFooter({ text: 'No te parece genial?'});
    channel.send({ embeds: [newServer]});
});

dray.on('messageCreate', message => {
    if (message.content.startsWith('?stupid')) {
			message.guild.members.fetch().then(members => {
			let memberArray = Array.from(members.values());
			let member = memberArray[Math.floor(Math.random() * memberArray.length)];
			const stupidUser = new EmbedBuilder()
			.setTitle('Usuario Estupido | Dray')
			.setDescription(`El usuario estupido de este servidor es: ${member}`)
			.setColor('#1c8063')
			.setFooter({ text: 'Powered by DSU (Dray Stupid User)'});
        message.reply({ embeds: [stupidUser]});
    });
	};
});


dray.on('messageCreate', message => {
  if (message.mentions.users.first()?.id === dray.user.id) {
		const pingEmbed = new EmbedBuilder()
		.setTitle(`Hola, ${message.author.tag}`)
		.setDescription(`Yo soy ${dray.user.tag}, en que puedo ayudarte? Si lo que deseas es ver mi menú de ayuda, usa el comando ?help.`)
		.setFooter({ text: 'Hola, yo soy Dray'})
    message.channel.send({ embeds: [pingEmbed]});
  }
});




dray.on("messageCreate", (message) => {
	if (message.content.startsWith("?botinfo")) {
		const botinfoE = new EmbedBuilder()
		.setTitle("Información del Bot | Dray")
		.setDescription("Hola, yo soy Dray, un bot de Discord sin fin.\n\n**Aqui te dejo mi información**\n\n**Mi Nombre**\nDray\n**Cuando fui creado?**\nFui creado el Lunes 22 de enero del 2024\n**Quien es mi creador?**\nMi creador es Ghosty.\n\n**Gracias por leer mi información!**")
		.setFooter({ text: "Dray"});
		message.reply({ embeds: [botinfoE]})
	}
	if (message.content.startsWith('?prefix')) {
		const prefixEmbed = new EmbedBuilder()
		.setTitle('Mi prefix | Dray')
		.setDescription('Mi prefix es `?`.\n**Proximamente opcion para cambiarlo!**');
		message.reply({ embeds: [prefixEmbed]})
	}
	if (message.content.startsWith('?help')) {
		const helpEmbed = new EmbedBuilder()
		.setTitle('Comandos | Dray')
		.setColor('#1c8063')
		.setDescription('**?server**\nMuestra la información de el server.\n**?prefix**\nMuestra mi prefix.\n**?botinfo**\nMuestra la información de el bot.\n**?ask**\nHace una pregunta a **DrAI** (Todavia no disponible)\n**?suggest**\nManda una sugerencia a el canal de sugerencias (Hay que configurarlo con ?setup suggestions)\n**?setup suggestions**\nConfigura un canal preestablecido para las sugerencias de el server.\n**Gracias por confiar y usar Dray!**\n**Necesitas ayuda más precisa?**\n[Unete al servidor de soporte pulsando aqui!](https://discord.gg/MR7t9WtCHH)')
		.setFooter({ text: 'Eres del team Dray?'})
		.setImage('https://cdn.discordapp.com/attachments/1199397811297468526/1199397855392186478/dray.gif?ex=65c2654c&is=65aff04c&hm=24ce877739f8cafb7eab0c3e99b5e9c2dbafe514e0e3fbaaa9010f580d65c0a1&');
		message.reply({ embeds: [helpEmbed]})
	}
	if (message.content.startsWith('?dash')) {
		const dashEmbed = new EmbedBuilder()
		.setTitle('Dashboard | Dray')
		.setDescription('Lo sentimos mucho, pero todavia **No tenemos dashboard**')
		.setFooter({ text: 'Dashboard Command | Dray'})
		message.reply({ embeds: [dashEmbed]})
	}
	if (message.content.startsWith('?server')) {
		const server = new EmbedBuilder()
		.setTitle('Información de el servidor')
		.setDescription(`**Nombre de el servidor**:\n${message.guild.name}\n\n**Cantidad de miembros:**\n${message.guild.memberCount}\n\n**Owner:**\n<@${message.guild.ownerId}>\n\n**Creado el:**\n${message.guild.createdAt}\n\n**Esta es toda la información que pude recolectar de el servidor, espero que te haya sido util.**`)
		.setThumbnail(message.guild.iconURL())
		message.reply({ embeds: [server]})
	}
	if (message.content.startsWith('?ask quien eres?')) {

		
		message.channel.sendTyping();
		
			const whoiam = new EmbedBuilder()
		  .setTitle('Preguntas a la AI de Dray')
			.setDescription('¡Hola! Yo soy DrAI, encantado de conocerte.')
			.setFooter({ text: 'Powered by DrAI'})
		setTimeout(() => {
        message.reply({ embeds: [whoiam]})
    }, 5000);
	}
	if (message.content.startsWith('?ask hola')) {


	message.channel.sendTyping();

		const salutation = new EmbedBuilder()
		.setTitle('Preguntas a la AI de Dray')
		.setDescription('¡Hola! Yo soy DrAI, como llevas tu dia?')
		.setFooter({ text: 'Powered by DrAI'})
	setTimeout(() => {
			message.reply({ embeds: [salutation]})
	}, 5000);
	}
	if (message.content.startsWith('hola')) {
	 message.reply(`Hola ${message.author}, que tal llevas tu dia? 😈`)
	}
	if (message.content.startsWith('?id')) {
		let avatarURL = message.author.displayAvatarURL({ dynamic: true });
		const random = Math.floor(Math.random() * 16777215);
		const userID = new EmbedBuilder()
		.setTitle(`ID de ${message.author.tag}`)
		.setDescription(`Tu ID de usuario es ${message.author.id}.`)
		.setThumbnail(avatarURL)
		.setColor(random)
		.setFooter({ text: 'ID de usuario | Dray'});
		message.reply({ embeds: [userID]})
	}
	if (message.content.startsWith('?adminpanel')) {
		adminPanel.execute(command)
	}
	if (message.content.includes('la oscuridad')) {
		if (message.author.bot) return
		message.channel.send('No hables sobre la oscuridad... Hay algo oculto que quiero que no sepas...')
	}
	if (message.content.includes('que siniestro')) {
		if (message.author.bot) return
		message.channel.send('Nunca sabrás lo que oculto...')
	}
	if (message.content.includes('xpr')) {
		const xpr = new EmbedBuilder()
		.setTitle('No te atrevas...')
		.setDescription('Nunca jamás te atrevas a...')
		.setFooter({ text: 'No lo hagas jamás...'})
		message.author.send({ embeds: [xpr]})
	}
	if (message.content.startsWith('?user')) {
		const userInfo = new EmbedBuilder()
		.setTitle(`Perfil de ${message.author.username}`)
		.setDescription(`Hola, como veo, quieres ver el perfil de ${message.author.username}.\nAqui te dejo la información de ese usuario.\n👤**Nombre de usuario**:\n${message.author}\n🤳**Tag**:\n${message.author.tag}\n**De momento solo puedo sacar esa información, espero que te haya sido de utilidad.**`);
		message.reply({ embeds: [userInfo]});
	}
});

dray.on('messageCreate', message => {
    if (message.content.startsWith('?send')) {
        const parts = message.content.split(' ');

        let mentionedUser = message.mentions.users.first();

        if (!mentionedUser) {
            return message.reply('Necesitas mencionar a alguien para enviarle un mensaje.');
        }

        let textToSend = parts.slice(2).join(' ');

        mentionedUser.send(textToSend);
			  message.author.send(`El mensaje "${textToSend}" se ha enviado a ${mentionedUser}.`)
    }
	if (message.content.startsWith('?freddrol')) {
		message.reply('https://cdn.discordapp.com/attachments/1200883444046110812/1200883558420578364/RPReplay_Final1700602485.mov?ex=65c7ccf78is=65b')
	}
	if (message.content.startsWith('?sfx minecraft')) {
		message.reply('https://cdn.discordapp.com/attachments/1200883444046110812/1201249841028812892/9555ac7dab25412b665b8eb659d0916a.wav?ex=65c92218&is=65b6ad18&hm=b9bac5f3f1b7afbfe723f75a65f3ab99f7d47281cc24fc8ce75c279b994e7689&')
	}
	if (message.content.startsWith('?8ball')) {
        let respuestas = [
            'En mi opinión, sí',
            'Es cierto',
            'Es decididamente así',
            'Probablemente',
            'Buen pronóstico',
            'Todo apunta a que sí',
            'Sin duda',
            'Sí',
            'Sí - definitivamente',
            'Debes confiar en ello',
            'Respuesta vaga, vuelve a intentarlo',
            'Pregunta en otro momento',
            'Será mejor que no te lo diga ahora',
            'No puedo predecirlo ahora',
            'Concéntrate y vuelve a preguntar',
            'No cuentes con ello',
            'Mi respuesta es no',
            'Mis fuentes me dicen que no',
            'Las perspectivas no son buenas',
            'Muy dudoso'
        ];
        
        let respuesta = respuestas[Math.floor(Math.random() * respuestas.length)];
        
        message.reply(respuesta);
		 }
	
});


dray.on('messageCreate', message => {
	if (!message.content.startsWith('+') || message.author.bot) return;

	const args = message.content.slice(1).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'suggest') {
		if(args.length === 0){
			return message.reply('Por favor, proporciona una sugerencia.');
		}

		const channel = message.guild.channels.cache.find(channel => channel.name === "〚💡〛sugerencias");
		if(!channel) return message.reply('No puedo encontrar un canal de sugerencias.');

		const embed = new EmbedBuilder()
			.setTitle('Nueva Sugerencia')
			.setDescription(args.join(' '))
			.setColor('#7289da')
			.setFooter({ text: `Sugerencia creada por ${message.author.tag} • Powered by Dray`, imageURL: message.author.displayAvatarURL({ dynamic: true }) });

		channel.send({ embeds: [embed] }).then(message => {
			message.react('1198336290819674154');
			message.react('1198336289909514330');
		});
	}
});


const prefix = '?';


dray.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'hack') {
        if (message.mentions.users.size) {
            const taggedUser = message.mentions.users.first();
					const hacked = new EmbedBuilder()
					.setTitle('<a:hack:1199786649920471050> Hackeandote <a:hack:1199786649920471050>')
					.setDescription('Hola, estas siendo hackeado, aqui abajo te dejo las cosas que te vamos a sacar jejej\n•<a:hack:1199786649920471050> Nombre Real\n•<a:hack:1199786649920471050> Correo Electronico\n•<a:hack:1199786649920471050> Tus cuentas\n•<a:hack:1199786649920471050> Y otras cosas más jejej')
            taggedUser.send({ embeds: [hacked]});
					 message.author.send(`Has "hackeado" falsamente a ${taggedUser}`)
					message.delete()
        } else {
            message.author.send('<a:hack:1199786649920471050> Necesitas mencionar a alguien para poder hackearle falsamente. <a:hack:1199786649920471050>');
        }
    }
});



dray.on('messageCreate', message => {
    const userId = '1164975777461305357'; // Reemplaza esto con la ID del usuario
    if (message.content.startsWith('?leave') && message.author.id === userId) {
        let [command, ...args] = message.content.split(" ");
        if (args.length > 0) {
            let guildId = args[0];
            let guild = dray.guilds.cache.get(guildId);
            if (guild) {
                guild.leave()
                    .then(g => console.log(`Se ha abandonado la guild ${g}.`))
                    .catch(console.error);
            } else {
                message.reply('No pude encontrar el servidor con esa ID');
            }
        } else {
            message.reply('Debes proporcionar la ID del servidor');
        }
    }
});





dray.login(token)