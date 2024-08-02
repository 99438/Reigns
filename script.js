const cardsContainer = document.getElementById('cards-container');
let currentCard = null;
let startX = 0;
let showingResult = false;

// 定义初始属性值
const stats = {
    favor: 50,
    love: 50,
    trust: 50,
    desire: 50,
    dominance: 50,
    rebirthCount: 0 // 添加转世次数
};

// 结局描述
const endings = {
    favorZero: "范闲开始厌恶你，让他每一次想起你都在胃里一阵翻江倒海。你要是不会说那些讨人厌的话就好了，他是这么想的，也是这么做的。",
    favorHundred: "范闲很喜欢你，他欣赏你，甚至尊重你，你们看上去是非常要好的朋友，外界皆传你们私交甚笃，可那只自以为操纵着天下的手似乎不愿意见到事情这样发展，很快你就折损在那只大手之下。",
    loveZero: "范闲的爱意消失殆尽，爱的反义词是什么呢？直到被长剑贯穿的那一刻你也没有想明白。",
    loveHundred: "他爱你，范闲爱你。你好像知道这件事，但你不知道的是有时极端的爱会变成毒药。",
    trustZero: "信任是人与人之间交往的基石吗？可大家不都这般虚情假意，为何偏要纠缠你一人？你尝到口里的腥甜，却忍不住想车出一抹笑：范闲这辈子又得到过什么真心的东西呢？",
    trustHundred: "范闲不在去费心思考你的每一句话是真是假，而这信任却成了你们走向毁灭的推手。",
    desireZero: "你对生活失去了所有的激情，陷入了深深的无趣。",
    desireHundred: "你充满了无限的激情，迎接每一个新的挑战。",
    dominanceZero: "你失去了对生活的掌控，成为命运的傀儡。",
    dominanceHundred: "比起真正的爱人，或许范闲更需要一只漂亮的娃娃，这是你最后的想法，很快你的自我意识就随着那一杯毒酒下毒消逝了，从此脑海中好像蒙了一层雾气，再无清明之日。"
};

// 状态条元素
const statsBars = {
    favor: document.getElementById('favor-bar'),
    love: document.getElementById('love-bar'),
    trust: document.getElementById('trust-bar'),
    desire: document.getElementById('desire-bar'),
    dominance: document.getElementById('dominance-bar')
};

