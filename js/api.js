const loadPhone = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );
  const data = await response.json();
  const phones = data.data;
  displayPhone(phones);
};

const displayPhone = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList = "card bg-base-100 shadow-xl p-4 border border-2 boder-[#CFCFCF]";
    div.innerHTML = `<figure class="px-8 py-8 bg-[#100F0F0D]">
                        <img src="${phone.image}" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title text-2xl font-bold">${phone.phone_name}</h2>
                        <p class="text-lg font-normal">There are many variations of passages of available, but the
                            majority have suffered</p>
                        <p class="text-2xl font-bold">$<span>999</span></p>
                        <div class="card-actions">
                            <button class="btn btn-primary text-xl font-semibold text-[#FFF]">Show Details</button>
                        </div>
                    </div>`;
    phoneContainer.appendChild(div);
    console.log(phone);
  });
};
loadPhone();
