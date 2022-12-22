const API_URL =
  "https://youtube-v31.p.rapidapi.com/search?channelId=UCz4Va7TwZNQIjk3GBfavu3A&part=snippet%2Cid&order=date&maxResults=10";

const d = document;

const content = d.getElementById("content");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "94fa3a6909msh90e521811d346cep18c04bjsne6ded2f2008b",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const videos = await fetchData(API_URL);
    let view = `
    ${videos.items.map(video => `
    <div class="group relative">
      <div
        class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
        <img src=${video.snippet.thumbnails.high.url} alt=${video.snippet.description} class="w-full">
      </div>
      <div class="mt-4 flex justify-between">
        <h3 class="text-sm text-gray-700">
          <span aria-hidden="true" class="absolute inset-0"></span>
          ${video.snippet.title}
        </h3>
      </div>
    </div>
    `).slice(0,3).join('')}
    `;

    content.innerHTML = view;
  } catch (error) {
    console.log(error);
  }
})();