// 主线剧情
const mainEvents = [
    {question: '你是南庆二皇子李承泽。',
        leftChoice: '我已知晓',
        rightChoice: '我已知晓',
        leftResult: '请努力在风云诡谲的京都活下来。',
        rightResult: '请努力在风云诡谲的京都活下来。',
        leftChanges: { favor: 0, love: 0, trust: 0, desire: 0, dominance: 0 },
        rightChanges: { favor: 0, love: 0, trust: 0, desire: 0, dominance: 0 },
        insertRandomEventsAfter: 0 // 插入随机事件数目
    },
    {
        question: '听闻近日京都的书局里进了不少新书，要去看吗？',
        leftChoice: '去',
        rightChoice: '不去',
        leftResult: '你前脚踏进书局，后脚就看见铺天盖地的关于《红楼》的宣传，掌柜的不遗余力地大肆介绍了一番其作者范闲的名头。你花了点时间翻了翻书，确实写得颇有意趣，默默将范闲这个名字记在了心里。',
        rightResult: '日头正热，你便只吩咐了范无救去书局看看，回来时见这人扛了整整一大箱。你好气又好笑地问这都买了什么，范无救却只从这箱书的上头翻出两三本来递给你，恭敬答道这两本是殿下吩咐的，其余不过是历年春闱的旧题罢了。你忍无可忍地拍了下这人背后背着的阔刀，还好差事办的还不算太差，这本名为《红楼》的书倒是写的极好，只不过故事未完，此后你经常拿出来反复品味，手不释卷。',
        leftChanges: { favor: 5, love: 0, trust: 0, desire: 0, dominance: 0 },
        rightChanges: { favor: 0, love: 0, trust: 0, desire: 0, dominance: 0 },
        insertRandomEventsAfter: 0 // 插入随机事件数目
    },
    {
        question: '这日梦中，你在白茫茫的天地间见一老道，老道扶着长须，在云海的另一端慈祥的看着你。',
        leftChoice: '走过去',
        rightChoice: '问他是谁，这是何地',
        leftResult: '奇怪的是，无论怎么靠近，好像都隔着厚厚的一层云雾，而那老道却自顾自说道：喜怒哀乐之未发谓之中，发而皆中节谓之和。中也者，天下之大本也；和也者，天下之达道也。致中和，天地位焉，万物育焉。你沉默听着，似有所悟，不知何时老道已走至至你身前，抚了抚你的头，叹道“此亦静极思动，无中生有之数也”，回过神时天已蒙蒙亮，谢必安的声音从帘外传来，该是朝会的时间了。',
        rightResult: '老道不答，只自顾自说道：喜怒哀乐之未发谓之中，发而皆中节谓之和。中也者，天下之大本也；和也者，天下之达道也。致中和，天地位焉，万物育焉。你沉默听着，似有所悟，不知何时老道已走至至你身前，抚了抚你的头，叹道“此亦静极思动，无中生有之数也”，回过神时天已蒙蒙亮，谢必安的声音从帘外传来，该是朝会的时间了。',
        leftChanges: { favor: 0, love: 0, trust: 0, desire: 0, dominance: 0 },
        rightChanges: { favor: 0, love: 0, trust: 0, desire: 0, dominance: 0 },
        insertRandomEventsAfter: 0 // 插入随机事件数目
    },
    {question: '朝会上你照例与太子拌了几句嘴，那坐在殿前的九五之尊却只是带笑看着。散朝后，李弘成递来一封诗会请帖，说是范闲也会到场。你本着凑热闹的心情落座，一串葡萄下肚，侍从一个接一个将前殿作完的诗句传到你跟前：“艰难苦恨繁霜鬓，潦倒新停浊酒杯”，今日诗会有此一首留史册，你叹道。范闲，这个人有意思，不一般。要现在请来一见吗？',
        leftChoice: '请',
        rightChoice: '不请',
        leftResult: '很快侍者就领着范闲到了，“参见二殿下”他在亭前扬声一喊，略拱了拱手算作行礼，你也不恼，只笑道“小范大人好诗才，今日一见果然不同凡响”，他倒不见外，几步就跨进来，堪堪在案桌几步前停下，眼睛直勾勾地望过来。你也不隐藏杀意——“杀你”，当然要杀，你不喜欢这样的变数，但是此时此刻，谁会当真呢？',
        rightResult: '不急，再等等，再看看。你又在亭间多坐了会，却被一抹靛蓝打搅了清净。谢必安眼看就要拔刀，“让他进来”，你吩咐谢必安，却没成想来人立刻顶了回来，“我为什么要进来？”，“那你就回去”。你的身份也不难猜，几个来回间他就坦然的走到了你的案前，你觉得好笑，儋州来的土小子，凭什么手无寸铁还一幅天不怕地不怕的刺头模样？你也不隐藏杀意——“杀你”，当然要杀，你不喜欢这样的变数，但是此时此刻，谁会当真呢？',
        leftChanges: { favor:0 , love: 0, trust: -10, desire: 0, dominance: 0 },
        rightChanges: { favor: 5, love: 0, trust: 0, desire: 0, dominance: 0 },
        insertRandomEventsAfter: 0 // 插入随机事件数目
    },
    {
        question: '范闲倒是颇为临危不惧，谢必安的刀稳稳停在他喉前的方寸间，他还不紧不慢的摘了你面前的葡萄送入口中。这下京都要热闹了。这是好事还是坏事呢？范闲会给这潭死水掀起怎样的波澜？你不得不承认心里已经悄然翻涌起期待与兴奋，这又是好事还是坏事呢？几个回合过去你想你们算是把彼此脾性摸了个大概，眼见着范闲背对着你坐下，你才第一次注意到他不同于常人的卷发，和本人一样张扬。嗯，是时候缓和剑拔弩张的氛围了吧？',
        leftChoice: '端着葡萄靠近',
        rightChoice: '喊他',
        leftResult: '眼见范闲吃完手里的那串，你便又捧起一盏葡萄，也顾不上穿鞋了，几步就跨过眼前的案台，在他身旁稳稳蹲下，又把葡萄往前递了递。他低头瞥了一眼什么，又抬头扫了眼你的脸，才伸手去接新的一串葡萄，而后便转过头去一幅若有所思的模样。',
        rightResult: '“殿下有何吩咐”，他头也不回地答道，你拾起一直放在手边的书册，继续同他搭话，“这《红楼》读了数遍依然手不释卷，是小范公子写的？奇书，天下无双。”，“不是我写的，是一位曹先生所写，我不过是誊抄而已。”，你好奇的顺着他的话追问下去，渴望了解更多一点，他却好似感到新奇一般终于转过头来看你，“殿下相信我说的？”，你眨了眨眼，一时间不明白他这么说的原因。“我说与旁人时，倒少有人相信诸如“仙境”这般字眼，殿下算是开天辟地第一位”，“就当你是在夸我了”你笑答道，却见范闲直直的盯着你，不知道在想些什么。',
        leftChanges: { favor:0 , love: 5, trust: 0, desire: 10, dominance: 0 },
        rightChanges: { favor: 5, love: 5, trust: 0, desire: 0, dominance: 0 },
        insertRandomEventsAfter: 0 // 插入随机事件数目
    },
    {
        question: '“殿下相信一见钟情吗？”他冷不丁地开口又打了你一个猝不及防，“我原来也不信，现在信了。”刚送到嘴边的葡萄尴尬的抵在唇角，让你张口也不是，闭口也不好。',
        leftChoice: '……',
        rightChoice: '“调笑他”',
        leftResult: '你不知该作何反应，若不知他所指何人，贸然回答不好。于是你选择了以不变应万变，幸好他似乎不是很在意你的答案，又自顾自的接下去，“我给殿下讲个故事可好？”',
        rightResult: '“小范公子这是上我这搭戏台唱戏来了？”，这人似乎不知道尴尬怎么写，于是你也不甘落后地迎上他直视着你的眼睛，几乎要在他的瞳孔中看到自己的倒影，当你不知不觉想再靠近一点看清的时候，他又忽地避开了眼神，把玩了一下手里的葡萄梗，说道“我给殿下讲个故事可好？”',
        leftChanges: { favor:0 , love: 5, trust: 0, desire: 5, dominance: 0 },
        rightChanges: { favor:-5, love: 0, trust: 0, desire: 5, dominance: 10 },
        insertRandomEventsAfter: 0 // 插入随机事件数目
    },
    {
        question: '“你说，我听。”，有故事为什么不听？听才子小范公子讲故事倒不失为是一种享受，可你越听越熟悉，这分明是宝黛二人初遇时的情节吧？',
        leftChoice: '揭穿他',
        rightChoice: '继续听',
        leftResult: '“小范公子这是拿《红楼》里的剧情哄我呢？”你也不惯着他，直接就戳破了，范闲坦然的点了点头，伸出一根食指指了指天，又指了指地，最后看向你，“只是觉得这个故事很合此时此景罢了，这不我和殿下也是初遇吗？”',
        rightResult: '你好好蹲着听他说完了故事，说实话，这《红楼》的故事就算读了数遍，从这位小范公子口里说出来却另有风味，让你不自觉沉溺其中，仿佛已身处大观园，贾宝玉就在你眼前这般一拜，好像下一秒就会抬头和你说“这位妹妹我曾见过的”似得。“殿下可听明白了？”你恍然惊醒，颇有几分自嘲意味地摇了摇头，这是把自己当林妹妹了不成？想起范闲的问话，又赶紧点了点头。“你没明白。”范闲自顾自给你下了判词，你数不清这是今日你们第几次对视了，其实很少有人会这般直白地望过来，再长久地盯着看，就好像…就好像在凝望描摹一位故人似得。',
        leftChanges: { favor:0 , love: 5, trust: 0, desire: 0, dominance: 5 },
        rightChanges: { favor:5, love: 10, trust: 0, desire:- 5, dominance: 0 },
        insertRandomEventsAfter: 0 // 插入随机事件数目
    },
    {
        question: '“你说，我听。”，有故事为什么不听？听才子小范公子讲故事倒不失为是一种享受，可你越听越熟悉，这分明是宝黛二人初遇时的情节吧？',
        leftChoice: '揭穿他',
        rightChoice: '继续听',
        leftResult: '“小范公子这是拿《红楼》里的剧情哄我呢？”你也不惯着他，直接就戳破了，范闲坦然的点了点头，伸出一根食指指了指天，又指了指地，最后看向你，“只是觉得这个故事很合此时此景罢了，这不我和殿下也是初遇吗？”',
        rightResult: '你好好坐着听他说完了故事，说实话，这《红楼》的故事就算读了数遍，从这位小范公子口里说出来却另有风味，让你不自觉沉溺其中，仿佛已身处大观园，贾宝玉就在你眼前这般一拜，好像下一秒就会抬头和你说“这位妹妹我曾见过的”似得。“殿下可听明白了？”你恍然惊醒，颇有几分自嘲意味地摇了摇头，这是把自己当林妹妹了不成？想起范闲的问话，又赶紧点了点头。“你没明白。”范闲自顾自给你下了判词，你数不清这是今日你们第几次对视了，其实很少有人会这般直白地望过来，再长久地盯着看，就好像…就好像在凝望描摹一位故人似得。',
        leftChanges: { favor:0 , love: 5, trust: 0, desire: 0, dominance: 5 },
        rightChanges: { favor:5, love: 10, trust: 0, desire:- 5, dominance: 0 },
        insertRandomEventsAfter: 0 // 插入随机事件数目
    },
    {   question: '你想你大概是不喜欢范闲无论是口中还是行动里那种若有似无藐视规则的勇气和锐气，又或者是羡慕？你说不清，也想不明白。有的时候，聪明人之间不太好把话说得太明白，你们都再清楚不过，话头递到这里，算是没了意趣，今日便可点到为止了。',
        leftChoice: '离开',
        rightChoice: '送客',
        leftResult: '你笑着拍了拍范闲的肩膀，又略借了些力站起来，拾起那本《红楼》趿上鞋子就要往外走，还不忘丢给身后的人一句——“范闲，我等着，看你闹京都。”',
        rightResult: '“今日本王叨扰小范公子够久了，想必你也累了。”你垂下眼睛，手指飞快翻过《红楼》的书页“必安，送客。”，话音刚落这称职的剑客便出现在了范闲身侧。余光里的范闲在原地站了数秒，而你此刻却不想去看这人究竟是何种神态，幸好很快他便转身离开，消失在蜿蜒的桥廊间',
        leftChanges: { favor:5 , love: 0, trust: 0, desire: 0, dominance: 0 },
        rightChanges: { favor:0, love: 0, trust: 0, desire:0, dominance: 5 },
        insertRandomEventsAfter: 20 // 插入随机事件数目
    },
];

