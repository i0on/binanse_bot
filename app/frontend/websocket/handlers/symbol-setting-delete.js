const {
  deleteSymbolConfiguration
} = require('../../../cronjob/trailingTradeHelper/configuration');
const queue = require('../../../cronjob/trailingTradeHelper/queue');

const handleSymbolSettingDelete = async (logger, ws, payload) => {
  logger.info({ payload }, 'Start symbol setting delete');

  const { data: symbolInfo } = payload;

  const { symbol } = symbolInfo;

  await deleteSymbolConfiguration(logger, symbol);

  queue.executeFor(logger, symbol);

  ws.send(
    JSON.stringify({ result: true, type: 'symbol-setting-delete-result' })
  );
};

module.exports = { handleSymbolSettingDelete };
