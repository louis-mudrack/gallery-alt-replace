document.getElementById('changeTitlesBtn').addEventListener('click', () => {
  const newTitle = document.getElementById('titleText').value;
  if (newTitle) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const activeTab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        function: changeGalleryListTitles,
        args: [newTitle]
      });
    });
  }
});

function changeGalleryListTitles(newTitle) {
  const galleryList = document.querySelector('.gallery-list');
  if (galleryList) {
    const divs = galleryList.children;
    for (const div of divs) {
      if (div.tagName === 'DIV') {
        const inputField = div.querySelector('#altTitle');
        if (inputField) {
          inputField.value = newTitle;
        }
      }
    }
  }
}
