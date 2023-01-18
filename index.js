// hyp查询apikey暂不支持免费提供，请自行去hyp提取
const { PupPlugin } = require('@pupbot/core')

const axios = require("axios")

const config = { cmd: 'bw ' }

const msg = ' 的起床战争全局统计信息: \n等级: 暂不写 | 硬币: '

const plugin = new PupPlugin('H_aaa', '0.1.0')

plugin.onMounted((bot) => {
  plugin.onMessage(async event => {
    const { raw_message } = event

    if (event.raw_message.startsWith(config.cmd)) {
      var word = event.raw_message.slice(config.cmd.length);
      const mojang = await (await axios.get('https://api.mojang.com/users/profiles/minecraft/' + encodeURI(word))).data;
      const uuid = mojang.id
      const hyp = await (await axios.get('https://api.hypixel.net/player?key=暂不支持&uuid=' + encodeURI(uuid))).data;
      const m = word + msg + hyp.player.stats.Bedwars.coins + ' \n拆床: ' + hyp.player.stats.Bedwars.beds_broken_bedwars + ' | 被拆床: ' + hyp.player.stats.Bedwars.beds_lost_bedwars + ' | 连胜: ' + hyp.player.stats.Bedwars.winstreak + ' \n胜利: ' + hyp.player.stats.Bedwars.wins_bedwars + ' | 失败: ' + hyp.player.stats.Bedwars.losses_bedwars + ' \n击杀: ' + hyp.player.stats.Bedwars.kills_bedwars + ' | 死亡: ' + hyp.player.stats.Bedwars.deaths_bedwars + '\n终杀: ' + hyp.player.stats.Bedwars.final_kills_bedwars + ' | 终死: ' + hyp.player.stats.Bedwars.final_deaths_bedwars + '\n铁锭收集: ' + hyp.player.stats.Bedwars.iron_resources_collected_bedwars + ' | 金锭收集: ' + hyp.player.stats.Bedwars.gold_resources_collected_bedwars + '\n钻石收集: ' + hyp.player.stats.Bedwars.diamond_resources_collected_bedwars + ' | 绿宝石收集: ' + hyp.player.stats.Bedwars.emerald_resources_collected_bedwars + '\n我真的会谢 写这个很费人的啊'
      event.reply(m)
    }
  })
})

module.exports = { plugin }
