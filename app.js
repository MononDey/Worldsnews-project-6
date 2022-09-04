const newsCategories = async () => {
    try {
        const url = 'https://openapi.programming-hero.com/api/news/categories';
        const res = await fetch(url);
        const data = await res.json();
        //return data;
        displayNewsCategories(data.data.news_category);
    } catch (error) {
        console.log("Bad Error!");
    }
}

const displayNewsCategories = (data) => {
    const newsCategory = document.getElementById('news-category');

    data.forEach(category => {
        //console.log(category);
        const { category_name, category_id } = category;
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
        <a class="block p-3 md:hover:text-violet-700 md:no-underline md:hover:underline md:decoration-2 md:decoration-violet-700 md:underline-offset-8" href="#" onclick="showNews('${category_id}', '${category_name}')">${category_name}</a>`;
        newsCategory.appendChild(newsDiv);
    });
    loadSpinner(false);
}

const getNewsFromCategories = async (id, element) => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        //displayNewsByCategory(data.data, element);
        showNewsCat(data.data, element);
        //console.log(element);
    } catch (error) {
        console.log("Bad Error!");
    }
}

const showNews = (category_id, element) => {
    //console.log(element);
    loadSpinner(true);
    getNewsFromCategories(category_id, element);
}

const checkAvailableNews = (id, element) => {
    const getNewsItemContainer = document.getElementById('news-item');
    getNewsItemContainer.innerHTML = '';

    const item = document.getElementById('news-item');
    if (element) {
        item.classList.remove('hidden');
    }
    else {
        item.classList.add('hidden');
    }
    const newsDiv = document.createElement('div');
    newsDiv.innerHTML = `
    <p class="text-gray-600 text-3xl font-semibold">${id} items found in category ${element}</p>`;

    getNewsItemContainer.appendChild(newsDiv);
}

const showNewsCat = (data, element) => {
    const newses = [];
    for (const news of data) {
        newses.push(news);
    }
    newses.sort((a, b) => b.total_view - a.total_view);
    data = newses;
    //console.log(data);
    displayNewsByCategory(data, element);
}

const displayNewsByCategory = (data, element) => {
    const result = data.length;
    checkAvailableNews(result, element);
    //console.log(element);
    const messageContainer = document.getElementById('news-message');
    if (result == 0) {
        messageContainer.classList.remove('hidden');
    }
    else {
        messageContainer.classList.add('hidden');
    }
    const getIdByCategory = document.getElementById('display-news');
    getIdByCategory.textContent = '';

    data.forEach(newsElement => {
        const { _id, thumbnail_url, author, title, details, rating, total_view } = newsElement;
        const { img, name, published_date } = author;
        console.log(newsElement);
        //const { number } = rating;
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
        <div
                class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-full hover:bg-gray-100">
                <img class="object-cover w-full h-96 rounded-t-lg p-4 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                    src="${thumbnail_url ? thumbnail_url : "No data Available"}" alt="">
                <div class="flex flex-col justify-between p-4 leading-normal">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-600">${title ? title : "No data Available"}</h5>
                    <p class="mb-3 font-normal text-gray-400">${details.slice(0, 280)}...</p>
                    <div class="flex justify-between items-center">
                        <div class="flex text-sm md:text-base">
                            <div>
                                <img class="object-contain w-12 rounded-full" src="${img ? img : "No data Available"}" alt="">
                            </div>
                            <div class="ml-2">
                                <p class="text-gray-600 font-semibold">${name ? name : "No data Available"}</p>
                                <p class="text-gray-400">${published_date ? published_date : "No data Available"}</p>
                            </div>
                        </div>
                        <div class="ml-2">
                            <p><i class="fa-solid fa-eye text-violet-700"></i> ${total_view > 0 ? total_view : "No Data Available"}</p>
                        </div>
                        <div class="text-violet-700">
                            <i class="fa-solid fa-star-half-stroke"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div>
                            <label onclick="modalDataView('${_id}')" for="my-modal-3" class="text-violet-700"><i class="fa-brands fa-readme"></i></label>
                        </div>
                    </div>
                </div>
            </div>
        `;
        getIdByCategory.appendChild(newsDiv);
    })
    loadSpinner(false);
}

const modalDataView = async (news_id) => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
        const res = await fetch(url);
        const data = await res.json();
        modalDataAdd(data.data[0]);
    } catch (error) {
        console.log("Bas Error!");
    }
}

const modalDataAdd = (data) => {
    const { author, thumbnail_url, title, details } = data;
    const { img, name, published_date } = author;
    const getData = document.getElementById('modal-view');
    getData.textContent = '';
    const newsDiv = document.createElement('div');
    newsDiv.classList.add('col');
    newsDiv.innerHTML = `
                    <img class="object-cover w-full h-96 rounded-t-lg p-4 md:h-2/5 md:w-full md:rounded-none md:rounded-l-lg"
                    src="${thumbnail_url}" alt="">
                    <h5 class="mt-2 text-2xl font-bold tracking-tight text-gray-200">${title ? title : "No data Available"}</h5>
                <div class="flex items-center mt-4 mb-4">
                    <div>
                        <img class="object-contain w-12 rounded-full" src="${img ? img : "No data Available"}" alt="">
                    </div>
                    <div class="ml-2">
                        <p class="font-semibold">${name ? name : "No data Available"}</p>
                        <p class="text-gray-400">${published_date ? published_date : "No data Available"}</p>
                    </div>
                    
                </div>
                <p class="mb-3 font-normal text-justify text-gray-200">${details}</p>
    `;
    getData.appendChild(newsDiv);
    loadSpinner(false);
}

const loadSpinner = (isLoad) => {
    const loadingData = document.getElementById('circle-spinner');

    if (isLoad) {
        loadingData.classList.remove('invisible');
    }
    else {
        loadingData.classList.add('invisible');
    }
}

newsCategories();
getNewsFromCategories("08", "All News");
//modalDataView();
//checkAvailableNews();