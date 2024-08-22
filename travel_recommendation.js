const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");
const travelRecommendation = document.querySelector('.travel-recommendation');

function search() {
    let inputSearch = document.getElementById("inputSearch").value;
    inputSearch = classifySearchTerm(inputSearch);

    travelRecommendation.innerHTML = ""; // Xóa nội dung hiện tại trước khi hiển thị kết quả mới
    let searchResults = [];

    if (inputSearch === "unknown") {
        const alertDiv = document.createElement('p');
        alertDiv.setAttribute('style', 'color: red;');
        alertDiv.innerHTML = "0 result found!";
        travelRecommendation.appendChild(alertDiv);
    } else {
        fetch('./travel_recommendation_api.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Trích xuất dữ liệu JSON từ phản hồi
            })
            .then(data => {
                searchResults = data[inputSearch];
                searchResults.forEach(location => {
                    if (inputSearch === 'countries') {
                        location.cities.forEach(city => {
                            createLocationElement(city, travelRecommendation);
                        });
                    } else {
                        createLocationElement(location, travelRecommendation);
                    }
                });
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
}

function classifySearchTerm(searchTerm) {
    searchTerm = searchTerm.trim().toLowerCase();
    if (searchTerm.includes('beach')) return 'beaches';
    if (searchTerm.includes('temple')) return 'temples';
    if (searchTerm.includes('countr')) return 'countries';
    return 'unknown';
}

function clearSearch() {
    document.getElementById("inputSearch").value = ''; // Đặt lại giá trị của ô tìm kiếm
    document.querySelector('.travel-recommendation').innerHTML = ''; // Xóa kết quả tìm kiếm
}

function createLocationElement(location, container) {
    const locationDiv = document.createElement('div');
    locationDiv.classList.add('location');

    const img = document.createElement('img');
    img.src = location.imageUrl;
    img.alt = location.name;

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');

    contentDiv.innerHTML = `<h3>${location.name}</h3>
                            <p>${location.description}</p>
                            <button>Visit</button>`;

    locationDiv.appendChild(img);
    locationDiv.appendChild(contentDiv);

    container.appendChild(locationDiv);
}

btnSearch.addEventListener('click', search);
btnClear.addEventListener('click', clearSearch);