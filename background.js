
function drawAttention() {
    console.log('[SLACK-ATTENTION] Drawing attention on background');
    chrome.windows.update(-2, { drawAttention: true });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request === 'drawAttention') {
	drawAttention()
    }
});