// 随机剧情池
const randomEvents = [
    {
        question: '深夜，范闲翻墙闯进了你的寝殿，要塞给你一颗褐色的药丸。',
        leftChoice: '吃',
        rightChoice: '拒绝',
        leftResult: '范闲满意地看着你吃下了那颗药丸。',
        rightResult: '你打翻了他手中的瓷瓶，你们就这样僵持了一会，他帮你捡起因为大幅度动作而掉落的一角被褥，后转身融于夜色之中。',
        leftChanges: { favor: 0, love: 3, trust: 0, desire: 0, dominance: 10 },
        rightChanges: { favor: -1, love: 0, trust: 0, desire: 0, dominance: 1 }
    },
    {
        question: '又是感受街景气息的一天。你瞧见范闲正在街道前面一点闲逛。谢必安走过来问你今天还要街吗？',
        leftChoice: '清',
        rightChoice: '不清',
        leftResult: '你在街道这头冷眼看着，范闲先是被熙攘着离开的百姓撞了几个踉跄，然后他若有所思的转过头来，正好和你在街的两端遥遥相望。你朝他挥了挥手，他也点头致意,然后便头也不回地扎进了人群里。',
        rightResult: '你挥了挥手示意谢必安远远跟着就行，然后循着那头扎眼的卷发挤进人潮。熙攘的人群撞得你踉跄了一下，你低头看了一眼被踩的灰扑扑的鞋子，再抬头时人群里的卷发已经不见踪影。你赶忙四周张望了一下，回头正好撞上了一人的胸膛，张扬的卷毛拂过你的颈侧扎的人难受，而你只听见耳边传来一阵憋着笑的声音:“二殿下今日好雅兴，能否赏脸与臣一起走走？”',
        leftChanges: { favor: -5, love: 0, trust: 0, desire: 0, dominance: 0 },
        rightChanges: { favor: 5, love: 5, trust: 0, desire: 0, dominance: 0 }
    },
    // 添加更多的随机事件
    {
        question: '夜深人静，你在书房独自翻阅古籍，突然听到窗外有动静。',
        leftChoice: '查看',
        rightChoice: '不理会',
        leftResult: '你悄悄走到窗边，看到一个身影飞快地消失在夜色中，心里不免多了几分疑虑。',
        rightResult: '你决定不去理会，继续埋头于书卷之间，心中却有些惴惴不安。',
        leftChanges: { favor: 1, love: 0, trust: 1, desire: 0, dominance: 0 },
        rightChanges: { favor: 0, love: 0, trust: -1, desire: 0, dominance: 0 }
    },
    {
        question: '你在御花园散步，发现一名侍女神情紧张，似乎有话要说。',
        leftChoice: '询问',
        rightChoice: '忽略',
        leftResult: '经过你的耐心询问，侍女告诉你最近宫中谣言四起，你让她放心，同时心中开始警觉。',
        rightResult: '你选择忽略她，继续自己的散步，心情愉悦地享受这难得的安宁。',
        leftChanges: { favor: 0, love: 0, trust: 2, desire: 0, dominance: 0 },
        rightChanges: { favor: 0, love: 0, trust: 0, desire: 1, dominance: 0 }
    }
];

