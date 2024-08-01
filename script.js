const cardsContainer = document.getElementById('cards-container');
let currentCard = null;
let startX = 0;
let showingResult = false;

const stats = {
    favor: 50,
    love: 50,
    trust: 50,
    desire: 50,
    dominance: 50,
    rebirthCount: 0 // 添加转世次数
};

const endings = {
    favorZero: "范闲开始厌恶你，和他的爱混合在一起，让他每一次想起你都在胃里一阵翻江倒海。你要是不会说那些讨人厌的话就好了，他是这么想的，也是这么做的。",
    favorHundred: "范闲很喜欢你，他欣赏你，尊重你，唯独不爱你。或许你不需要他的爱。",
    loveZero: "范闲的爱意消失殆尽，爱的反义词是什么呢？直到被长剑贯穿的那一刻你也没有想明白。",
    loveHundred: "他爱你，范闲爱你。但有时极端的爱会变成毒药。",
    trustZero: "你失去了所有人的信任，孤独地面对世界。",
    trustHundred: "你赢得了无与伦比的信任，成为大家心目中的领袖。",
    desireZero: "你对生活失去了所有的激情，陷入了深深的无趣。",
    desireHundred: "你充满了无限的激情，迎接每一个新的挑战。",
    dominanceZero: "你失去了对生活的掌控，成为命运的傀儡。",
    dominanceHundred: "比起真正的爱人，或许范闲更需要一只漂亮的娃娃，这是你最后的想法，很快你的自我意识就随着那一杯毒酒下毒消逝了，从此脑海中好像蒙了一层雾气，再无清明之日。"
};

const statsBars = {
    favor: document.getElementById('favor-bar'),
    love: document.getElementById('love-bar'),
    trust: document.getElementById('trust-bar'),
    desire: document.getElementById('desire-bar'),
    dominance: document.getElementById('dominance-bar')
};

const events = [
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
];


let currentIndex = 0;

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

function onMouseUp(e) {
    if (!currentCard) return;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    const diffX = e.clientX - startX;
    finalizeSwipe(diffX);
}

function onTouchEnd(e) {
    if (!currentCard) return;
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
    const diffX = e.changedTouches[0].clientX - startX;
    finalizeSwipe(diffX);
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

    if (diffX > 150) {
        // 右滑选择
        currentCard.style.transition = 'transform 0.3s ease';
        currentCard.style.transform = 'translateX(1000px) rotate(30deg)';
        handleDecision('right');
    } else if (diffX < -150) {
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


function addNextCard() {
    if (currentIndex < events.length) {
        const newCard = document.createElement('div');
        newCard.className = 'card';
        const event = events[currentIndex];
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
    }
}


document.addEventListener('DOMContentLoaded', () => {
    // 初始化每个进度条的元素
    statsBars.favor = document.getElementById('favor-bar');
    statsBars.love = document.getElementById('love-bar');
    statsBars.trust = document.getElementById('trust-bar');
    statsBars.desire = document.getElementById('desire-bar');
    statsBars.dominance = document.getElementById('dominance-bar');

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
    currentIndex = events.length; // 设置为事件结束
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
    cardsContainer.innerHTML = '';
    addNextCard();
    updateStats(0, 0, 0, 0, 0); // 更新初始状态条
}



