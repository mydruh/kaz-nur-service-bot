const TelegramBot = require('node-telegram-bot-api');

const token = '6734260299:AAE6tN4kZGCxRRTxju8okrYFXjIyuIJ3smE'

const bot = new TelegramBot(token, {
    polling: true  
});

const options = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data: 'lol'}],
            [{text: '2', callback_data: 'lol'}, {text: '3', callback_data: 'lol'}],
            [{text: '4', callback_data: 'lol'}, {text: '5', callback_data: 'kek'}, {text: '6', callback_data: 'lol'}]
        ]
    })
}

const start = () => {
    bot.setMyCommands([
        {
            command: '/start',
            description: 'Начать работу с ботом'
        },
        {
            command: '/info',
            description: 'Узнать информацию о себе'
        }
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        if(text == '/start'){
            await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/7ee/1ac/7ee1ac07-8e74-4da4-b4b3-4a17ac329a6b/192/1.webp')
            return bot.sendMessage(chatId, `Добро пожаловать в KazNurService, гид по твоим товарам`)
        }else if(text == '/info'){
            bot.setMyCommands([
                {
                    command: '/back',
                    description: 'Назад'
                },
                {
                    command: '/list',
                    description: 'Посмотреть список товаров'
                }
            ])
            return bot.sendMessage(chatId, `Имя: ${msg.from.first_name}`, options)
        }else if('/back'){
            bot.setMyCommands([
                {
                    command: '/start',
                    description: 'Начать работу с ботом'
                },
                {
                    command: '/info',
                    description: 'Узнать информацию о себе'
                }
            ])
        }
        
        return bot.sendMessage(chatId, `Я тебя не понял, пользуйся командами`)
        console.log(msg);
    })

    bot.on('callback_query', async msg => {
        const data = msg.data
        const chatId = msg.message.chat.id

        return bot.sendMessage(chatId, data)
    })
}

start()