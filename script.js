
// Init

let pollInterval = null;
let previousUnread = [];

function init() {
    console.log('[SLACK-ATTENTION] Slack Attention init');
    pollInterval = setInterval(checkUnread, 5000);
}

if (document.readyState !== 'loading') {
    init();
} else {
    document.addEventListener('DOMContentLoaded', init);
}

console.log('[SLACK-ATTENTION] Slack Attention load');

function checkUnread() {
    let unreadChannels = document.querySelectorAll('.p-channel_sidebar__channel--unread, .p-message_pane__unread_banner');
    // Also seem to be included in the above:
    // let unreadPMs = document.querySelectorAll('.p-channel_sidebar__badge');
    console.log('[SLACK-ATTENTION] Messages: ', unreadChannels.length);

    for (let i = 0; i < unreadChannels.length; ++i) {
	console.log('[SLACK-ATTENTION] Considering unread', unreadChannels[i]);
	if (!previousUnread.includes(unreadChannels[i])) {
	    console.log('[SLACK-ATTENTION] Sending message to bg');
	    chrome.runtime.sendMessage('drawAttention');
	    break;
	}
    }

    previousUnread.length = 0;
    previousUnread.push(...unreadChannels);
}