// 引入页
const introPages = [
    {
        question: '首先我们来熟悉一下操作，请拖动页面左滑或者右滑进行选择：',
        leftChoice: '左滑',
        rightChoice: '右滑',
        leftResult: '很好！就是这样。在你做出选择后，现在这个页面会给出对应的结果。你可以通过点击本页面或者继续左右滑动进入下一个事件。',
        rightResult: '很好！就是这样。在你做出选择后，现在这个页面会给出对应的结果。你可以通过点击本页面或者继续左右滑动进入下一个事件。',
        leftChanges: { favor: 0, love: 0, trust: 0, desire: 0, dominance: 0 },
        rightChanges: { favor: 0, love: 0, trust: 0, desire: 0, dominance: 0 }
    },
    {
        question: 'warning：本游戏的游戏机制模仿王权系列游戏，若有侵权将立刻删除。原作：庆余年，cp：闲泽。依然是粗制滥造的产物，故事线比较简单，ooc预警。游戏过程中若感到不适请立刻退出。',
        leftChoice: '明白了',
        rightChoice: '好的',
        leftResult: '现在开始游戏吧！',
        rightResult: '现在开始游戏吧！',
        leftChanges: { favor: 0, love: 0, trust: 0, desire: 0, dominance: 0 },
        rightChanges: { favor: 0, love: 0, trust: 0, desire: 0, dominance: 0 }
    }
];

