function search() {
    let inputSearch = document.getElementById("inputSearch").value;
    inputSearch = classifySearchTerm(inputSearch);
    if (inputSearch === "unknown") console.log("0 result found!")
    else {
        fetch('./travel_recommendation_api.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Trích xuất dữ liệu JSON từ phản hồi
        })
        .then(data => {
            const results = data[inputSearch]
            console.log(inputSearch);
            console.log(results); // Xử lý dữ liệu nhận được
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
    return 'unknown'
}

const btnSearch = document.getElementById("btnSearch")
btnSearch.addEventListener('click', search)