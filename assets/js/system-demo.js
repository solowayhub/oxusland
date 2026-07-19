function initSystemDemo() {
  var container = document.getElementById('system-demo-dashboard');
  if (!container) return;

  // --- Localization Data (Adapted for OxusTech & Polymarket AI-Arbitrage) ---
  var dict = {
    sidebar: {
      team: "Команда",
      chats: "Чаты",
      tasks: "Задачи",
      guides: "Гайды",
      landings: "Ссылки"
    },
    header: {
      reflink_label: "Реф. ссылка:",
      reflink_value: "oxustech.ai/ref/system",
      copied: "Скопировано!",
      assistant: "Ассистент Мия"
    },
    statuses: {
      new: "Новый",
      registered: "Регистрация",
      investor: "Инвестор",
      partner: "Партнер"
    },
    team: {
      tabs: [
        { id: "all", label: "Все", count: 12 },
        { id: "new", label: "Новые", count: 4 },
        { id: "registered", label: "Регистрации", count: 3 },
        { id: "investor", label: "Инвесторы", count: 4 },
        { id: "partner", label: "Партнеры", count: 1 }
      ],
      generation_label: "Поколение",
      table: {
        name: "Имя",
        email: "Email",
        phone: "Телефон",
        telegram: "Telegram",
        rating: "Рейтинг"
      },
      generations: [
        {
          level: 1,
          leads: [
            { id: "u1", name: "Анна Миллер", status: "registered", email: "anna@mail.com", phone: "+1 351 555-0101", telegram: "@anna_m", rating: 8, avatar: "assets/images/all/ava/lead-1.webp", language: "Испанский", country: "Мексика" },
            { id: "u2", name: "Дэвид Чен", status: "new", email: "david@mail.com", phone: "+1 202 325-0123", telegram: "@david_c", rating: 5, avatar: "assets/images/all/ava/lead-2.webp", language: "Китайский", country: "Китай" },
            { id: "u3", name: "София Родригез", status: "investor", email: "sofia@mail.com", phone: "+34 600 123-4567", telegram: "@sofia_r", rating: 9, avatar: "assets/images/all/ava/lead-3.webp", language: "Испанский", country: "Испания" }
          ]
        },
        {
          level: 2,
          leads: [
            { id: "u4", name: "Джеймс Уилсон", status: "new", email: "james@mail.com", phone: "+44 20 7946-0958", telegram: "@james_w", rating: 3, avatar: "assets/images/all/ava/lead-4.webp", language: "Английский", country: "Великобритания", managerId: "u1" },
            { id: "u5", name: "Мария Сантос", status: "partner", email: "maria@mail.com", phone: "+55 11 7699-2169", telegram: "@maria_s", rating: 10, avatar: "assets/images/all/ava/lead-5.webp", language: "Португальский", country: "Бразилия", managerId: "u2" },
            { id: "u6", name: "Алекс Ким", status: "registered", email: "alex@mail.com", phone: "+82 2 1234-5678", telegram: "@alex_k", rating: 6, avatar: "assets/images/all/ava/lead-6.webp", language: "Корейский", country: "Южная Корея", managerId: "u3" }
          ]
        },
        {
          level: 3,
          leads: [
            { id: "u7", name: "Эмма Тейлор", status: "new", email: "emma@mail.com", phone: "+61 2 9876-5432", telegram: "@emma_t", rating: 4, avatar: "assets/images/all/ava/lead-7.webp", language: "Французский", country: "Канада", managerId: "u4" },
            { id: "u8", name: "Лукас Мартин", status: "investor", email: "lucas@mail.com", phone: "+33 1 2546-6789", telegram: "@lucas_m", rating: 7, avatar: "assets/images/all/ava/lead-8.webp", language: "Немецкий", country: "Германия", managerId: "u5" },
            { id: "u9", name: "Юки Танака", status: "investor", email: "yuki@mail.com", phone: "+81 3 1234-5678", telegram: "@yuki_t", rating: 9, avatar: "assets/images/all/ava/lead-9.webp", language: "Японский", country: "Япония", managerId: "u6" }
          ]
        },
        {
          level: 4,
          leads: [
            { id: "u10", name: "Елена Волкова", status: "registered", email: "elena@mail.com", phone: "+7 900 123-45-67", telegram: "@elena_v", rating: 7, avatar: "assets/images/all/ava/lead-10.webp", language: "Русский", country: "Россия", managerId: "u7" },
            { id: "u11", name: "Маркус Вебер", status: "new", email: "markus@mail.com", phone: "+49 30 1753-4169", telegram: "@markus_w", rating: 6, avatar: "assets/images/all/ava/lead-11.webp", language: "Немецкий", country: "Германия", managerId: "u8" },
            { id: "u12", name: "Кьяра Росси", status: "investor", email: "chiara@mail.com", phone: "+39 02 123-4567", telegram: "@chiara_r", rating: 8, avatar: "assets/images/all/ava/lead-12.webp", language: "Итальянский", country: "Италия", managerId: "u9" }
          ]
        }
      ]
    },
    client_card: {
      tabs: {
        info: "Инфо",
        chat: "Чат",
        notes: "Заметки",
        tasks: "Задачи",
        logs: "История"
      },
      info: {
        email: "Email",
        phone: "Телефон",
        telegram: "Telegram",
        status: "Статус",
        rating: "Рейтинг",
        language: "Язык",
        country: "Страна",
        manager: "Менеджер",
        manager_you: "Вы"
      },
      send_placeholder: "Написать сообщение...",
      messages: {
        u1: [
          { sender: "user", text: "Привет! Я видела вашу рекламу в Instagram. Это правда, что можно начать с совсем небольшой суммы?", translated: "¡Hola! Vi su anuncio en Instagram. ¿Es cierto que se puede empezar con una cantidad muy pequeña?" },
          { sender: "ai", text: "Добро пожаловать в OxusTech, Анна!\n\nДа, абсолютно. Наш минимальный вход — всего $50 USDT. Мы верим, что интеллектуальный арбитраж на рынке прогнозов должен быть доступен каждому.\n\nДля начала вам нужно просто подключить кошелек. Хотите узнать, как наши ИИ-агенты зарабатывают на Polymarket и обеспечивают ежедневный доход от 0.3% до 1.1%?", translated: "¡Bienvenida a OxusTech, Anna!\n\nSí, absolutamente. Nuestra entrada mínima es de solo 50 USDT. Creemos en hacer que el arbitraje inteligente en el mercado de predicciones sea accesible para todos.\n\nPara empezar, solo necesita conectar su billetera cripto. ¿Le gustaría conocer cómo nuestros agentes de IA ganan en Polymarket y brindan un rendimiento diario de 0.3% a 1.1%?" },
          { sender: "user", text: "Я ищу что-то с ежедневным доходом. Сколько я смогу заработать?", translated: "Busco algo con rendimiento diario. ¿Cuánto puedo ganar?" },
          { sender: "ai", text: "Депозит в OxusTech приносит от 0.3% до 1.1% в день. Самое приятное — полная прозрачность: все сделки ИИ-агентов на Polymarket проходят через блокчейн Polygon, и вы можете проверить каждую транзакцию. Средства находятся под вашей защитой через смарт-контракты. Прислать вам инструкцию по подключению кошелька?", translated: "El depósito en OxusTech ofrece un rendimiento diario constante de 0.3% a 1.1%.\n\nLa mejor parte es la transparencia total: todas las operaciones de agentes de IA en Polymarket pasan a través de la cadena Polygon y puede verificar cada transacción. Los fondos están asegurados mediante contratos inteligentes. ¿Le envío una guía sobre cómo conectar su billetera?" },
          { sender: "user", text: "Да, пожалуйста. И нужно ли мне отправлять паспортные данные для проверки?", translated: "Sí, por favor. ¿Y tengo que enviar detalles del pasaporte para verificación?" },
          { sender: "ai", text: "В этом и прелесть технологий OxusTech! Мы работаем на блокчейне Polygon.\n\nМы не собираем личные данные и не требуем KYC (верификацию). Вам нужен только ваш криптокошелек (например, MetaMask, Trust Wallet или Rabby) для участия.", translated: "¡No, esa es la belleza de la tecnología OxusTech! Trabajamos en la blockchain Polygon.\n\nNo recopilamos datos personales ni requerimos KYC. Solo necesita su billetera cripto (como MetaMask, Trust Wallet o Rabby) para participar." }
        ],
        u2: [
          { sender: "user", text: "Привет! Я хочу узнать больше про работу ИИ-агентов в OxusTech. Как гарантируется доходность и как проходят сделки?", translated: "Hi! I want to know more about the AI agents' work in OxusTech. How are the returns guaranteed and how are trades executed?" },
          { sender: "ai", text: "Здравствуйте, Дэвид! OxusTech предлагает ежедневные начисления прибыли от 0.3% до 1.1%. Доход генерируется автономными ИИ-агентами, которые находят арбитражные ситуации на Polymarket. Все выплаты управляются неизменяемыми смарт-контрактами и начисляются на ваш баланс каждый день.", translated: "Hello, David! OxusTech offers daily profit accruals from 0.3% to 1.1%. Yield is generated by autonomous AI agents that find arbitrage situations on Polymarket. All payouts are managed by immutable smart contracts and credited to your balance daily." },
          { sender: "user", text: "До 30% в месяц звучит очень много. Откуда берется такая прибыль?", translated: "Up to 30% per month sounds like a lot. Where does this profit come from?" },
          { sender: "ai", text: "Доход генерируется на реальном рынке прогнозов Polymarket с оборотом более $10 млрд в месяц. ИИ-агенты совершают сделки за 2–5 мс, используя арбитражные ситуации: они выкупают исходы события с разницей в ценах (например, когда сумма двух противоположных исходов на разных рынках дает гарантированную прибыль). Поскольку всё автоматизировано, мы исключаем человеческий фактор, а каждая сделка фиксируется в блокчейне Polygon.", translated: "The yield is generated on the real prediction market Polymarket with a turnover of over $10B/month. AI agents execute trades in 2-5 ms, exploiting arbitrage situations: they buy out event outcomes with price discrepancies (e.g. when the sum of opposite outcomes across markets yields a locked profit). Since everything is automated, human factor is excluded, and each transaction is recorded on the Polygon blockchain." },
          { sender: "user", text: "Могу я быть уверен, что мои деньги не будут доступны основателям компании?", translated: "Can I be sure that my funds won't be accessed by the company founders?" },
          { sender: "ai", text: "Именно для этого мы используем смарт-контракты в сети Polygon. После развертывания код не может быть изменен.\n\nВаши средства работают в рамках алгоритма, и ни у кого — включая нас — нет прямого доступа к вашим депозитам. Вы полностью контролируете свои активы и вывод прибыли.", translated: "Exactly! That's why we use smart contracts on the Polygon network. Once deployed, the code cannot be changed.\n\nYour funds work within the algorithm, and no one — including us — has direct access to your deposits. You are in full control of your assets and profit withdrawals." }
        ],
        u3: [
          { sender: "user", text: "Привет! Я слышала, что если я положу USDT на депозит в OxusTech, я смогу забрать их в любое время. Это правда? И какую сеть лучше использовать?", translated: "¡Hola! He oído que si deposito USDT en OxusTech, puedo retirarlos en cualquier momento. ¿Es verdad? ¿Y qué red recomienda usar?" },
          { sender: "ai", text: "Здравствуйте, София! Да, всё верно. OxusTech обеспечивает полную ликвидность: вы можете свободно выводить средства и прибыль в любой момент без блокировок.\n\nЧто касается сети, мы работаем на Polygon (USDT) из-за очень низких комиссий за транзакции (газ) и прямой связи с ликвидностью Polymarket.", translated: "¡Hola, Sofía! Sí, es correcto. OxusTech ofrece liquidez total, permitiéndole retirar fondos y ganancias libremente en cualquier momento sin bloqueos.\n\nEn cuanto a la red, trabajamos en Polygon (USDT) debido a las tarifas de gas extremadamente bajas y el enlace directo con la liquidez de Polymarket." },
          { sender: "user", text: "Спасибо! Значит, сеть Polygon. А какой минимальный депозит? $100 будет достаточно для начала?", translated: "¡Gracias! Red Polygon entonces. ¿Y cuál es el depósito mínimo? ¿Cien dólares son suficientes para empezar?" },
          { sender: "ai", text: "Конечно! Минимальная сумма депозита — $50 USDT, так что со $100 USDT вы сможете отлично начать.\n\nНачисления от 0.3% до 1.1% будут приходить ежедневно. Также доступен сложный процент, который поможет быстрее увеличивать ваш капитал.", translated: "¡Por supuesto! Dado que la inversión mínima es de solo 50 USDT, comenzar con 100 USDT está perfectamente bien.\n\nLas recompensas diarias del 0.3% al 1.1% se reflejan a diario. También puede capitalizar sus ganancias para hacer crecer sus activos de manera eficiente." },
          { sender: "user", text: "Поняла. Попробую отправить через MetaMask. Пришлите адрес для депозита.", translated: "Entiendo. Intentaré enviar desde MetaMask. Por favor, dígame la dirección a la que debo enviar." },
          { sender: "ai", text: "Поскольку вы взаимодействуете напрямую со смарт-контрактом, всегда берите актуальный адрес через кнопку «Deposit» в вашем личном кабинете.\n\nОстерегайтесь фишинговых сайтов и всегда проверяйте, что находитесь на официальном домене oxustech.ai.", translated: "Dado que interactúa directamente con el contrato inteligente, obtenga siempre la dirección más reciente mediante el botón 'Deposit' de su panel de control.\n\nTenga cuidado con los sitios de phishing y asegúrese de estar en el dominio oficial oxustech.ai antes de proceder." }
        ]
      },
      notes: {
        u1: [
          { date: "14 июл, 15:30", text: "Интересовалась минимальным депозитом. Хочет зайти со $100." },
          { date: "14 июл, 15:45", text: "Отправлена инструкция по созданию MetaMask." }
        ],
        u2: [
          { date: "13 июл, 12:20", text: "Технически подкован, расспрашивал про скорость сделок (арбитражное окно)." }
        ],
        u3: [
          { date: "12 июл, 09:10", text: "Хочет диверсифицировать портфель. Сеть Polygon полностью устраивает." }
        ]
      },
      tasks_data: {
        u1: [
          { title: "Напомнить про стартовый депозит", due: "Сегодня", priority: "high", type: "message" },
          { title: "Отправить инструкцию по кошелькам", due: "Через 2 дня", priority: "medium", type: "task" }
        ],
        u2: [
          { title: "Пройти онбординг", due: "В субботу", priority: "high", type: "call" }
        ],
        u3: [
          { title: "Контроль перевода средств", due: "Завтра", priority: "medium", type: "task" }
        ]
      },
      logs_data: {
        u1: [
          { date: "14 июл, 15:20", action: "Первый контакт в боте" },
          { date: "14 июл, 15:25", action: "Квалификация ИИ-агентом" },
          { date: "14 июл, 15:42", action: "Запрос ссылки на кошелек" }
        ],
        u2: [
          { date: "13 июл, 12:05", action: "Переход по ссылке" },
          { date: "13 июл, 12:15", action: "Диалог с ИИ о безопасности" }
        ],
        u3: [
          { date: "12 июл, 09:00", action: "Переход из Instagram воронки" }
        ]
      }
    },
    chats: {
      globe_mockup_hint: "Это сообщение переведено ИИ в реальном времени. Нажмите значок глобуса для оригинала.",
      globe_mockup_hint_translated: "Este mensaje ha sido traducido por la IA en tiempo real. Presione el ícono del globo para ver el original.",
      tabs: {
        my_referrals: "Мои партнеры",
        full_structure: "Вся структура"
      },
      header_panel: {
        ai_mode: "Режим ИИ",
        scripts: "Скрипты",
        lang: "Язык"
      },
      lang_modal: {
        title: "Настройка языков чата",
        client_lang: "Язык клиента:",
        manager_lang: "Ваш язык:",
        save: "Применить",
        ai_alert: "ИИ переводит сообщения автоматически",
        languages: {
          en: "English",
          ru: "Русский",
          de: "Deutsch",
          es: "Español",
          pt: "Português",
          fr: "Français",
          it: "Italiano",
          ja: "日本語",
          ko: "한국어",
          zh: "中文"
        }
      },
      scripts_panel: {
        title: "Скрипты продаж",
        items: [
          { name: "Приветствие", text: "Здравствуйте! Спасибо за интерес к OxusTech. У нас можно начать всего с $50 USDT. О какой функции рассказать подробнее: доходность от депозита или работа наших ИИ-агентов на Polymarket?" },
          { name: "ИИ-арбитраж", text: "OxusTech использует автономных ИИ-агентов для совершения быстрых арбитражных сделок на Polymarket с доходностью от 0.3% до 1.1% в день. Депозиты защищены смарт-контрактами в сети Polygon." },
          { name: "Доходность", text: "Депозит приносит от 0.3% до 1.1% в день (до +30% в месяц). Полная ликвидность: вы можете выводить средства и прибыль в любой момент без блокировок и штрафов." },
          { name: "Без KYC", text: "OxusTech — децентрализованная платформа. Регистрация и KYC не требуются. Всё, что вам нужно для старта — кошелек MetaMask, Trust Wallet или Rabby в сети Polygon." }
        ]
      },
      send_placeholder: "Написать сообщение...",
      my_referrals_chats: [
        { id: "c1", userId: "u1", name: "Анна Миллер", lastMessage: "Нашла, спасибо!", time: "14:32", unread: 2, source: "web", client_lang: "es", manager_lang: "ru" },
        { id: "c2", userId: "u2", name: "Дэвид Чен", lastMessage: "Да, это понятно.", time: "Вчера", unread: 0, source: "tg", client_lang: "en", manager_lang: "ru" },
        { id: "c3", userId: "u3", name: "София Родригез", lastMessage: "Отправила 100 USDT.", time: "12 июл", unread: 0, source: "tg", client_lang: "es", manager_lang: "ru" }
      ],
      structure_generations: [
        {
          level: 1,
          chats: [
            { id: "c1", userId: "u1", name: "Анна Миллер", lastMessage: "Нашла, спасибо!", time: "14:32", unread: 2, source: "web", client_lang: "es", manager_lang: "ru" },
            { id: "c2", userId: "u2", name: "Дэвид Чен", lastMessage: "Да, это понятно.", time: "Вчера", unread: 0, source: "tg", client_lang: "en", manager_lang: "ru" },
            { id: "c3", userId: "u3", name: "София Родригез", lastMessage: "Отправила 100 USDT.", time: "12 июл", unread: 0, source: "tg", client_lang: "es", manager_lang: "ru" }
          ]
        },
        {
          level: 2,
          chats: [
            { id: "c4", userId: "u4", name: "Джеймс Уилсон", lastMessage: "Условия отличные.", time: "11 июл", unread: 0, source: "web", client_lang: "en", manager_lang: "ru" },
            { id: "c5", userId: "u5", name: "Мария Сантос", lastMessage: "5 новых партнеров сегодня!", time: "10 июл", unread: 0, source: "tg", client_lang: "pt", manager_lang: "ru" },
            { id: "c6", userId: "u6", name: "Алекс Ким", lastMessage: "Посмотрел контракт в Polygonscan.", time: "09 июл", unread: 0, source: "tg", client_lang: "ko", manager_lang: "ru" }
          ]
        }
      ],
      client_info: {
        add_task: "Добавить задачу",
        tabs: {
          info: "Инфо",
          tasks: "Задачи",
          notes: "Заметки",
          logs: "История"
        }
      }
    },
    tasks: {
      add_new: "Новая задача",
      tabs: {
        current: "Текущие",
        completed: "Выполненные",
        finished: "Отмененные"
      },
      groups: {
        overdue: "Просрочено",
        today: "Сегодня",
        this_week: "На этой неделе",
        planned: "Запланировано"
      },
      priority: {
        high: "Высокий",
        medium: "Средний",
        low: "Низкий"
      },
      table: {
        due: "Срок",
        type: "Тип",
        client: "Клиент",
        title: "Заголовок",
        priority: "Приоритет"
      },
      types: {
        message: "Сообщение",
        call: "Звонок",
        meeting: "Встреча",
        task: "Задача"
      },
      items: [
        { id: "t1", title: "Напомнить про стартовый депозит", description: "Обсудить минимальную сумму для запуска ИИ-агентов", userId: "u1", userName: "Анна Миллер", priority: "high", group: "today", date: "14 июл", type: "message", status: "current" },
        { id: "t2", title: "Отправить инструкцию по кошелькам", description: "Пошаговая настройка MetaMask", userId: "u1", userName: "Анна Миллер", priority: "medium", group: "this_week", date: "16 июл", type: "task", status: "current" },
        { id: "t3", title: "Контрольный звонок", description: "Узнать, удалось ли пополнить кошелек в сети Polygon", userId: "u1", userName: "Анна Миллер", priority: "low", group: "planned", date: "20 июл", type: "call", status: "current" },
        { id: "t4", title: "Позвонить Дэвиду для онбординга", description: "Пройтись по функционалу платформы OxusTech", userId: "u2", userName: "Дэвид Чен", priority: "high", group: "planned", date: "25 июл", type: "call", status: "current" }
      ]
    },
    assistant_panel: {
      title: "Ассистент Мия",
      greeting: "Привет! Я твой ИИ-помощник. Помогаю анализировать структуру, настраивать рассылки и следить за арбитражными спредами. О чем хочешь узнать?",
      placeholder: "Задать вопрос Мие...",
      messages: [
        { sender: "ai", text: "Привет! Я твой ИИ-помощник. Помогаю анализировать структуру, настраивать рассылки и следить за арбитражными спредами. О чем хочешь узнать?" }
      ]
    },
    guides_page: {
      title: "Инструкции по OxusTech",
      landing_title: "Настройка структуры",
      search_placeholder: "Поиск по инструкциям и FAQ...",
      back: "Назад",
      prev: "Назад",
      next: "Далее",
      article_placeholder: "Это подробный просмотр статьи базы знаний. Здесь представлены все технические нюансы, включая визуальные скриншоты и пошаговый процесс онбординга.",
      assistant: {
        need_help: "Нужна помощь?",
        chat_btn: "Чат с Мией"
      },
      articles: [
        { id: "metamask", title: "Как создать кошелек MetaMask", description: "Пошаговое руководство по установке и первой настройке кошелька MetaMask." },
        { id: "topup", title: "Как пополнить баланс в сети Polygon", description: "Инструкция по покупке POL/USDT и переводу их на ваш MetaMask." },
        { id: "register", title: "Как зарегистрироваться в OxusTech", description: "Быстрый обзор процесса регистрации и подключения вашего кошелька к платформе." },
        { id: "invest", title: "Как запустить ИИ-агентов", description: "Инструкция по открытию депозита в пуле ликвидности для арбитража Polymarket." },
        { id: "withdraw", title: "Как выводить прибыль", description: "Процесс автоматического получения выплат на ваш личный кошелек." },
        { id: "business", title: "Как строить структуру с AI CRM", description: "Использование встроенных ИИ-ассистентов для онбординга новых участников структуры." }
      ],
      faq: [
        {
          q: "Что такое OxusTech и как он работает?",
          a: "OxusTech — это децентрализованная алгоритмическая платформа ИИ-агентов для заработка на арбитраже Polymarket. Основная идея в том, что ваши средства работают в рамках смарт-контракта, который направляет ликвидность на рынки прогнозов. ИИ-агенты выкупают недооцененные исходы событий за миллисекунды, гарантируя безрисковую прибыль за счет спреда."
        },
        {
          q: "Откуда берется высокая доходность до +30% в месяц?",
          a: "Такая доходность возможна благодаря уникальной скорости совершения сделок (2-5 мс) и высокой волатильности рынков прогнозов Polymarket (с объемом более $10 млрд/мес). ИИ-агенты находят арбитражные ситуации (например, когда сумма ставок на противоположные исходы события составляет менее $1) и выкупают спред, фиксируя мгновенную прибыль."
        },
        {
          q: "В безопасности ли мои деньги?",
          a: "Да, все операции проходят через неизменяемые смарт-контракты в сети Polygon. Вы не передаете приватные ключи от своего кошелька. Контракт гарантирует, что ваши средства используются исключительно для обеспечения ликвидности в арбитражных сделках, а прибыль начисляется на ваш баланс ежедневно. Код открыт и проверен."
        },
        {
          q: "Почему используется USDT в сети Polygon?",
          a: "USDT — это стейблкоин, привязанный к доллару США, что защищает ваш баланс от колебаний цен биткоина. Сеть Polygon выбрана из-за мгновенных транзакций и ничтожно малых комиссий за газ (доли цента), а также из-за того, что сам Polymarket развернут на Polygon."
        },
        {
          q: "Как быстро я могу вывести свою прибыль?",
          a: "Начисления прибыли происходят ежедневно. Вывод прибыли и депозита полностью автоматизирован через смарт-контрактов. Вы можете заказать выплату в любой момент в личном кабинете — средства поступят на ваш кошелек в течение 72 часов (или мгновенно, в зависимости от загрузки)."
        },
        {
          q: "Нужно ли мне приглашать новых участников для получения дохода?",
          a: "Нет, это абсолютно добровольно. OxusTech предлагает пассивный доход на ИИ-арбитраже. Партнерская программа создана для тех, кто хочет получать дополнительный доход от оборота построенной структуры."
        },
        {
          q: "Может ли компания изменить условия маркетинга или процентные ставки?",
          a: "Нет. Все правила начисления бонусов и распределения прибыли прописаны в смарт-контракте при запуске. Логика контракта неизменяема и децентрализована — никто не может изменить проценты или остановить выплаты."
        }
      ]
    },
    landings_page: {
      title: "Маркетинговые ссылки",
      view_btn: "Смотреть",
      copy_btn: "Копировать",
      items: [
        { id: "l1", title: "Главный лендинг", image: "assets/images/system/land-1.png", url: "oxustech.ai/ref/system", type: "home" },
        { id: "l2", title: "Инвестиции в OxusTech", image: "assets/images/system/land-2.png", url: "oxustech.ai/invest/ref/system", type: "invest" },
        { id: "l3", title: "Партнерский бизнес", image: "assets/images/system/land-3.png", url: "oxustech.ai/partner/ref/system", type: "business" }
      ],
      bots_title: "Мои телеграм боты",
      add_bot_btn: "Добавить бота",
      bots: [
        { id: "b1", name: "Основной бот OxusTech" },
        { id: "b2", name: "Запасной бот" },
        { id: "b3", name: "Бот для рассылки" }
      ]
    }
  };

  // --- Dashboard State Machine ---
  var state = {
    page: "chats", // team, chats, tasks, guides, landings
    activeTeamTab: "all", // all, new, registered, investor, partner
    selectedLeadId: null, // u1, u2...
    ccTab: "chat", // info, chat, notes, tasks, logs
    selectedChatId: "c1", // c1, c2...
    chatListTab: "structure", // my, structure
    aiMode: false,
    chatInput: "",
    assistantOpen: false,
    scriptsOpen: false,
    langModalOpen: false,
    refCopied: false,
    selectedArticleId: null,
    faqOpenIndex: null,
    openGenerations: [1, 2, 3, 4],
    clientLang: "en",
    managerLang: "ru",
    openDropdown: null, // client, manager
    leadsData: {},
    chatTranslate: {} // key: userId-messageIdx -> boolean
  };

  // Clone leads data from template to state for local modifications (like status changes)
  dict.team.generations.forEach(function(gen) {
    gen.leads.forEach(function(lead) {
      state.leadsData[lead.id] = JSON.parse(JSON.stringify(lead));
    });
  });

  // --- SVG Icons Map (to embed Lucide icons directly) ---
  var icons = {
    users: '<svg class="sd-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    chats: '<svg class="sd-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><circle cx="12" cy="12" r="1"/></svg>',
    tasks: '<svg class="sd-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/><path d="m3 12 2 2 4-4"/></svg>',
    guides: '<svg class="sd-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    landings: '<svg class="sd-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    copy: '<svg class="sd-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',
    check: '<svg class="sd-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    globe: '<svg class="sd-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
    chevronDown: '<svg class="sd-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
    chevronRight: '<svg class="sd-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
    chevronLeft: '<svg class="sd-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
    x: '<svg class="sd-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    plus: '<svg class="sd-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5v14"/></svg>',
    bot: '<svg class="sd-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>',
    botOff: '<svg class="sd-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/><path d="m19 19-7-7-7-7"/></svg>',
    zap: '<svg class="sd-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/></svg>',
    send: '<svg class="sd-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>',
    phone: '<svg class="sd-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    fileText: '<svg class="sd-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>',
    star: '<svg class="sd-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    search: '<svg class="sd-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    play: '<svg class="sd-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>',
    telegram: '<svg class="sd-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2L2 9.5l7.5 3L21.5 2z"/><path d="M9.5 12.5V22l3.5-5.5-3.5-4z"/></svg>'
  };

  // --- Helper Functions ---
  function getLeadById(id) {
    if (!id) return null;
    return state.leadsData[id] || null;
  }

  function getRefUrl(type) {
    var domain = 'oxustech.ai';
    var sponsor = 'system';
    if (!type || type === 'home') {
      return domain + '/ref/' + sponsor;
    }
    return domain + '/' + type + '/ref/' + sponsor;
  }

  function formatMsgText(text) {
    if (!text) return '';
    var normalized = text.replace(/\\n/g, '\n').replace(/\r\n/g, '\n');
    var paragraphs = normalized.split(/\n\n+/);
    return paragraphs.map(function(p) {
      var html = p.trim().replace(/\n/g, '<br />');
      return '<div class="message-paragraph">' + html + '</div>';
    }).join('');
  }

  function renderAvatar(name, path, size) {
    var initials = name.split(' ').map(function(w) { return w[0]; }).join('').slice(0, 2).toUpperCase();
    var hue = 0;
    for (var i = 0; i < name.length; i++) {
      hue += name.charCodeAt(i) * (i + 1);
    }
    var avatarStyle = 'width: ' + size + 'px; height: ' + size + 'px; background: hsl(' + (hue % 360) + ', 60%, 80%); color: hsl(' + (hue % 360) + ', 50%, 30%);';
    return '<div class="sd-avatar" style="' + avatarStyle + '">' +
      (path ? '<img src="' + path + '" alt="' + name + '" />' : initials) +
      '</div>';
  }

  // --- Render Templates ---

  // 1. Sidebar Template
  function renderSidebar() {
    var allLeadsCount = Object.keys(state.leadsData).length;
    var sidebarItems = [
      { key: "team", icon: icons.users, label: dict.sidebar.team, count: allLeadsCount },
      { key: "chats", icon: icons.chats, label: dict.sidebar.chats, count: 3 },
      { key: "tasks", icon: icons.tasks, label: dict.sidebar.tasks, count: 4 },
      { key: "guides", icon: icons.guides, label: dict.sidebar.guides, count: 0 },
      { key: "landings", icon: icons.landings, label: dict.sidebar.landings, count: 0 }
    ];

    var html = '<aside class="sd-sidebar">' +
      '<div class="sd-sidebar-logo">AI CRM Panel</div>' +
      '<nav class="sd-sidebar-nav">';

    sidebarItems.forEach(function(item) {
      var activeClass = state.page === item.key ? 'active' : '';
      var badgeHtml = item.count > 0 ? '<span class="sd-nav-badge ' + item.key + '">' + item.count + '</span>' : '';
      html += '<button class="sd-nav-item ' + activeClass + '" data-sidebar-key="' + item.key + '">' +
        '<span class="sd-nav-item-left">' + item.icon + ' ' + item.label + '</span>' +
        badgeHtml +
        '</button>';
    });

    html += '</nav></aside>';
    return html;
  }

  // 2. Mobile Bottom Nav Template
  function renderMobileNav() {
    var allLeadsCount = Object.keys(state.leadsData).length;
    var navItems = [
      { key: "team", icon: icons.users, label: dict.sidebar.team, count: allLeadsCount },
      { key: "chats", icon: icons.chats, label: dict.sidebar.chats, count: 3 },
      { key: "tasks", icon: icons.tasks, label: dict.sidebar.tasks, count: 4 },
      { key: "guides", icon: icons.guides, label: dict.sidebar.guides, count: 0 }
    ];

    var html = '<nav class="sd-mobile-nav">';
    navItems.forEach(function(item) {
      var activeClass = state.page === item.key ? 'active' : '';
      var badgeHtml = item.count > 0 ? '<span class="sd-mobile-nav-badge">' + item.count + '</span>' : '';
      html += '<button class="sd-mobile-nav-item ' + activeClass + '" data-sidebar-key="' + item.key + '">' +
        item.icon +
        '<span>' + item.label + '</span>' +
        badgeHtml +
        '</button>';
    });
    html += '</nav>';
    return html;
  }

  // 3. Header Template
  function renderHeader() {
    var copyIcon = state.refCopied ? icons.check : icons.copy;
    var copyText = state.refCopied ? '<span class="text-green ml-4">' + dict.header.copied + '</span>' : '';
    
    return '<header class="sd-header">' +
      '<div class="ref-link-container">' +
      '<div class="sd-reflink" id="sd-header-reflink-btn">' +
      '<span class="sd-reflink-label">' + dict.header.reflink_label + '</span>' +
      '<span class="sd-reflink-url">' + getRefUrl('home') + '</span>' +
      copyIcon +
      copyText +
      '</div>' +
      '</div>' +
      '<button class="sd-assistant-trigger" id="sd-trigger-assistant-btn">' +
      '<div class="sd-mia-avatar"></div>' +
      '<span>' + dict.header.assistant + '</span>' +
      '</button>' +
      '</header>';
  }

  // 4. Team Page Tab Template
  function renderTeamPage() {
    var activeTab = state.activeTeamTab;
    
    var html = '<div class="sd-team-page">' +
      '<div class="sd-funnel-tabs">';

    dict.team.tabs.forEach(function(tab) {
      var activeClass = activeTab === tab.id ? 'active' : '';
      var leadsOfStatus = Object.keys(state.leadsData).map(function(k) { return state.leadsData[k]; }).filter(function(l) {
        return tab.id === 'all' || l.status === tab.id;
      });
      html += '<button class="sd-funnel-tab ' + activeClass + '" data-team-tab-id="' + tab.id + '">' +
        tab.label + ' <span class="sd-tab-count">' + leadsOfStatus.length + '</span>' +
        '</button>';
    });

    html += '</div>' +
      '<div class="sd-team-content">';

    dict.team.generations.forEach(function(gen) {
      var leadsInGen = gen.leads.map(function(l) { return getLeadById(l.id); }).filter(function(lead) {
        return activeTab === 'all' || lead.status === activeTab;
      });

      if (leadsInGen.length === 0) return;

      var isGenOpen = state.openGenerations.indexOf(gen.level) !== -1;
      var chevronIcon = isGenOpen ? icons.chevronDown : icons.chevronRight;

      html += '<div class="sd-generation">' +
        '<div class="sd-gen-header" data-gen-level="' + gen.level + '">' +
        '<span>' + dict.team.generation_label + ' ' + gen.level + '</span>' +
        chevronIcon +
        '</div>';

      if (isGenOpen) {
        html += '<table class="sd-leads-table">' +
          '<thead class="sd-table-head">' +
          '<tr>' +
          '<th>' + dict.team.table.name + '</th>' +
          '<th>' + dict.team.table.email + '</th>' +
          '<th>' + dict.team.table.phone + '</th>' +
          '<th>' + dict.team.table.telegram + '</th>' +
          '<th>' + dict.team.table.rating + '</th>' +
          '</tr>' +
          '</thead>' +
          '<tbody>';

        leadsInGen.forEach(function(lead) {
          var rowActiveClass = state.selectedLeadId === lead.id ? 'active' : '';
          
          html += '<tr class="sd-lead-row ' + rowActiveClass + '" data-lead-id="' + lead.id + '">' +
            '<td class="sd-lead-cell">' +
            '<div class="sd-lead-name-cell">' +
            renderAvatar(lead.name, lead.avatar, 24) +
            '<span>' + lead.name + '</span>' +
            '</div>' +
            '</td>' +
            '<td class="sd-lead-cell">' + lead.email + '</td>' +
            '<td class="sd-lead-cell">' + lead.phone + '</td>' +
            '<td class="sd-lead-cell text-green">' + (lead.telegram || '-') + '</td>' +
            '<td class="sd-lead-cell">' +
            '<div class="flex-center-6 rate-stars">';

          var roundedRating = Math.round(lead.rating / 2);
          for (var star = 1; star <= 5; star++) {
            var isFilled = star <= roundedRating;
            var fillStyle = isFilled ? '#faad14' : 'transparent';
            var strokeStyle = isFilled ? '#faad14' : '#e0e0e0';
            html += '<svg width="12" height="12" viewBox="0 0 24 24" fill="' + fillStyle + '" stroke="' + strokeStyle + '" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
          }

          html += '</div>' +
            '</td>' +
            '</tr>';
        });

        html += '</tbody></table>';
      }

      html += '</div>';
    });

    html += '</div></div>';
    return html;
  }

  // 5. Chats Page Template
  function renderChatsPage() {
    var activeChat = null;
    var allChats = dict.chats.my_referrals_chats;
    if (state.chatListTab === 'structure') {
      allChats = dict.chats.structure_generations.flatMap(function(g) { return g.chats; });
    }

    allChats.forEach(function(c) {
      if (c.id === state.selectedChatId) activeChat = c;
    });

    if (!activeChat && allChats.length > 0) {
      activeChat = allChats[0];
      state.selectedChatId = activeChat.id;
    }

    var chatLeadObj = activeChat ? getLeadById(activeChat.userId) : null;
    var chatMessages = activeChat ? (dict.client_card.messages[activeChat.userId] || []) : [];

    var html = '<div class="sd-chats-page ' + (activeChat ? 'chat-selected' : '') + '">' +
      '<div class="sd-chats-left">' +
      '<div class="sd-cht-tabs">';

    var myActive = state.chatListTab === 'my' ? 'active' : '';
    var structActive = state.chatListTab === 'structure' ? 'active' : '';
    html += '<button class="sd-cht-tab ' + myActive + '" data-chat-list-tab="my">' + dict.chats.tabs.my_referrals + '</button>' +
      '<button class="sd-cht-tab ' + structActive + '" data-chat-list-tab="structure">' + dict.chats.tabs.full_structure + '</button>' +
      '</div>' +
      '<div class="sd-chats-list-items">';

    if (state.chatListTab === 'structure') {
      dict.chats.structure_generations.forEach(function(gen) {
        html += '<div class="sd-gen-divider">' + dict.team.generation_label + ' ' + gen.level + '</div>';
        gen.chats.forEach(function(chat) {
          html += renderChatItem(chat, activeChat);
        });
      });
    } else {
      dict.chats.my_referrals_chats.forEach(function(chat) {
        html += renderChatItem(chat, activeChat);
      });
    }

    html += '</div></div>' +
      '<div class="sd-chats-center">';

    if (activeChat) {
      var botIcon = state.aiMode ? icons.bot : icons.botOff;
      var langLabel = activeChat ? (activeChat.client_lang + ' / ' + activeChat.manager_lang).toUpperCase() : dict.chats.header_panel.lang;
      
      html += '<div class="sd-chats-toolbar">' +
        '<div class="sd-toolbar-left">' +
        '<div class="sd-toolbar-item" id="sd-chat-toggle-ai">' +
        botIcon + ' <span>' + dict.chats.header_panel.ai_mode + '</span>' +
        '</div>' +
        '<div class="sd-toolbar-item" id="sd-chat-open-scripts">' +
        icons.zap + ' <span>' + dict.chats.header_panel.scripts + '</span>' +
        '</div>' +
        '<div class="sd-toolbar-item" id="sd-chat-open-lang">' +
        icons.globe + ' <span>' + langLabel + '</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="sd-chat-messages" id="sd-chat-messages-container">';

      chatMessages.forEach(function(m, i) {
        var senderClass = m.sender === 'user' ? 'user' : 'ai';
        var translatedKey = activeChat.userId + '-' + i;
        var displayTranslate = state.chatTranslate[translatedKey];
        var textToShow = displayTranslate && m.translated ? m.translated : m.text;

        html += '<div class="sd-msg sd-msg-' + senderClass + '">' +
          '<div class="sd-msg-text">' + formatMsgText(textToShow) + '</div>';

        if (m.translated && (activeChat.client_lang !== activeChat.manager_lang)) {
          var globeActiveClass = displayTranslate ? 'active' : '';
          html += '<button class="sd-msg-globe ' + globeActiveClass + '" data-msg-idx="' + i + '" data-chat-user-id="' + activeChat.userId + '">' +
            icons.globe +
            '</button>';
        }

        html += '</div>';
      });

      html += '</div>' +
        '<div class="sd-chat-input-bar border-top">' +
        '<textarea placeholder="' + (state.aiMode ? dict.chats.lang_modal.ai_alert : dict.chats.send_placeholder) + '" class="sd-chat-input ' + (state.aiMode ? 'ai-active' : '') + '" id="sd-chat-input-field" ' + (state.aiMode ? 'disabled' : '') + '>' + state.chatInput + '</textarea>' +
        '<button class="sd-send-btn ' + (state.aiMode ? 'disabled' : '') + '" id="sd-chat-send-btn" ' + (state.aiMode ? 'disabled' : '') + '>' + icons.send + '</button>' +
        '</div>';
    } else {
      html += '<div class="sd-no-chat-selected">' +
        '<div style="opacity: 0.15; margin-bottom: 1rem;"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>' +
        '<p style="opacity: 0.5">Выберите чат из списка слева</p>' +
        '</div>';
    }

    html += '</div>';
    
    // Desktop inline Client Card on the right in Chats page
    if (activeChat && chatLeadObj) {
      html += renderClientCardRightPanel(chatLeadObj);
    }
    
    html += '</div>';
    return html;
  }

  function renderChatItem(chat, activeChat) {
    var leadForAvatar = getLeadById(chat.userId);
    var activeClass = activeChat && activeChat.id === chat.id ? 'active' : '';
    var thisChatMsgs = dict.client_card.messages[chat.userId] || [];
    var lastMsgObj = thisChatMsgs[thisChatMsgs.length - 1];
    var previewText = lastMsgObj ? lastMsgObj.text.slice(0, 30) + (lastMsgObj.text.length > 30 ? '...' : '') : chat.lastMessage;
    var unreadHtml = chat.unread > 0 ? '<span class="sd-unread-badge">' + chat.unread + '</span>' : '';

    return '<div class="sd-chat-item ' + activeClass + '" data-chat-id="' + chat.id + '">' +
      '<div class="sd-chat-item-inner">' +
      renderAvatar(chat.name, leadForAvatar ? leadForAvatar.avatar : null, 36) +
      '<div class="flex-1 min-w-0">' +
      '<div class="flex-between mb-0">' +
      '<span class="text-bold-8">' + chat.name + '</span>' +
      '<span class="chat-time text-gray-xs">' + chat.time + '</span>' +
      '</div>' +
      '<div class="flex-between">' +
      '<span class="chat-preview-text">' + previewText + '</span>' +
      unreadHtml +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';
  }

  // Chats page inline right panel
  function renderClientCardRightPanel(lead) {
    var statusText = dict.statuses[lead.status] || lead.status;
    
    var html = '<div class="sd-cc-left sd-desktop-only" style="width: 250px; border-left: 1px solid #ededed; border-right: none; height: 100%; position: relative;">' +
      '<div class="sd-cc-header" style="margin-bottom: 12px;">' +
      renderAvatar(lead.name, lead.avatar, 64) +
      '<p class="sd-cc-name" style="margin: 8px 0 4px;">' + lead.name + '</p>' +
      '<span class="sd-cc-status status-' + lead.status + '">' + statusText + '</span>' +
      '</div>' +
      '<div class="sd-cc-info" style="gap: 6px;">' +
      '<div class="sd-cc-info-item"><span class="sd-cc-label">' + dict.client_card.info.email + ':</span> <span class="sd-cc-value" style="word-break: break-all;">' + lead.email + '</span></div>' +
      '<div class="sd-cc-info-item"><span class="sd-cc-label">' + dict.client_card.info.phone + ':</span> <span class="sd-cc-value">' + lead.phone + '</span></div>' +
      '<div class="sd-cc-info-item"><span class="sd-cc-label">' + dict.client_card.info.telegram + ':</span> <span class="sd-cc-value text-green">' + lead.telegram + '</span></div>' +
      '<div class="sd-cc-info-item"><span class="sd-cc-label">' + dict.client_card.info.rating + ':</span> <span class="sd-cc-value">' + lead.rating + '</span></div>' +
      '<div class="sd-cc-info-item"><span class="sd-cc-label">' + dict.client_card.info.language + ':</span> <span class="sd-cc-value">' + lead.language + '</span></div>' +
      '<div class="sd-cc-info-item"><span class="sd-cc-label">' + dict.client_card.info.country + ':</span> <span class="sd-cc-value">' + lead.country + '</span></div>' +
      '<div class="sd-cc-info-item"><span class="sd-cc-label">' + dict.client_card.info.manager + ':</span> ';
      
    if (lead.managerId) {
      var manager = getLeadById(lead.managerId);
      html += '<span class="sd-cc-value text-green hover-underline clickable-manager" data-manager-id="' + lead.managerId + '" style="cursor: pointer;">' + (manager ? manager.name : 'Партнер') + '</span>';
    } else {
      html += '<span class="sd-cc-value">' + dict.client_card.info.manager_you + '</span>';
    }
    
    html += '</div>' +
      '</div>' +
      '</div>';
    return html;
  }

  // 6. Tasks Page Template
  function renderTasksPage() {
    var items = dict.tasks.items.filter(function(t) { return t.status === state.ccTab || t.status === 'current'; }); // Fallback/filter logic

    var html = '<div class="sd-tasks-page">' +
      '<div class="sd-tasks-header">' +
      '<div class="sd-tasks-tabs">';

    Object.keys(dict.tasks.tabs).forEach(function(key) {
      var label = dict.tasks.tabs[key];
      // Reuse ccTab for tasks pages switching to keep state simple
      var activeClass = state.ccTab === key || (state.ccTab === 'chat' && key === 'current') ? 'active' : '';
      html += '<div class="sd-task-tab ' + activeClass + '" data-task-tab-key="' + key + '">' + label + '</div>';
    });

    html += '</div>' +
      '<button class="sd-btn-new-task sd-desktop-only">' + icons.plus + ' ' + dict.tasks.add_new + '</button>' +
      '</div>' +
      '<div class="sd-tasks-content">';

    var activeTaskTab = (state.ccTab === 'completed' || state.ccTab === 'finished') ? state.ccTab : 'current';

    if (activeTaskTab === 'current') {
      var groups = ['overdue', 'today', 'this_week', 'planned'];
      groups.forEach(function(group) {
        var gItems = items.filter(function(t) { return t.group === group; });
        if (gItems.length === 0) return;

        html += '<div class="sd-task-group open">' +
          '<div class="sd-tg-header">' +
          '<div class="flex-center-8">' +
          '<div class="sd-tg-dot group-' + group + '"></div>' +
          '<span>' + dict.tasks.groups[group] + '</span>' +
          '<span class="ml-4 opacity-50">' + gItems.length + '</span>' +
          '</div>' +
          icons.chevronDown +
          '</div>' +
          '<div class="sd-tg-table-wrapper">' +
          '<table class="sd-tasks-table">' +
          '<thead>' +
          '<tr>' +
          '<th>' + dict.tasks.table.due + '</th>' +
          '<th>' + dict.tasks.table.type + '</th>' +
          '<th>' + dict.tasks.table.client + '</th>' +
          '<th>' + dict.tasks.table.title + '</th>' +
          '<th>' + dict.tasks.table.priority + '</th>' +
          '</tr>' +
          '</thead>' +
          '<tbody>';

        gItems.forEach(function(task) {
          var typeIcon = icons.task;
          if (task.type === 'call') typeIcon = icons.phone;
          if (task.type === 'message') typeIcon = icons.chats;
          if (task.type === 'meeting') typeIcon = icons.users;

          var clientLink = task.userName ? '<button class="sd-task-client-link" data-client-lead-id="' + task.userId + '">' + task.userName + '</button>' : '-';

          html += '<tr class="sd-task-row">' +
            '<td class="sd-task-cell nowrap">' + task.date + '</td>' +
            '<td class="sd-task-cell"><div class="flex-center-6">' + typeIcon + ' ' + dict.tasks.types[task.type] + '</div></td>' +
            '<td class="sd-task-cell nowrap">' + clientLink + '</td>' +
            '<td class="sd-task-cell">' + task.title + '</td>' +
            '<td class="sd-task-cell"><span class="sd-task-priority priority-' + task.priority + '"></span>' + dict.tasks.priority[task.priority] + '</td>' +
            '</tr>';
        });

        html += '</tbody></table></div></div>';
      });
    } else {
      var completedItems = dict.tasks.items.filter(function(t) { return t.status === activeTaskTab; });
      html += '<div class="sd-task-group open">' +
        '<div class="sd-tg-table-wrapper" style="padding: 0;">' +
        '<table class="sd-tasks-table">' +
        '<thead>' +
        '<tr>' +
        '<th>' + dict.tasks.table.due + '</th>' +
        '<th>' + dict.tasks.table.type + '</th>' +
        '<th>' + dict.tasks.table.client + '</th>' +
        '<th>' + dict.tasks.table.title + '</th>' +
        '<th>' + dict.tasks.table.priority + '</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>';

      completedItems.forEach(function(task) {
        var typeIcon = icons.task;
        if (task.type === 'call') typeIcon = icons.phone;
        if (task.type === 'message') typeIcon = icons.chats;
        if (task.type === 'meeting') typeIcon = icons.users;

        var clientLink = task.userName ? '<button class="sd-task-client-link" data-client-lead-id="' + task.userId + '">' + task.userName + '</button>' : '-';

        html += '<tr class="sd-task-row">' +
          '<td class="sd-task-cell nowrap">' + task.date + '</td>' +
          '<td class="sd-task-cell"><div class="flex-center-6">' + typeIcon + ' ' + dict.tasks.types[task.type] + '</div></td>' +
          '<td class="sd-task-cell nowrap">' + clientLink + '</td>' +
          '<td class="sd-task-cell">' + task.title + '</td>' +
          '<td class="sd-task-cell"><span class="sd-task-priority priority-' + task.priority + '"></span>' + dict.tasks.priority[task.priority] + '</td>' +
          '</tr>';
      });

      html += '</tbody></table></div></div>';
    }

    html += '</div></div>';
    return html;
  }

  // 7. Guides Page Template
  function renderGuidesPage() {
    if (state.selectedArticleId) return renderGuideArticle();

    var html = '<div class="sd-guides-page">' +
      '<div class="sd-guide-page-header">' +
      '<h2 class="sd-page-title">' + dict.guides_page.title + '</h2>' +
      '<div class="sd-guides-search-wrapper">' +
      '<div class="sd-guides-search">' +
      icons.search +
      '<input type="text" placeholder="' + dict.guides_page.search_placeholder + '" id="sd-guides-search-input" />' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="sd-guides-grid">';

    dict.guides_page.articles.forEach(function(article) {
      html += '<div class="sd-guide-card" data-article-id="' + article.id + '">' +
        '<div class="sd-guide-icon-box">' +
        icons.guides +
        '</div>' +
        '<div class="sd-guide-card-content">' +
        '<h3 class="sd-guide-card-title">' + article.title + '</h3>' +
        '<p class="sd-guide-card-desc">' + article.description + '</p>' +
        '</div>' +
        '</div>';
    });

    html += '</div>' +
      '<div class="sd-faq-section">';

    dict.guides_page.faq.forEach(function(item, idx) {
      var isOpen = state.faqOpenIndex === idx;
      var chevron = isOpen ? icons.chevronDown : icons.chevronRight;
      var openClass = isOpen ? 'open' : '';
      
      html += '<div class="sd-faq-item ' + openClass + '">' +
        '<div class="sd-faq-item-title sd-faq-q" data-faq-idx="' + idx + '">' +
        '<span>' + item.q + '</span>' +
        chevron +
        '</div>';

      if (isOpen) {
        html += '<div class="sd-faq-a">' + item.a + '</div>';
      }
      html += '</div>';
    });

    html += '</div></div>';
    return html;
  }

  function renderGuideArticle() {
    var articleIndex = -1;
    dict.guides_page.articles.forEach(function(a, idx) {
      if (a.id === state.selectedArticleId) articleIndex = idx;
    });

    var article = dict.guides_page.articles[articleIndex];
    var prevArticle = articleIndex > 0 ? dict.guides_page.articles[articleIndex - 1] : null;
    var nextArticle = articleIndex < dict.guides_page.articles.length - 1 ? dict.guides_page.articles[articleIndex + 1] : null;

    var html = '<div class="sd-guide-article-page">' +
      '<button class="sd-back-btn" id="sd-guide-back-to-list">' +
      icons.chevronLeft + ' ' + dict.guides_page.back +
      '</button>' +
      '<div class="sd-guide-layout">' +
      '<aside class="sd-guide-nav-left">';

    dict.guides_page.articles.forEach(function(a) {
      var activeClass = a.id === state.selectedArticleId ? 'active' : '';
      html += '<button class="sd-guide-nav-item ' + activeClass + '" data-article-id="' + a.id + '">' + a.title + '</button>';
    });

    html += '<div class="sd-guide-assistant-card">' +
      '<p class="sd-assistant-label">' + dict.guides_page.assistant.need_help + '</p>' +
      '<div class="sd-assistant-person">' +
      '<div class="sd-mia-avatar bigger"></div>' +
      '</div>' +
      '<button class="sd-assistant-chat-btn" id="sd-guides-open-assistant-btn">' +
      icons.chats + ' ' + dict.guides_page.assistant.chat_btn +
      '</button>' +
      '</div>' +
      '</aside>' +
      '<main class="sd-guide-content-right">' +
      '<h2 class="sd-article-h">' + article.title + '</h2>' +
      '<div class="sd-video-placeholder">' +
      icons.play +
      '</div>' +
      '<div class="sd-article-text">' +
      '<p>' + article.description + '</p>' +
      '<p>' + dict.guides_page.article_placeholder + '</p>' +
      '</div>' +
      '<div class="sd-guide-nav-footer">';

    if (prevArticle) {
      html += '<button class="sd-nav-footer-btn prev" data-article-id="' + prevArticle.id + '">' +
        icons.chevronLeft + ' ' + dict.guides_page.prev +
        '</button>';
    } else {
      html += '<div></div>';
    }

    if (nextArticle) {
      html += '<button class="sd-nav-footer-btn next" data-article-id="' + nextArticle.id + '">' +
        dict.guides_page.next + ' ' + icons.chevronRight +
        '</button>';
    } else {
      html += '<div></div>';
    }

    html += '</div></main></div></div>';
    return html;
  }

  // 8. Landings Template
  function renderLandings() {
    var html = '<div class="sd-page-container page-landings">' +
      '<div class="sd-page-header">' +
      '<h2 class="sd-page-title">' + dict.landings_page.title + '</h2>' +
      '</div>' +
      '<div class="sd-landings-grid">';

    dict.landings_page.items.forEach(function(land) {
      html += '<div class="sd-land-card">' +
        '<div class="sd-land-preview">' +
        '<img src="' + land.image + '" alt="' + land.title + '" />' +
        '</div>' +
        '<div class="sd-land-info">' +
        '<h3 class="sd-land-title">' + land.title + '</h3>' +
        '<div class="sd-land-actions">' +
        '<button class="sd-land-btn copy" data-copy-url="' + getRefUrl(land.type) + '">' +
        icons.copy + ' <span>' + dict.landings_page.copy_btn + '</span>' +
        '</button>' +
        '<button class="sd-land-btn view" data-view-url="' + getRefUrl(land.type) + '">' +
        icons.globe + ' <span>' + dict.landings_page.view_btn + '</span>' +
        '</button>' +
        '</div>' +
        '</div>' +
        '</div>';
    });

    html += '</div>' +
      '<div class="sd-page-header" style="margin-top: 2rem;">' +
      '<h2 class="sd-page-title">' + dict.landings_page.bots_title + '</h2>' +
      '</div>' +
      '<div class="sd-bots-grid">';

    dict.landings_page.bots.forEach(function(bot) {
      html += '<div class="sd-bot-card">' +
        '<div class="sd-bot-avatar">' +
        icons.telegram +
        '</div>' +
        '<div class="sd-bot-info">' +
        '<h3 class="sd-bot-name">' + bot.name + '</h3>' +
        '</div>' +
        '<button class="sd-bot-copy-btn" data-copy-url="https://t.me/oxustech_bot?start=ref_system">' +
        icons.copy + ' <span>' + dict.landings_page.copy_btn + '</span>' +
        '</button>' +
        '</div>';
    });

    html += '<div class="sd-bot-card sd-bot-add-card">' +
      '<div class="sd-bot-add-icon">' +
      icons.plus +
      '</div>' +
      '<span class="sd-bot-add-text">' + dict.landings_page.add_bot_btn + '</span>' +
      '</div>';

    html += '</div></div>';
    return html;
  }

  // 9. Client Card Modal / Overlay (only for Team Page lead click)
  function renderClientCardModal() {
    var lead = getLeadById(state.selectedLeadId);
    if (!lead) return '';

    var statusOrder = ["new", "registered", "investor", "partner"];
    var currentIdx = statusOrder.indexOf(lead.status);
    var prevStatus = currentIdx > 0 ? statusOrder[currentIdx - 1] : null;
    var nextStatus = currentIdx < statusOrder.length - 1 ? statusOrder[currentIdx + 1] : null;

    var statusText = dict.statuses[lead.status] || lead.status;

    var html = '<div class="sd-panel-overlay sd-client-card-panel open">' +
      '<div class="sd-panel-content">' +
      // Mobile sticky header
      '<div class="sd-cc-mobile-header sd-mobile-only">' +
      '<button class="sd-cc-mobile-back" id="sd-cc-close-btn">' + icons.chevronLeft + '</button>' +
      '<div class="sd-cc-mobile-tabs">';

    Object.keys(dict.client_card.tabs).forEach(function(key) {
      var tabLabel = dict.client_card.tabs[key];
      var activeClass = state.ccTab === key ? 'active' : '';
      html += '<button class="sd-cc-tab ' + activeClass + '" data-cc-tab-key="' + key + '">' + tabLabel + '</button>';
    });

    html += '</div></div>' +
      // Mobile tab body wrapper
      '<div class="sd-cc-mobile-body sd-mobile-only">';

    // Mobile specific tab renders
    if (state.ccTab === 'info') {
      html += renderClientCardInfoTab(lead, prevStatus, nextStatus, statusText);
    } else if (state.ccTab === 'chat') {
      html += renderClientCardChatTab(lead);
    } else if (state.ccTab === 'notes') {
      html += renderClientCardNotesTab(lead);
    } else if (state.ccTab === 'tasks') {
      html += renderClientCardTasksTab(lead);
    } else if (state.ccTab === 'logs') {
      html += renderClientCardLogsTab(lead);
    }

    html += '</div>' +
      // Desktop two-column layout
      '<div class="sd-cc-left sd-desktop-only">' +
      '<button class="sd-panel-close" id="sd-cc-close-btn-desktop">' + icons.x + '</button>' +
      '<div class="sd-cc-header">' +
      renderAvatar(lead.name, lead.avatar, 64) +
      '<p class="sd-cc-name">' + lead.name + '</p>' +
      '<span class="sd-cc-status status-' + lead.status + '">' + statusText + '</span>' +
      '</div>' +
      '<div class="sd-cc-info">' +
      '<div class="sd-cc-info-item"><span class="sd-cc-label">' + dict.client_card.info.email + ':</span> <span class="sd-cc-value" style="word-break: break-all;">' + lead.email + '</span></div>' +
      '<div class="sd-cc-info-item"><span class="sd-cc-label">' + dict.client_card.info.phone + ':</span> <span class="sd-cc-value">' + lead.phone + '</span></div>' +
      '<div class="sd-cc-info-item"><span class="sd-cc-label">' + dict.client_card.info.telegram + ':</span> <span class="sd-cc-value text-green">' + (lead.telegram || '-') + '</span></div>' +
      '<div class="sd-cc-info-item"><span class="sd-cc-label">' + dict.client_card.info.rating + ':</span> <span class="sd-cc-value">' + lead.rating + '</span></div>' +
      '<div class="sd-cc-info-item"><span class="sd-cc-label">' + dict.client_card.info.language + ':</span> <span class="sd-cc-value">' + lead.language + '</span></div>' +
      '<div class="sd-cc-info-item"><span class="sd-cc-label">' + dict.client_card.info.country + ':</span> <span class="sd-cc-value">' + lead.country + '</span></div>' +
      '<div class="sd-cc-info-item"><span class="sd-cc-label">' + dict.client_card.info.manager + ':</span> ';

    if (lead.managerId) {
      var mgr = getLeadById(lead.managerId);
      html += '<span class="sd-cc-value text-green hover-underline clickable-manager" data-manager-id="' + lead.managerId + '" style="cursor: pointer;">' + (mgr ? mgr.name : 'Партнер') + '</span>';
    } else {
      html += '<span class="sd-cc-value">' + dict.client_card.info.manager_you + '</span>';
    }

    html += '</div>' +
      '</div>' +
      '<div class="sd-cc-status-actions">' +
      '<button class="sd-status-btn prev ' + (!prevStatus ? 'disabled' : '') + '" ' + (!prevStatus ? 'disabled' : '') + ' data-set-status="' + prevStatus + '" data-lead-id="' + lead.id + '">' +
      icons.chevronLeft + ' <span>' + (prevStatus ? (dict.statuses[prevStatus] || prevStatus) : '') + '</span>' +
      '</button>' +
      '<button class="sd-status-btn next ' + (!nextStatus ? 'disabled' : '') + '" ' + (!nextStatus ? 'disabled' : '') + ' data-set-status="' + nextStatus + '" data-lead-id="' + lead.id + '">' +
      '<span>' + (nextStatus ? (dict.statuses[nextStatus] || nextStatus) : '') + '</span> ' + icons.chevronRight +
      '</button>' +
      '</div>' +
      '</div>' +
      '<div class="sd-cc-right sd-desktop-only">' +
      '<div class="sd-cc-tabs">';

    Object.keys(dict.client_card.tabs).forEach(function(key) {
      if (key === 'info') return; // Desktop info is on the left
      var tabLabel = dict.client_card.tabs[key];
      var activeClass = state.ccTab === key || (state.ccTab === 'info' && key === 'chat') ? 'active' : ''; // Default desktop fallback to chat
      html += '<button class="sd-cc-tab ' + activeClass + '" data-cc-tab-key="' + key + '">' + tabLabel + '</button>';
    });

    html += '</div>' +
      '<div class="sd-cc-body flex-col">';

    var desktopActiveTab = state.ccTab === 'info' ? 'chat' : state.ccTab;
    if (desktopActiveTab === 'chat') {
      html += renderClientCardChatTab(lead);
    } else if (desktopActiveTab === 'notes') {
      html += renderClientCardNotesTab(lead);
    } else if (desktopActiveTab === 'tasks') {
      html += renderClientCardTasksTab(lead);
    } else if (desktopActiveTab === 'logs') {
      html += renderClientCardLogsTab(lead);
    }

    html += '</div></div></div></div>';
    return html;
  }

  function renderClientCardInfoTab(lead, prevStatus, nextStatus, statusText) {
    var html = '<div class="sd-cc-left" style="width: 100%; border: none; height: auto; padding: 16px;">' +
      '<div class="sd-cc-header" style="margin-top: 30px;">' +
      renderAvatar(lead.name, lead.avatar, 64) +
      '<p class="sd-cc-name">' + lead.name + '</p>' +
      '<span class="sd-cc-status status-' + lead.status + '">' + statusText + '</span>' +
      '</div>' +
      '<div class="sd-cc-info">' +
      '<div class="sd-cc-info-item"><span class="sd-cc-label">' + dict.client_card.info.email + ':</span> <span class="sd-cc-value">' + lead.email + '</span></div>' +
      '<div class="sd-cc-info-item"><span class="sd-cc-label">' + dict.client_card.info.phone + ':</span> <span class="sd-cc-value">' + lead.phone + '</span></div>' +
      '<div class="sd-cc-info-item"><span class="sd-cc-label">' + dict.client_card.info.telegram + ':</span> <span class="sd-cc-value text-green">' + (lead.telegram || '-') + '</span></div>' +
      '<div class="sd-cc-info-item"><span class="sd-cc-label">' + dict.client_card.info.rating + ':</span> <span class="sd-cc-value">' + lead.rating + '</span></div>' +
      '<div class="sd-cc-info-item"><span class="sd-cc-label">' + dict.client_card.info.language + ':</span> <span class="sd-cc-value">' + lead.language + '</span></div>' +
      '<div class="sd-cc-info-item"><span class="sd-cc-label">' + dict.client_card.info.country + ':</span> <span class="sd-cc-value">' + lead.country + '</span></div>' +
      '<div class="sd-cc-info-item"><span class="sd-cc-label">' + dict.client_card.info.manager + ':</span> ';

    if (lead.managerId) {
      var mgr = getLeadById(lead.managerId);
      html += '<span class="sd-cc-value text-green clickable-manager" data-manager-id="' + lead.managerId + '">' + (mgr ? mgr.name : 'Партнер') + '</span>';
    } else {
      html += '<span class="sd-cc-value">' + dict.client_card.info.manager_you + '</span>';
    }

    html += '</div>' +
      '</div>' +
      '<div class="sd-cc-status-actions">' +
      '<button class="sd-status-btn prev ' + (!prevStatus ? 'disabled' : '') + '" ' + (!prevStatus ? 'disabled' : '') + ' data-set-status="' + prevStatus + '" data-lead-id="' + lead.id + '">' +
      icons.chevronLeft + ' <span>' + (prevStatus ? (dict.statuses[prevStatus] || prevStatus) : '') + '</span>' +
      '</button>' +
      '<button class="sd-status-btn next ' + (!nextStatus ? 'disabled' : '') + '" ' + (!nextStatus ? 'disabled' : '') + ' data-set-status="' + nextStatus + '" data-lead-id="' + lead.id + '">' +
      '<span>' + (nextStatus ? (dict.statuses[nextStatus] || nextStatus) : '') + '</span> ' + icons.chevronRight +
      '</button>' +
      '</div>' +
      '</div>';
    return html;
  }

  function renderClientCardChatTab(lead) {
    var rawMsgs = dict.client_card.messages[lead.id] || [];
    
    var html = '<div class="sd-card-chat flex-col-100">' +
      '<div class="sd-chats-toolbar">' +
      '<div class="sd-toolbar-left">' +
      '<div class="sd-toolbar-item" id="sd-chat-toggle-ai">' +
      (state.aiMode ? icons.bot : icons.botOff) + ' <span>' + dict.chats.header_panel.ai_mode + '</span>' +
      '</div>' +
      '<div class="sd-toolbar-item" id="sd-chat-open-scripts">' +
      icons.zap + ' <span>' + dict.chats.header_panel.scripts + '</span>' +
      '</div>' +
      '<div class="sd-toolbar-item" id="sd-chat-open-lang">' +
      icons.globe + ' <span>' + (lead.language || 'ES').toUpperCase() + ' / RU</span>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="sd-chat-messages no-border">';

    rawMsgs.forEach(function(m, i) {
      var translatedKey = lead.id + '-' + i;
      var displayTranslate = state.chatTranslate[translatedKey];
      var textToShow = displayTranslate && m.translated ? m.translated : m.text;
      var senderClass = m.sender === 'user' ? 'user' : 'ai';

      html += '<div class="sd-msg sd-msg-' + senderClass + '">' +
        '<div class="sd-msg-text">' + formatMsgText(textToShow) + '</div>';

      if (m.translated) {
        var globeActiveClass = displayTranslate ? 'active' : '';
        html += '<button class="sd-msg-globe ' + globeActiveClass + '" data-msg-idx="' + i + '" data-chat-user-id="' + lead.id + '">' +
          icons.globe +
          '</button>';
      }

      html += '</div>';
    });

    html += '</div>' +
      '<div class="sd-chat-input-bar border-top">' +
      '<textarea placeholder="' + (state.aiMode ? dict.chats.lang_modal.ai_alert : dict.client_card.send_placeholder) + '" class="sd-chat-input ' + (state.aiMode ? 'ai-active' : '') + '" id="sd-chat-input-field" ' + (state.aiMode ? 'disabled' : '') + '>' + state.chatInput + '</textarea>' +
      '<button class="sd-send-btn ' + (state.aiMode ? 'disabled' : '') + '" id="sd-chat-send-btn" ' + (state.aiMode ? 'disabled' : '') + '>' + icons.send + '</button>' +
      '</div>' +
      '</div>';
    return html;
  }

  function renderClientCardNotesTab(lead) {
    var notes = dict.client_card.notes[lead.id] || [];
    var html = '<div class="sd-card-notes p-16">';
    notes.forEach(function(n) {
      html += '<div class="sd-note-item mb-12">' +
        '<span class="sd-note-date text-gray-sm">' + n.date + '</span>' +
        '<p class="note-text">' + n.text + '</p>' +
        '</div>';
    });
    html += '</div>' +
      '<div class="sd-note-input-row">' +
      '<input type="text" class="sd-note-input" placeholder="Новая заметка..." id="sd-note-input-field" />' +
      '<button class="sd-send-btn btn-30" id="sd-note-send-btn">' + icons.plus + '</button>' +
      '</div>';
    return html;
  }

  function renderClientCardTasksTab(lead) {
    var tasks = dict.client_card.tasks_data[lead.id] || [];
    var html = '<div class="sd-card-tasks p-16">' +
      '<button class="sd-btn-new-task w-100 mb-16">' +
      icons.plus + ' <span class="mr-4">' + dict.chats.client_info.add_task + '</span>' +
      '</button>';

    tasks.forEach(function(t) {
      html += '<div class="sd-task-mini sd-task-mini-box">' +
        '<div class="sd-task-mini-dot priority-' + t.priority + '"></div>' +
        '<div class="task-mini-text">' +
        '<span class="flex-1 text-sm">' + t.title + '</span>' +
        '<span class="text-gray-sm">' + t.due + '</span>' +
        '</div>' +
        '</div>';
    });

    html += '</div>';
    return html;
  }

  function renderClientCardLogsTab(lead) {
    var logs = dict.client_card.logs_data[lead.id] || [];
    var html = '<div class="sd-card-logs p-16">';
    logs.forEach(function(l) {
      html += '<div class="sd-log-item">' +
        '<div class="sd-log-dot"></div>' +
        '<div class="sd-log-text">' +
        '<span class="sd-log-date text-gray-sm">' + l.date + '</span>' +
        '<span class="text-sm">' + l.action + '</span>' +
        '</div>' +
        '</div>';
    });
    html += '</div>';
    return html;
  }

  // 10. Mia Assistant Chat Panel Overlay
  function renderAssistantPanel() {
    if (!state.assistantOpen) return '';

    var html = '<div class="sd-panel-overlay assistant-mia open">' +
      '<header class="sd-panel-header assistant-mia">' +
      '<div class="sd-mia-avatar"></div>' +
      '<div class="sd-panel-header-info">' +
      '<h3>' + dict.assistant_panel.title + '</h3>' +
      '</div>' +
      '<button class="sd-panel-close" id="sd-assistant-close-btn">' + icons.x + '</button>' +
      '</header>' +
      '<div class="sd-panel-content flex-col">' +
      '<div class="sd-chat-messages bg-white no-border-right" id="sd-mia-messages-container">';

    dict.assistant_panel.messages.forEach(function(m) {
      html += '<div class="sd-msg sd-msg-' + m.sender + '">' +
        '<div class="sd-msg-text">' + formatMsgText(m.text) + '</div>' +
        '</div>';
    });

    html += '</div>' +
      '<div class="sd-chat-input-bar bg-white">' +
      '<textarea placeholder="' + dict.assistant_panel.placeholder + '" class="sd-chat-input" id="sd-mia-input-field"></textarea>' +
      '<button class="sd-send-btn" id="sd-mia-send-btn">' + icons.send + '</button>' +
      '</div>' +
      '</div>' +
      '</div>';
    return html;
  }

  // 11. Language Configuration Modal Overlay
  function renderLangModal() {
    if (!state.langModalOpen) return '';

    var html = '<div class="sd-modal-backdrop" id="sd-lang-backdrop">' +
      '<div class="sd-modal">' +
      '<h3 class="sd-modal-h">' + dict.chats.lang_modal.title + '</h3>' +
      '<div class="sd-form-g">' +
      '<label>' + dict.chats.lang_modal.client_lang + '</label>' +
      renderLangDropdown('client', state.clientLang) +
      '</div>' +
      '<div class="sd-form-g">' +
      '<label>' + dict.chats.lang_modal.manager_lang + '</label>' +
      renderLangDropdown('manager', state.managerLang) +
      '</div>' +
      '<button class="sd-btn-save" id="sd-lang-save-btn">' + dict.chats.lang_modal.save + '</button>' +
      '</div>' +
      '</div>';
    return html;
  }

  function renderLangDropdown(dropdownType, currentCode) {
    var isDropdownOpen = state.openDropdown === dropdownType;
    var name = dict.chats.lang_modal.languages[currentCode] || currentCode;

    var html = '<div class="sd-custom-select-wrapper">' +
      '<button class="sd-custom-select-btn" data-lang-dropdown-toggle="' + dropdownType + '">' +
      '<div class="sd-lang-flag-sm">' +
      '<img src="../assets/images/flags/' + (currentCode === 'en' ? 'gb' : currentCode) + '.svg" alt="Flag" style="width:100%; height:100%; object-fit:cover;" />' +
      '</div>' +
      '<span>' + name + '</span>' +
      icons.chevronDown +
      '</button>';

    if (isDropdownOpen) {
      html += '<ul class="sd-custom-select-dropdown">';
      Object.keys(dict.chats.lang_modal.languages).forEach(function(code) {
        var langName = dict.chats.lang_modal.languages[code];
        html += '<li data-lang-select-code="' + code + '" data-lang-select-type="' + dropdownType + '">' +
          '<div class="sd-custom-select-item">' +
          '<div class="sd-lang-flag-sm">' +
          '<img src="../assets/images/flags/' + (code === 'en' ? 'gb' : code) + '.svg" alt="Flag" style="width:100%; height:100%; object-fit:cover;" />' +
          '</div>' +
          '<span>' + langName + '</span>' +
          '</div>' +
          '</li>';
      });
      html += '</ul>';
    }

    html += '</div>';
    return html;
  }

  // 12. Scripts Sales Panel Overlay
  function renderScriptPanel() {
    if (!state.scriptsOpen) return '';

    var html = '<div class="sd-panel-overlay sd-panel-left open">' +
      '<div class="sd-panel-header">' +
      '<h3>' + dict.chats.scripts_panel.title + '</h3>' +
      '<button class="sd-panel-close" id="sd-scripts-close-btn">' + icons.x + '</button>' +
      '</div>' +
      '<div class="sd-script-list">';

    dict.chats.scripts_panel.items.forEach(function(item, idx) {
      html += '<div class="sd-script-item" data-script-idx="' + idx + '">' +
        '<span class="sd-script-title">' + item.name + '</span>' +
        '<span class="sd-script-preview">' + item.text.slice(0, 50) + '...</span>' +
        '</div>';
    });

    html += '</div></div>';
    return html;
  }

  // --- Main Render Orchestration ---
  function render() {
    var dashboardHtml = '<div class="sd-dashboard">' +
      renderSidebar() +
      '<div class="sd-main">' +
      renderHeader() +
      '<div class="sd-content">';

    if (state.page === 'team') {
      dashboardHtml += renderTeamPage();
    } else if (state.page === 'chats') {
      dashboardHtml += renderChatsPage();
    } else if (state.page === 'tasks') {
      dashboardHtml += renderTasksPage();
    } else if (state.page === 'guides') {
      dashboardHtml += renderGuidesPage();
    } else if (state.page === 'landings') {
      dashboardHtml += renderLandings();
    }

    dashboardHtml += '</div></div>' +
      renderMobileNav() +
      renderClientCardModal() +
      renderAssistantPanel() +
      renderLangModal() +
      renderScriptPanel() +
      '</div>';

    container.innerHTML = dashboardHtml;
    
    // Auto-scroll chat boxes to the bottom
    var chatBox = document.getElementById('sd-chat-messages-container');
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;

    var miaBox = document.getElementById('sd-mia-messages-container');
    if (miaBox) miaBox.scrollTop = miaBox.scrollHeight;
  }

  // --- Event Handling (Delegated for performance & simple bindings) ---
  container.addEventListener('click', function(e) {
    // 1. Sidebar Page Navigation
    var sidebarBtn = e.target.closest('[data-sidebar-key]');
    if (sidebarBtn) {
      var targetPage = sidebarBtn.getAttribute('data-sidebar-key');
      state.page = targetPage;
      state.selectedLeadId = null;
      state.selectedArticleId = null;
      state.ccTab = targetPage === 'tasks' ? 'current' : 'chat'; // Reset card tabs appropriately
      render();
      return;
    }

    // 2. Team Tab funnels
    var teamTabBtn = e.target.closest('[data-team-tab-id]');
    if (teamTabBtn) {
      state.activeTeamTab = teamTabBtn.getAttribute('data-team-tab-id');
      render();
      return;
    }

    // 3. Generation collapse accordion
    var genHeader = e.target.closest('[data-gen-level]');
    if (genHeader) {
      var level = parseInt(genHeader.getAttribute('data-gen-level'), 10);
      var idx = state.openGenerations.indexOf(level);
      if (idx === -1) {
        state.openGenerations.push(level);
      } else {
        state.openGenerations.splice(idx, 1);
      }
      render();
      return;
    }

    // 4. Lead click opens Client Card
    var leadRow = e.target.closest('[data-lead-id]');
    if (leadRow) {
      var leadId = leadRow.getAttribute('data-lead-id');
      state.selectedLeadId = leadId;
      state.ccTab = window.innerWidth > 768 ? 'chat' : 'info'; // Desktop default to chat, mobile default to info
      render();
      return;
    }

    // 5. Manager click jumps to manager lead
    var managerLink = e.target.closest('[data-manager-id]');
    if (managerLink) {
      var managerId = managerLink.getAttribute('data-manager-id');
      state.selectedLeadId = managerId;
      state.ccTab = window.innerWidth > 768 ? 'chat' : 'info';
      render();
      return;
    }

    // 6. Close Client Card
    var ccClose = e.target.closest('#sd-cc-close-btn, #sd-cc-close-btn-desktop');
    if (ccClose) {
      state.selectedLeadId = null;
      render();
      return;
    }

    // 7. Client Card inner tabs
    var ccTabBtn = e.target.closest('[data-cc-tab-key]');
    if (ccTabBtn) {
      state.ccTab = ccTabBtn.getAttribute('data-cc-tab-key');
      render();
      return;
    }

    // 8. Lead status toggle prev/next
    var statusBtn = e.target.closest('[data-set-status]');
    if (statusBtn) {
      var targetStatus = statusBtn.getAttribute('data-set-status');
      var leadIdForStatus = statusBtn.getAttribute('data-lead-id');
      if (targetStatus && targetStatus !== 'null' && leadIdForStatus) {
        state.leadsData[leadIdForStatus].status = targetStatus;
      }
      render();
      return;
    }

    // 9. Chats tab switching (My Referrals / Full Structure)
    var chatTabBtn = e.target.closest('[data-chat-list-tab]');
    if (chatTabBtn) {
      state.chatListTab = chatTabBtn.getAttribute('data-chat-list-tab');
      render();
      return;
    }

    // 10. Chat list selection
    var chatItem = e.target.closest('[data-chat-id]');
    if (chatItem) {
      state.selectedChatId = chatItem.getAttribute('data-chat-id');
      render();
      return;
    }

    // 11. Toggle AI mode
    var aiToggleBtn = e.target.closest('#sd-chat-toggle-ai');
    if (aiToggleBtn) {
      state.aiMode = !state.aiMode;
      render();
      return;
    }

    // 12. Show scripts panel
    var scriptsOpenBtn = e.target.closest('#sd-chat-open-scripts');
    if (scriptsOpenBtn) {
      state.scriptsOpen = true;
      render();
      return;
    }

    // 13. Close scripts panel
    var scriptsCloseBtn = e.target.closest('#sd-scripts-close-btn');
    if (scriptsCloseBtn) {
      state.scriptsOpen = false;
      render();
      return;
    }

    // 14. Insert script in input field
    var scriptItem = e.target.closest('[data-script-idx]');
    if (scriptItem) {
      var scriptIdx = parseInt(scriptItem.getAttribute('data-script-idx'), 10);
      var scriptText = dict.chats.scripts_panel.items[scriptIdx].text;
      state.chatInput = scriptText;
      state.scriptsOpen = false;
      render();
      return;
    }

    // 15. Show language selector modal
    var langOpenBtn = e.target.closest('#sd-chat-open-lang');
    if (langOpenBtn) {
      state.langModalOpen = true;
      render();
      return;
    }

    // 16. Close language modal backdrop click
    var langBackdrop = e.target;
    if (langBackdrop.id === 'sd-lang-backdrop') {
      state.langModalOpen = false;
      state.openDropdown = null;
      render();
      return;
    }

    // 17. Close language modal save button
    var langSaveBtn = e.target.closest('#sd-lang-save-btn');
    if (langSaveBtn) {
      state.langModalOpen = false;
      state.openDropdown = null;
      render();
      return;
    }

    // 18. Toggle client/manager dropdown in language modal
    var dropToggle = e.target.closest('[data-lang-dropdown-toggle]');
    if (dropToggle) {
      var selectType = dropToggle.getAttribute('data-lang-dropdown-toggle');
      state.openDropdown = state.openDropdown === selectType ? null : selectType;
      render();
      return;
    }

    // 19. Language selection inside custom dropdowns
    var langSelect = e.target.closest('[data-lang-select-code]');
    if (langSelect) {
      var code = langSelect.getAttribute('data-lang-select-code');
      var type = langSelect.getAttribute('data-lang-select-type');
      if (type === 'client') state.clientLang = code;
      if (type === 'manager') state.managerLang = code;
      state.openDropdown = null;
      render();
      return;
    }

    // 20. Message translation globe click
    var globeBtn = e.target.closest('[data-msg-idx]');
    if (globeBtn) {
      var msgIdx = globeBtn.getAttribute('data-msg-idx');
      var chatUserId = globeBtn.getAttribute('data-chat-user-id');
      var translateKey = chatUserId + '-' + msgIdx;
      state.chatTranslate[translateKey] = !state.chatTranslate[translateKey];
      render();
      return;
    }

    // 21. Tasks tab switcher
    var taskTabBtn = e.target.closest('[data-task-tab-key]');
    if (taskTabBtn) {
      state.ccTab = taskTabBtn.getAttribute('data-task-tab-key');
      render();
      return;
    }

    // 22. Client name link in Tasks table redirects to client card
    var taskClientLink = e.target.closest('[data-client-lead-id]');
    if (taskClientLink) {
      var taskLeadId = taskClientLink.getAttribute('data-client-lead-id');
      state.page = 'team';
      state.selectedLeadId = taskLeadId;
      state.ccTab = window.innerWidth > 768 ? 'chat' : 'info';
      render();
      return;
    }

    // 23. Guides search field change handler is bound to 'input' event, not click.

    // 24. Guide article card click
    var articleCard = e.target.closest('[data-article-id]');
    if (articleCard && !articleCard.classList.contains('sd-guide-nav-item')) {
      state.selectedArticleId = articleCard.getAttribute('data-article-id');
      render();
      return;
    }

    // 25. Guide article navigation left side item click
    var articleNavItem = e.target.closest('.sd-guide-nav-item[data-article-id]');
    if (articleNavItem) {
      state.selectedArticleId = articleNavItem.getAttribute('data-article-id');
      render();
      return;
    }

    // 26. Guide article navigation footer next/prev button
    var articleFooterBtn = e.target.closest('.sd-nav-footer-btn[data-article-id]');
    if (articleFooterBtn) {
      state.selectedArticleId = articleFooterBtn.getAttribute('data-article-id');
      render();
      return;
    }

    // 27. Guide back button
    var articleBackBtn = e.target.closest('#sd-guide-back-to-list');
    if (articleBackBtn) {
      state.selectedArticleId = null;
      render();
      return;
    }

    // 28. FAQ accordion question click
    var faqHeader = e.target.closest('[data-faq-idx]');
    if (faqHeader) {
      var faqIdx = parseInt(faqHeader.getAttribute('data-faq-idx'), 10);
      state.faqOpenIndex = state.faqOpenIndex === faqIdx ? null : faqIdx;
      render();
      return;
    }

    // 29. Copy action in Landings (referral links)
    var landCopyBtn = e.target.closest('[data-copy-url]');
    if (landCopyBtn) {
      var copyUrl = landCopyBtn.getAttribute('data-copy-url');
      navigator.clipboard.writeText(copyUrl).then(function() {
        state.refCopied = true;
        render();
        setTimeout(function() {
          state.refCopied = false;
          render();
        }, 1500);
      });
      return;
    }

    // 30. View action in Landings
    var landViewBtn = e.target.closest('[data-view-url]');
    if (landViewBtn) {
      var viewUrl = landViewBtn.getAttribute('data-view-url');
      window.open('https://' + viewUrl, '_blank');
      return;
    }

    // 31. Open Mia Assistant chat
    var assistOpenBtn = e.target.closest('#sd-trigger-assistant-btn, #sd-guides-open-assistant-btn');
    if (assistOpenBtn) {
      state.assistantOpen = true;
      render();
      return;
    }

    // 32. Close Mia Assistant chat
    var assistCloseBtn = e.target.closest('#sd-assistant-close-btn');
    if (assistCloseBtn) {
      state.assistantOpen = false;
      render();
      return;
    }

    // 33. Send button in chat and client card chats
    var chatSendBtn = e.target.closest('#sd-chat-send-btn');
    if (chatSendBtn) {
      handleChatSend();
      return;
    }

    // 34. Send button in Mia Assistant panel
    var miaSendBtn = e.target.closest('#sd-mia-send-btn');
    if (miaSendBtn) {
      handleMiaSend();
      return;
    }

    // 35. Add new note click
    var noteSendBtn = e.target.closest('#sd-note-send-btn');
    if (noteSendBtn) {
      handleNoteAdd();
      return;
    }
  });

  // Handle inputs and keys
  container.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      if (e.target.id === 'sd-chat-input-field' && !e.shiftKey) {
        e.preventDefault();
        handleChatSend();
      }
      if (e.target.id === 'sd-mia-input-field' && !e.shiftKey) {
        e.preventDefault();
        handleMiaSend();
      }
      if (e.target.id === 'sd-note-input-field') {
        e.preventDefault();
        handleNoteAdd();
      }
    }
  });

  container.addEventListener('input', function(e) {
    if (e.target.id === 'sd-chat-input-field') {
      state.chatInput = e.target.value;
    }
    if (e.target.id === 'sd-guides-search-input') {
      var query = e.target.value.toLowerCase();
      // Simple filter guide articles in display lists
      var filtered = dict.guides_page.articles.filter(function(a) {
        return a.title.toLowerCase().indexOf(query) !== -1 || a.description.toLowerCase().indexOf(query) !== -1;
      });
      // We can update the guides list DOM elements inline instead of full re-render
      var grid = container.querySelector('.sd-guides-grid');
      if (grid) {
        var gridHtml = '';
        filtered.forEach(function(article) {
          gridHtml += '<div class="sd-guide-card" data-article-id="' + article.id + '">' +
            '<div class="sd-guide-icon-box">' + icons.guides + '</div>' +
            '<div class="sd-guide-card-content">' +
            '<h3 class="sd-guide-card-title">' + article.title + '</h3>' +
            '<p class="sd-guide-card-desc">' + article.description + '</p>' +
            '</div>' +
            '</div>';
        });
        grid.innerHTML = gridHtml;
      }
    }
  });

  // --- Input Submissions ---
  function handleChatSend() {
    if (state.aiMode) return;
    var inputField = document.getElementById('sd-chat-input-field');
    var val = inputField ? inputField.value.trim() : '';
    if (!val) return;

    // Get active user ID
    var activeUserId = null;
    if (state.page === 'chats') {
      var activeChat = null;
      var allChats = state.chatListTab === 'structure' 
        ? dict.chats.structure_generations.flatMap(function(g) { return g.chats; }) 
        : dict.chats.my_referrals_chats;
      
      allChats.forEach(function(c) {
        if (c.id === state.selectedChatId) activeChat = c;
      });
      if (activeChat) activeUserId = activeChat.userId;
    } else if (state.page === 'team') {
      activeUserId = state.selectedLeadId;
    }

    if (!activeUserId) return;

    // Push new message
    if (!dict.client_card.messages[activeUserId]) {
      dict.client_card.messages[activeUserId] = [];
    }
    dict.client_card.messages[activeUserId].push({
      sender: "ai",
      text: val
    });

    state.chatInput = "";
    
    // Auto simulated response after 1.5 seconds
    setTimeout(function() {
      if (dict.client_card.messages[activeUserId]) {
        dict.client_card.messages[activeUserId].push({
          sender: "user",
          text: "Спасибо за информацию! Изучу детальнее."
        });
        render();
      }
    }, 1500);

    render();
  }

  function handleMiaSend() {
    var inputField = document.getElementById('sd-mia-input-field');
    var val = inputField ? inputField.value.trim() : '';
    if (!val) return;

    dict.assistant_panel.messages.push({
      sender: "user",
      text: val
    });

    // Auto simulated response from Mia
    setTimeout(function() {
      dict.assistant_panel.messages.push({
        sender: "ai",
        text: "Я проанализировала твой вопрос. Чтобы увеличить доходность структуры, рекомендую сконцентрироваться на привлечении лидов в первую линию (Firstline Bonus даёт до 0.20% в день от их оборота). Вы можете использовать маркетинговые материалы в разделе Ссылки."
      });
      render();
    }, 1000);

    render();
  }

  function handleNoteAdd() {
    var inputField = document.getElementById('sd-note-input-field');
    var val = inputField ? inputField.value.trim() : '';
    if (!val || !state.selectedLeadId) return;

    if (!dict.client_card.notes[state.selectedLeadId]) {
      dict.client_card.notes[state.selectedLeadId] = [];
    }

    dict.client_card.notes[state.selectedLeadId].push({
      date: "14 июл, 19:00",
      text: val
    });

    render();
  }

  // --- Initial Render ---
  render();
}