// 特殊事件
const specialEvents = [
    {
        question: '你被邀参加一个秘密聚会，聚会中提到了一些关于宫廷内部的秘密。',
        leftChoice: '参与聚会',
        rightChoice: '拒绝参加',
        leftResult: '你决定参加聚会，了解到了一些关于宫廷内斗的信息，这对你以后的计划很有帮助。',
        rightResult: '你选择不参加聚会，继续保持低调，但却错过了一些重要信息。',
        leftChanges: { favor: 1, love: 0, trust: 2, desire: 1, dominance: 2 },
        rightChanges: { favor: 0, love: 0, trust: 0, desire: 0, dominance: 0 }
    },
    {
        question: '在风云诡谲的京都中，你收到了一封神秘信件，信中提到有关篡位的阴谋。',
        leftChoice: '调查信件来源',
        rightChoice: '忽略此信',
        leftResult: '你决定调查信件的来源，发现其中涉及的人物身份非同小可，这将是一场智力与勇气的较量。',
        rightResult: '你选择忽略这封信，继续保持低调，但心中不免疑虑重重。',
        leftChanges: { favor: 0, love: 0, trust: 2, desire: 1, dominance: 3 },
        rightChanges: { favor: 0, love: 0, trust: 0, desire: 0, dominance: 0 }
    },
    {
        question: '你得到了一个关于宫廷阴谋的线索，这可能会改变你的命运。',
        leftChoice: '追查到底',
        rightChoice: '置之不理',
        leftResult: '你决定追查这个线索，发现了一个关于权力斗争的惊天秘密。',
        rightResult: '你选择不追查这个线索，决定安分守己，结果错失了一次改变命运的机会。',
        leftChanges: { favor: 0, love: 0, trust: 1, desire: 0, dominance: 2 },
        rightChanges: { favor: 0, love: 0, trust: 0, desire: 0, dominance: 0 }
    }
];

