import '@logseq/libs';
import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user';
import { getDateForPage, getDateForPageWithoutBrackets } from 'logseq-dateutils';

let settings: SettingSchemaDesc[] = [
  {
    key: "keyboardShortcut",
    title: "Keyboard shortcut",
    description: "The keyboard shortcut to go to current daily note page",
    type: "string",
    default: "mod+shift+w",

  }
]
const main = async () => {
  logseq.useSettingsSchema(settings);

  const registerCommand = async () => {
    logseq.App.unregister_plugin_simple_command(`${logseq.baseInfo.id}/KeyboardShortcut`)
    logseq.App.registerCommandPalette({
      key: "goToDailyNote",
      label: "Go to the daily note page for today",
      keybinding: {
        binding: logseq.settings.keyboardShortcut
      },
    }, async () => {
      //get yesterdays date as a date object
      logseq.App.showMsg("Daily note page toggled")
      let date = new Date();
      date.setDate(date.getDate() - 1);
      logseq.App.pushState('page', { name: getDateForPage(date, (await logseq.App.getUserConfigs()).preferredDateFormat).slice(2, -2) })
      logseq.App.pushState('page', { name: getDateForPage(new Date(), (await logseq.App.getUserConfigs()).preferredDateFormat).slice(2, -2) })

    })
  }
  
  logseq.onSettingsChanged(
    registerCommand
  )
}

logseq.ready(main).catch(console.error);
