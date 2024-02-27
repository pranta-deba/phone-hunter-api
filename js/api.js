// fetch api load data
const loadPhone = async (searchValue, isShowAll) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`
  );
  const data = await response.json();
  const phones = data.data;
  displayPhone(phones, isShowAll);
};

// display phone
const displayPhone = (phones, isShowAll) => {
  // phone-container again search for empty
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";

  // show-all-container btn hide show for condition
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  // display only 12 data
  if(!isShowAll){
    phones = phones.slice(0, 12);
  }

  //display data used forEach
  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList =
      "card bg-base-100 shadow-xl p-4 border border-2 boder-[#CFCFCF]";
    div.innerHTML = `<figure class="px-8 py-8 bg-[#100F0F0D]">
                        <img src="${phone.image}" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title text-2xl font-bold">${phone.phone_name}</h2>
                        <p class="text-lg font-normal">There are many variations of passages of available, but the
                            majority have suffered</p>
                        <p class="text-2xl font-bold">$<span>999</span></p>
                        <div class="card-actions">
                            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary text-xl font-semibold text-[#FFF]">Show Details</button>
                        </div>
                    </div>`;
    phoneContainer.appendChild(div);
    // console.log(phone);
  });
  // loading spinner off
  loadingSpinner(false);
};

// loading effect
const loadingSpinner = (isLoading) => {
  const loadingContainer = document.getElementById("loadingContainer");
  if (isLoading) {
    loadingContainer.classList.remove("hidden");
  } else {
    loadingContainer.classList.add("hidden");
  }
};

// search
function handleSearch (isShowAll){
    const searchInput = document.getElementById("searchInput");
    const searchValue = searchInput.value;
    if (searchValue === "") {
      return alert("please provide a phone name.!");
    }
    // loading spinner on
    loadingSpinner(true);
    loadPhone(searchValue, isShowAll);
  }

// showAllBtn 
const showAllBtn = document.getElementById('showAllBtn');
showAllBtn.addEventListener('click', ()=> {
    handleSearch(true);
});

// show details
const handleShowDetails = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const details = await response.json();
    showPhoneDetails(details)
};

// show phone details
const showPhoneDetails = (phoneInfo) =>{
    const data = phoneInfo.data;
    const phoneDetailsElement = document.querySelectorAll('.phone-details-element');
    phoneDetailsElement[0].src = data.image;
    phoneDetailsElement[1].innerText = data.name;
    phoneDetailsElement[2].childNodes[1].innerText = data?.mainFeatures?.storage;
    phoneDetailsElement[3].childNodes[1].innerText = data?.mainFeatures?.displaySize;
    phoneDetailsElement[4].childNodes[1].innerText = data?.mainFeatures?.chipSet;
    phoneDetailsElement[5].childNodes[1].innerText = data?.mainFeatures?.memory;
    phoneDetailsElement[6].childNodes[1].innerText = data?.releaseDate;
    phoneDetailsElement[7].childNodes[1].innerText = data?.brand;
    phoneDetailsElement[8].childNodes[1].innerText = data?.others?.GPS || 'no GPS available';
    my_modal_5.showModal();
};