// 当前事件索引
let currentIndex = 0;
let allEvents = generateEvents(); // 生成初始的事件列表

// 初始化卡片事件监听
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousedown', onMouseDown);
    card.addEventListener('touchstart', onTouchStart);
});

function onMouseDown(e) {
    e.preventDefault(); // 防止默认行为
    startX = e.clientX;
    currentCard = e.currentTarget;
    currentCard.style.transition = 'none';
    document.body.classList.add('no-scroll'); // 禁止滚动
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

function onMouseUp(e) {
    if (!currentCard) return;
    document.body.classList.remove('no-scroll'); // 恢复滚动
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    const diffX = e.clientX - startX;
    finalizeSwipe(diffX);
}

function onTouchStart(e) {
    e.preventDefault(); // 防止默认行为
    startX = e.touches[0].clientX;
    currentCard = e.currentTarget;
    currentCard.style.transition = 'none';
    document.body.classList.add('no-scroll'); // 禁止滚动
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
}

function onTouchEnd(e) {
    if (!currentCard) return;
    document.body.classList.remove('no-scroll'); // 恢复滚动
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
    const diffX = e.changedTouches[0].clientX - startX;
    finalizeSwipe(diffX);
}

function onMouseMove(e) {
    if (!currentCard) return;
    const diffX = e.clientX - startX;
    moveCard(diffX);
}

function onTouchMove(e) {
    if (!currentCard) return;
    const diffX = e.touches[0].clientX - startX;
    moveCard(diffX);
}

function moveCard(diffX) {
    currentCard.style.transform = `translateX(${diffX}px) rotate(${diffX / 10}deg)`;
    if (diffX > 0) {
        currentCard.classList.add('active');
        currentCard.classList.remove('reject');
    } else {
        currentCard.classList.add('reject');
        currentCard.classList.remove('active');
    }
}

function finalizeSwipe(diffX) {
    if (showingResult) {
        // 如果是结果页面，允许滑动移除结果卡片并加载下一个事件
        currentCard.style.transition = 'transform 0.3s ease';
        currentCard.style.transform = diffX > 0 ? 'translateX(1000px) rotate(30deg)' : 'translateX(-1000px) rotate(-30deg)';

        setTimeout(() => {
            cardsContainer.removeChild(currentCard);
            currentCard = null;
            showingResult = false;
            addNextCard();
        }, 300);

        return;
    }

    if (diffX > 100) {
        // 右滑选择
        currentCard.style.transition = 'transform 0.3s ease';
        currentCard.style.transform = 'translateX(1000px) rotate(30deg)';
        handleDecision('right');
    } else if (diffX < -100) {
        // 左滑选择
        currentCard.style.transition = 'transform 0.3s ease';
        currentCard.style.transform = 'translateX(-1000px) rotate(-30deg)';
        handleDecision('left');
    } else {
        resetCard();
    }
}

function resetCard() {
    if (!currentCard) return;
    currentCard.style.transform = 'translateX(0) rotate(0)';
    currentCard.style.transition = 'transform 0.3s ease';
    currentCard.classList.remove('active', 'reject');
}

function handleDecision(choice) {
    const leftResult = currentCard.dataset.leftResult;
    const rightResult = currentCard.dataset.rightResult;
    const resultText = choice === 'right' ? rightResult : leftResult;

    // 根据用户的选择更新状态
    const changes = choice === 'right' ? {
        favor: Number(currentCard.dataset.rightFavor),
        love: Number(currentCard.dataset.rightLove),
        trust: Number(currentCard.dataset.rightTrust),
        desire: Number(currentCard.dataset.rightDesire),
        dominance: Number(currentCard.dataset.rightDominance)
    } : {
        favor: Number(currentCard.dataset.leftFavor),
        love: Number(currentCard.dataset.leftLove),
        trust: Number(currentCard.dataset.leftTrust),
        desire: Number(currentCard.dataset.leftDesire),
        dominance: Number(currentCard.dataset.leftDominance)
    };

    // 更新状态条
    updateStats(changes.favor, changes.love, changes.trust, changes.desire, changes.dominance);

    // 创建并显示结果卡片
    const resultCard = document.createElement('div');
    resultCard.className = 'card result-card'; // 使用结果卡片样式类
    resultCard.innerHTML = `<div class="result">${resultText}</div>`;

    // 添加事件监听以支持滑动
    resultCard.addEventListener('mousedown', onMouseDown);
    resultCard.addEventListener('touchstart', onTouchStart);

    cardsContainer.appendChild(resultCard);

    // 将当前卡片移到后台并更新为结果卡片
    currentCard.style.transition = 'transform 0.3s ease';
    currentCard.style.transform = choice === 'right' ? 'translateX(1000px) rotate(30deg)' : 'translateX(-1000px) rotate(-30deg)';

    currentCard = resultCard; // 设置结果卡片为当前活动卡片
    showingResult = true; // 标记为结果展示状态
}

function updateStats(favorChange, loveChange, trustChange, desireChange, dominanceChange) {
    // 更新属性值并确保它们在0到100之间
    stats.favor = Math.min(Math.max(stats.favor + favorChange, 0), 100);
    stats.love = Math.min(Math.max(stats.love + loveChange, 0), 100);
    stats.trust = Math.min(Math.max(stats.trust + trustChange, 0), 100);
    stats.desire = Math.min(Math.max(stats.desire + desireChange, 0), 100);
    stats.dominance = Math.min(Math.max(stats.dominance + dominanceChange, 0), 100);

    // 为每个状态条设置高度，排除 rebirthCount
    for (const [key, value] of Object.entries(stats)) {
        if (key === 'rebirthCount') continue; // 忽略 rebirthCount

        const bar = statsBars[key];

        if (bar) { // 确保 bar 不为 null
            const progressHeight = value; // 直接使用 value 作为百分比

            // 更新进度条伪元素的高度
            bar.style.setProperty('--progress-height', `${progressHeight}%`);

            // 使用主元素的背景作为填充
            bar.style.background = `linear-gradient(to top, #4caf50 ${progressHeight}%, #e0e0e0 ${progressHeight}%)`;

            // 检测是否达到结局条件
            if (value <= 0 || value >= 100) {
                showEnding(key, value);
                return; // 触发结局后停止其他操作
            }
        } else {
            console.error(`Element not found for key: ${key}`);
        }
    }
}

function generateEvents() {
    // 复制主线剧情
    let eventsList = [...mainEvents];

    // 插入引入页
    let introOffset = 0; // 用于处理引入页的偏移量
    if (stats.rebirthCount === 0) {
        eventsList = [...introPages, ...eventsList];
        introOffset = introPages.length; // 计算引入页的数量
    }

    // 插入随机剧情
    let offset = 0; // 用于调整插入位置偏移量
    for (let i = 0; i < mainEvents.length; i++) {
        const mainEvent = mainEvents[i];

        // 检查并插入主线剧情中定义的随机事件
        if (mainEvent.insertRandomEventsAfter > 0) {
            const randomSelectedEvents = getRandomEvents(mainEvent.insertRandomEventsAfter);
            eventsList.splice(i + 1 + offset + introOffset, 0, ...randomSelectedEvents);
            offset += randomSelectedEvents.length; // 调整偏移量
        }

        if (i === 2 && stats.rebirthCount > 0 && stats.dominance >= 50) {
            eventsList.splice(i + 1 + offset + introOffset, 0, specialEvents[1]); // 插入第二个特殊事件
            offset += 1; // 更新偏移量
        }
    }
    return eventsList;
}

// 随机选择事件，允许重复
function getRandomEvents(count) {
    const selectedEvents = [];

    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * randomEvents.length);
        selectedEvents.push(randomEvents[randomIndex]);
    }

    return selectedEvents;
}

