var websiteName = document.getElementById('websiteName');
var websiteUrl = document.getElementById('websiteUrl');
var bookmarksList = [];

function isValidUrl(url) {
    var urlPattern = /^(http:\/\/|www\.)?([\w-]+(\.[\w-]+)+\/?)$/;
    return urlPattern.test(url);
}

function addWebsite() {
    var bookmarkName = websiteName.value.trim();
    var bookmarkUrl = websiteUrl.value.trim();

    if (bookmarkName === '' || bookmarkUrl === '') {
        alert('Please enter both the website name and URL.');
        return;
    }

    if (!isValidUrl(bookmarkUrl)) {
        alert('Please enter a valid URL.');
        return;
    }

    var bookmark = {
        websiteName: bookmarkName,
        websiteUrl: bookmarkUrl
    };

    bookmarksList.push(bookmark);
    localStorage.setItem('bookmarksList', JSON.stringify(bookmarksList));
    showBookmarks();
}

function showBookmarks() {
    var container = ''; 
    var bookmarksList = JSON.parse(localStorage.getItem('bookmarksList'));

    for (var i = 0; i < bookmarksList.length; i++) {
        container += `
            <tr>
                <td>${i + 1}</td>
                <td>${bookmarksList[i].websiteName}</td>
                <td>
                    <div class="btn btn-outline-primary">
                        <a href="https://${bookmarksList[i].websiteUrl}" target="_blank">
                            <i class="fa-solid fa-eye"></i>
                        </a>
                    </div>
                </td>
                <td>
                    <div class="btn btn-outline-danger" onclick="deleteBookmark(${i})">
                        <i class="fa fa-trash"></i>
                    </div>
                </td>
            </tr>
       `;
    }
    var tcontent = document.getElementById('tbody');
    tcontent.innerHTML = container;
}

function deleteBookmark(index) {
    var bookmarksList = JSON.parse(localStorage.getItem('bookmarksList'));
    bookmarksList.splice(index, 1);
    localStorage.setItem('bookmarksList', JSON.stringify(bookmarksList));
    showBookmarks();
}
