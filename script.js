
// Init

let pollInterval = null;
let previousUnread = [];
let previousTitle = '';

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
    let shouldNotify = false;
    let unreadChannels = document.querySelectorAll('.p-channel_sidebar__channel--unread, .p-message_pane__unread_banner');
    // Also seem to be included in the above:
    // let unreadPMs = document.querySelectorAll('.p-channel_sidebar__badge');
    console.log('[SLACK-ATTENTION] Messages: ', unreadChannels.length);

    for (let i = 0; i < unreadChannels.length; ++i) {
	console.log('[SLACK-ATTENTION] Considering unread', unreadChannels[i]);
	if (!previousUnread.includes(unreadChannels[i])) {
	    shouldNotify = true;
	    break;
	}
    }

    if (!shouldNotify) {
	if ((previousTitle.indexOf('!') === -1 && document.title.indexOf('!') !== -1) ||
	    (previousTitle.indexOf('*') === -1 && document.title.indexOf('*') !== -1)) {
	    console.log('[SLACK-ATTENTION Title signals unread', previousTitle, document.title);
	    shouldNotify = true;
	}
    }

    if (shouldNotify) {
	console.log('[SLACK-ATTENTION] Sending message to bg');
	chrome.runtime.sendMessage('drawAttention');
    }

    previousUnread.length = 0;
    previousUnread.push(...unreadChannels);
    previousTitle = document.title;
}