function addNextCard() {
    if (currentIndex < allEvents.length) {
        const newCard = document.createElement('div');
        newCard.className = 'card';
        const event = allEvents[currentIndex];
        newCard.innerHTML = `
            <div class="question">${event.question}</div>
            <div class="choices">
                <div class="left-choice">${event.leftChoice}</div>
                <div class="right-choice">${event.rightChoice}</div>
            </div>
        `;
        newCard.dataset.leftResult = event.leftResult;
        newCard.dataset.rightResult = event.rightResult;
        newCard.dataset.leftFavor = event.leftChanges.favor;
        newCard.dataset.leftLove = event.leftChanges.love;
        newCard.dataset.leftTrust = event.leftChanges.trust;
        newCard.dataset.leftDesire = event.leftChanges.desire;
        newCard.dataset.leftDominance = event.leftChanges.dominance;
        newCard.dataset.rightFavor = event.rightChanges.favor;
        newCard.dataset.rightLove = event.rightChanges.love;
        newCard.dataset.rightTrust = event.rightChanges.trust;
        newCard.dataset.rightDesire = event.rightChanges.desire;
        newCard.dataset.rightDominance = event.rightChanges.dominance;

        newCard.addEventListener('mousedown', onMouseDown);
        newCard.addEventListener('touchstart', onTouchStart);

        cardsContainer.appendChild(newCard);
        currentIndex++;
    } else {
        // Handle the end of events
        console.log("All events have been processed.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 初始化每个进度条的元素
    statsBars.favor = document.getElementById('favor-bar');
    statsBars.love = document.getElementById('love-bar');
    statsBars.trust = document.getElementById('trust-bar');
    statsBars.desire = document.getElementById('desire-bar');
    statsBars.dominance = document.getElementById('dominance-bar');

    allEvents = generateEvents(); // 初始化事件
    addNextCard();
    updateStats(0, 0, 0, 0, 0);  // 确保进度条在初始时显示正确
});

// 显示结局
function showEnding(attribute, value) {
    let endingText;
    switch (attribute) {
        case 'favor':
            endingText = value <= 0 ? endings.favorZero : endings.favorHundred;
            break;
        case 'love':
            endingText = value <= 0 ? endings.loveZero : endings.loveHundred;
            break;
        case 'trust':
            endingText = value <= 0 ? endings.trustZero : endings.trustHundred;
            break;
        case 'desire':
            endingText = value <= 0 ? endings.desireZero : endings.desireHundred;
            break;
        case 'dominance':
            endingText = value <= 0 ? endings.dominanceZero : endings.dominanceHundred;
            break;
    }

    const endingCard = document.createElement('div');
    endingCard.className = 'card ending-card';
    endingCard.innerHTML = `
        <div class="result">
            <h4>很不幸，你没能活下来</h4>
            <p>${endingText}</p>
            <button id="rebirth-button">转世</button>
            <button id="restart-button">重新开始</button>
            <small id="rebirth-note">转世则继承上一世的某些属性，有概率触发新的事件</small>
        </div>
    `;

    cardsContainer.innerHTML = ''; // 清空现有卡片
    cardsContainer.appendChild(endingCard);

    // 添加按钮点击事件
    document.getElementById('rebirth-button').addEventListener('click', () => rebirthGame(attribute, value));
    document.getElementById('restart-button').addEventListener('click', restartGame);

    // 阻止加载新的事件卡片
    currentIndex = allEvents.length; // 设置为事件结束
}

// 转世
function rebirthGame(attribute, value) {
    // 增加转世次数
    stats.rebirthCount += 1;

    // 初始化状态，基础值为50
    stats.favor = 50;
    stats.love = 50;
    stats.trust = 50;
    stats.desire = 50;
    stats.dominance = 50;

    // 根据结局调整属性
    if (value >= 100) {
        stats[attribute] += 10;
    } else if (value <= 0) {
        stats[attribute] -= 10;
    }

    // 确保属性值在有效范围内
    stats.favor = Math.min(Math.max(stats.favor, 0), 100);
    stats.love = Math.min(Math.max(stats.love, 0), 100);
    stats.trust = Math.min(Math.max(stats.trust, 0), 100);
    stats.desire = Math.min(Math.max(stats.desire, 0), 100);
    stats.dominance = Math.min(Math.max(stats.dominance, 0), 100);

    // 重新开始游戏，重新加载事件
    currentIndex = 0;
    allEvents = generateEvents(); // 重新生成事件列表
    cardsContainer.innerHTML = '';
    addNextCard();
    updateStats(0, 0, 0, 0, 0); // 更新初始状态条
}

// 重新开始游戏
function restartGame() {
    // 重置所有属性和转世次数
    stats.favor = 50;
    stats.love = 50;
    stats.trust = 50;
    stats.desire = 50;
    stats.dominance = 50;
    stats.rebirthCount = 0; // 清零转世次数

    // 重新开始游戏，重新加载事件
    currentIndex = 0;
    allEvents = generateEvents(); // 重新生成事件列表
    cardsContainer.innerHTML = '';
    addNextCard();
    updateStats(0, 0, 0, 0, 0); // 更新初始状态条
}
